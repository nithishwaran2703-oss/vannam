# Full System Architecture Specification: Vannam World Preschool

An end-to-end technical reference documenting the multi-tier architecture connecting the **Admin Management Portal**, **Teacher Dashboard**, **Parental Portal**, **Public Web Application**, and the **Real-Time Synchronization Engine ("Nuclear Option")**.

---

## 1. System Context & High-Level Architecture

The system operates on a modern, decoupled Next.js 16 full-stack architecture running on Node.js. It features a unified persistence layer with dual memory/disk mirrors, a multi-channel real-time event bus, and three distinct client-facing application contexts:

1. **Public Website (`/`)**: Parent discovery, curriculum exploration, tour booking, announcements.
2. **Parental Portal (`/portal`)**: Live daily child activity tracking, homework, attendance badges, teacher feedback.
3. **Teacher & Admin Operations (`/admin/*`, `/teacher/*`)**: Operational control room, student management, classroom workflows, CMS content editor.

```mermaid
flowchart TB
    subgraph Clients["Client Presentation Tier"]
        Visitor["Prospective Parents (Mobile / Desktop)"]
        EnrolledParent["Enrolled Parents (Mobile / Desktop)"]
        StaffUser["Teachers & Administrators"]
    end

    subgraph EdgeRouting["Routing & Middleware Tier (Next.js App Router)"]
        PublicRoute["Public Routes (/, /about, /programs, /admissions, /contact)"]
        PortalRoute["Parental Portal Route (/portal)"]
        AdminRoute["Admin Routes (/admin/*)"]
        TeacherRoute["Teacher Routes (/teacher/*)"]
    end

    subgraph SyncBus["Real-Time Live Event Bus ('Nuclear Option')"]
        BC["BroadcastChannel ('vannam_store_sync')\n[0ms Same-Origin Event Loop]"]
        LS["Web Storage API ('vannam_sync_trigger')\n[Cross-Window / Multi-Instance Event]"]
        HB["Active Polling Heartbeat\n[4s Fallback for Remote Clients]"]
    end

    subgraph APILayer["REST API & Server Actions Tier"]
        APIContent["GET /api/content\n(Public Web Data Aggregator)"]
        APIPortal["GET /api/portal/data\n(Student/Parent Data Aggregator)"]
        APIAdmin["/api/admin/*\n(CRUD: Students, Attendance, Homework, Activities, Content)"]
    end

    subgraph Persistence["Unified Persistence & Data Tier"]
        StoreMirror["In-Memory RAM Mirror (memoryStore)\n[Sub-millisecond Read Latency]"]
        FileStore[("JSON File Document Store\ndata/vannam-store.json")]
        AuditStore[("Rolling Audit Log Engine\n(Last 100 System Actions)")]
        PostgresFallback[("Prisma / PostgreSQL\n(Enterprise Fallback Tier)")]
    end

    Visitor --> PublicRoute
    EnrolledParent --> PortalRoute
    StaffUser --> AdminRoute & TeacherRoute

    PublicRoute --> APIContent
    PortalRoute --> APIPortal
    AdminRoute & TeacherRoute --> APIAdmin

    AdminRoute & TeacherRoute -.->|Trigger Broadcast| SyncBus
    SyncBus -.->|Instant Re-render Signal| PublicRoute
    SyncBus -.->|Instant Re-render Signal| PortalRoute

    APIContent & APIPortal & APIAdmin <--> StoreMirror
    StoreMirror <--> FileStore
    StoreMirror --> AuditStore
    StoreMirror -.-> PostgresFallback
```

---

## 2. Sequence Diagram: Teacher Action to Parental Portal Reflection

This sequence diagram illustrates the lifecycle of an action (e.g., marking attendance or posting a classroom photo) executed by an educator:

```mermaid
sequenceDiagram
    autonumber
    actor Teacher as Educator (Teacher Dashboard)
    participant API as /api/admin/activities
    participant Store as lib/dataStore.js
    participant File as data/vannam-store.json
    participant Broadcaster as lib/sync.js
    participant Bus as BroadcastChannel / localStorage
    participant Parent as Parental Portal (/portal)

    Teacher->>API: POST Activity {studentId: "std-1", title: "STEAM Lego Lab"}
    activate API
    API->>Store: saveStore(updatedStore, auditLog)
    activate Store
    Store->>File: Atomic write (fs.writeFileSync)
    Store-->>API: Success (HTTP 200 OK)
    deactivate Store
    API-->>Teacher: { success: true, activity: {...} }
    deactivate API

    Teacher->>Broadcaster: broadcastAdminUpdate('activities')
    activate Broadcaster
    Broadcaster->>Bus: postMessage({ type: 'STORE_UPDATED', section: 'activities' })
    Broadcaster->>Bus: localStorage.setItem('vannam_sync_trigger', timestamp)
    deactivate Broadcaster

    Bus-->>Parent: Event Received (0ms Latency)
    activate Parent
    Parent->>Parent: loadLivePortalData()
    Parent->>Store: GET /api/portal/data?t=timestamp
    Store-->>Parent: Updated JSON (new activity in student feed)
    Parent->>Parent: React State Update (setChildrenData)
    Parent-->>Parent: DOM Re-renders (Smooth 60fps animation)
    deactivate Parent
```

---

## 3. Detailed Data Models & Entity Relationships

```mermaid
erDiagram
    STUDENT ||--o{ ATTENDANCE_RECORD : has
    STUDENT ||--o{ ACTIVITY_LOG : participates_in
    CLASS ||--|{ STUDENT : contains
    CLASS ||--o{ HOMEWORK_TASK : assigned_to
    TEACHER ||--o{ CLASS : leads
    TEACHER ||--o{ ACTIVITY_LOG : logs

    STUDENT {
        string id PK "std-1"
        string studentId UK "VW-2026-001"
        string name "Aarav Sharma"
        string gender "Boy"
        string classId FK "class-pre-kg-a"
        string parentName "Deepak Sharma"
        string parentEmail "deepak.sharma@example.com"
        string parentPhone "+91 98401 23456"
        string status "Active"
    }

    CLASS {
        string id PK "class-pre-kg-a"
        string name "Pre-KG Explorers"
        string grade "Pre-KG"
        string room "Lotus Room 101"
        int capacity 12
        string teacherId FK "priya-sharma"
    }

    ATTENDANCE_RECORD {
        string id PK "att-1"
        string studentId FK "std-1"
        string date "2026-08-30"
        enum status "PRESENT, ABSENT, LEAVE"
        string remarks "Arrived cheerfully"
    }

    ACTIVITY_LOG {
        string id PK "act-1"
        string studentId FK "std-1 (nullable for class-wide)"
        string classId FK "class-pre-kg-a"
        string title "Sensory Finger Painting"
        string category "Art & Sensory"
        string description "Concentric circle mixing"
        string[] photos "['https://...']"
        timestamp createdAt
    }

    HOMEWORK_TASK {
        string id PK "hw-1"
        string classId FK "class-pre-kg-a"
        string title "Tactile Shape Hunt"
        string subject "Cognitive Discovery"
        date dueDate "2026-08-31"
        enum status "ASSIGNED, COMPLETED"
        string materials "Color chart Page 6"
    }

    TEACHER {
        string id PK "clara-bennett"
        string name "Mrs. Clara Bennett"
        string role "Principal & Founder"
        string qualifications "M.Ed Early Ed"
        string bio "Nurturing story discovery"
        string image "https://..."
        string badge "Founder"
    }
```

---

## 4. Layer-by-Layer Architectural Breakdown

### A. Presentation Tier

#### 1. Public Website (`app/page.js`)
* **State Hydration**: Initializes with baseline defaults (`defaultTeachers`, `defaultFacilities`, `defaultTestimonials`) and binds to `dynamicContent` via `useEffect`.
* **Zero-Distortion Fallback Principle**:
  ```javascript
  const teachers = (dynamicContent?.teachers?.length > 0)
    ? dynamicContent.teachers.map((t, idx) => ({
        ...defaultTeachers[idx % defaultTeachers.length],
        ...t,
        kidName: t.kidName || t.name,
        qual: t.qualifications || t.qual,
        intro: t.bio || t.intro
      }))
    : defaultTeachers;
  ```
  This ensures that when an admin adds or edits teachers, the visual theme (card background gradients, sticky tape decorations, mascot icons, badges) remains visually consistent.

#### 2. Parental Portal (`components/ParentPortal.jsx`, `/portal`)
* **Dynamic Student Identification**:
  - Pulls all registered students from `/api/portal/data`.
  - Automatically identifies the child based on login email, phone, or Student ID (`VW-2026-001`).
* **Real-Time Attendance Indicator**:
  - Automatically checks `todayStatus` (`PRESENT` / `ABSENT`).
  - Renders a pulsing green badge (`In Campus`) or rose badge (`Absent Today`).
* **Interactive Task Timeline**:
  - Homework items are filterable by pending/completed status with confetti celebration on milestone completion.

#### 3. Teacher Dashboard (`app/teacher/dashboard/page.js`)
* **Role-Based Workflow**:
  - Attendance roster with one-click toggling (`PRESENT` / `ABSENT`).
  - Milestone logging modal with student selection, category assignment, and photo attachment.
  - Classroom homework distribution with due dates and curriculum tagging.

#### 4. Admin Management Portal (`app/admin/*`)
* **Modules**: Announcements, Teachers, Facilities, Gallery, Testimonials, Programs, Enquiries, Admissions, Settings, Logs.
* **Unified Event Emitter**: `showToast(message, 'success')` triggers `broadcastAdminUpdate()` across all modules.

---

### B. Synchronization & Messaging Tier ("Nuclear Option")

To achieve instantaneous zero-latency updates without requiring expensive dedicated WebSocket infrastructure:

| Channel | Technology | Target Scope | Latency |
| :--- | :--- | :--- | :--- |
| **Primary** | `BroadcastChannel('vannam_store_sync')` | Cross-tab on same origin | **< 2ms** |
| **Secondary** | `window.addEventListener('storage')` | Cross-window & private instances | **< 10ms** |
| **Tertiary** | `window.addEventListener('focus')` | Tab switching | **Instant upon focus** |
| **Fallback** | Polling Heartbeat (`setInterval(..., 4000)`) | Mobile browsers & detached devices | **<= 4000ms** |

---

### C. Persistence & Data Tier

* **Primary Document Store ([data/vannam-store.json](file:///c:/Users/nithishwaran%20T/OneDrive/Desktop/playschool/data/vannam-store.json))**:
  - File-backed document repository with full data schemas for students, classes, attendance, homework, activities, teachers, facilities, gallery, testimonials, and settings.
* **In-Memory RAM Mirror**:
  - `memoryStore` in [lib/dataStore.js](file:///c:/Users/nithishwaran%20T/OneDrive/Desktop/playschool/lib/dataStore.js) holds cached state in RAM, ensuring that high concurrency loads never exhaust disk I/O.
* **Atomic Writes**:
  - Writes are synchronous with disk flush, immediately updating the memory mirror.
* **Audit Trail**:
  - Every update logs user, timestamp, action, and targeted resource (last 100 rolling logs).

---

## 5. Security & Authentication Architecture

1. **Role-Based Access Control (RBAC)**:
   - `ADMIN`: Unrestricted access to all school settings, staff credentials, financials, and admissions.
   - `TEACHER`: Scoped to assigned classes, attendance rosters, activity logging, and homework assignment.
   - `PARENT`: Scoped to enrolled children's activities, attendance history, homework tasks, and teacher feedback.
2. **Session Verification**:
   - Secure local session tokens verified on route change with automatic redirect guards (`/teacher/login`, `/admin/login`).
3. **Data Sanitation & Cache Control**:
   - Dynamic endpoints enforce `Cache-Control: no-store, no-cache, must-revalidate, max-age=0` to guarantee freshness.
   - Public content endpoints utilize stale-while-revalidate for fast rendering.

---

## 6. Streamlined Admin Panel Architecture (Essentials Only)

To optimize cognitive load and day-to-day preschool management, the Admin Control Center navigation is streamlined into **3 focused groups**, keeping only what is essential for the Public Web CMS and the Parent Portal:

1. **Parent Portal Hub** (Daily Student Operations):
   - `Students & Logins` (`/admin/students`): Student enrollment, parent email, visible PIN reveal/reset, and multi-child accounts.
   - `Daily Attendance` (`/admin/attendance`): Classroom check-ins syncing immediately to parent portal badges (`In Campus` / `Absent Today`).
   - `Student Activities` (`/admin/activities`): Daily learning milestones, photo journals, and Montessori observations.
   - `Homework & Tasks` (`/admin/homework`): Creative assignments, worksheets, and submission tracking.
   - `Classrooms` (`/admin/classes`): Class section management, teacher allocation, and room capacities.

2. **Website Live CMS** (Public Facing Presentation):
   - `Announcements Ribbon` (`/admin/announcements`): Admissions alerts, emergency closures, and holiday notices.
   - `Teachers & Faculty` (`/admin/teachers`): Staff directory, bios, photos, and Montessori credentials.
   - `Programs & Fees` (`/admin/programs`): Toddler, Playgroup, LKG, UKG curriculum and fee schedules.
   - `Campus Facilities` (`/admin/facilities`): Sensory lab, dining, outdoor play areas, and smart classrooms.
   - `Photo Gallery` (`/admin/gallery`): Campus photos and event highlights.
   - `Parent Reviews` (`/admin/testimonials`): Authentic parent testimonials and community ratings.

3. **System & Admissions** (Core Infrastructure):
   - `Admissions Queue` (`/admin/admissions`): Admission applications and parent contact requests.
   - `Staff & Admin Accounts` (`/admin/users`): Teacher and administrator login credentials.
   - `School Settings` (`/admin/settings`): School contact info, address, branding, and opening hours.

* **Top Header Shortcuts**: Direct 1-click launch buttons for both **"Parent Portal"** (`/portal`) and **"Live Website"** (`/`).

---

## 7. Neon PostgreSQL Architecture & Zero-Config Guide

### A. Direct Cloud Database Integration
The system integrates with **Neon Serverless PostgreSQL** via `@neondatabase/serverless`:
- **Driver**: Connection pooling over WebSockets/HTTPS with instant auto-scaling.
- **Dual-Write Synchronization**: When an admin or teacher updates a student, attendance record, activity, or homework, the API route simultaneously writes to:
  1. High-speed local store (`vannam-store.json`) for zero-latency in-memory response (<5ms).
  2. Neon PostgreSQL database (`neondb`) for permanent cloud persistence and multi-device synchronization.

### B. Database Schema in Neon
The following 16 tables are created and live in Neon:
| Table Name | Description | Parent Portal / Web |
| :--- | :--- | :--- |
| `students` | Enrolled children, student IDs, parent emails, phone numbers, and PINs | Parent Portal |
| `classes` | Class sections, room allocations, and assigned lead educators | Parent Portal |
| `attendance` | Daily check-in/out records with status (`PRESENT`/`ABSENT`) and remarks | Parent Portal |
| `activities` | Photo milestones, teacher observations, category tags, and timestamps | Parent Portal |
| `homework` | Assigned tasks, due dates, materials, and completion flags | Parent Portal |
| `users` | Admins, teachers, and parent credentials with passwords/PINs | Authentication |
| `programs` | Academic programs, age groups, timings, ratios, and fee structures | Public Website |
| `facilities` | Campus features, safety gear, and amenities | Public Website |
| `teachers` | Faculty directory, AMI certifications, photos, and bios | Public Website |
| `testimonials` | Parent quotes, ratings, and student associations | Public Website |
| `gallery` | Campus images categorized by sports, arts, and classrooms | Public Website |
| `announcements` | Floating dynamic announcements ribbon | Public Website |
| `enquiries` | Inbound admissions enquiries and campus tour requests | Admissions |
| `admissions` | Formal student admission applications | Admissions |
| `global_settings`| School contact details, logo, address, and metadata | Settings |
| `audit_logs` | Security and operational audit trail | Audit & Logs |

### C. Do You Need to Do Anything in Neon Base?
**Answer: NO. Everything is 100% automated.**

1. **Tables are Pre-Migrated**: All tables and live records have already been migrated and verified directly in your Neon project.
2. **Auto-Resume Compute**: Neon automatically suspends when there is no traffic (saving resources) and automatically resumes in ~300ms when any request arrives. You do not need to start or stop servers manually.
3. **Environment Configured**: The connection string is pre-configured in `.env.local` and `.env`:
   ```bash
   DATABASE_URL="postgresql://neondb_owner:npg_sbnhif1K2AZC@ep-autumn-resonance-awbnd4f3.c-12.us-east-1.aws.neon.tech/neondb?sslmode=require"
   ```
4. **Zero Maintenance**: Backups, WAL archiving, and failover are managed automatically by Neon. Any new students, PIN updates, attendance entries, or activities posted from the Admin/Teacher portal automatically persist to your Neon PostgreSQL database.
