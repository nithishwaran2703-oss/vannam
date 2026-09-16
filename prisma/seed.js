const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding to Neon PostgreSQL...');

  // 1. Password hashing
  const adminPasswordHash = await bcrypt.hash('Admin@Vannam2026', 10);
  const teacherPasswordHash = await bcrypt.hash('Teacher@Vannam2026', 10);

  // 2. Upsert Super Admin User
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@vannam.edu' },
    update: {
      name: 'Dr. Gayathri R. (Director)',
      passwordHash: adminPasswordHash,
      role: 'ADMIN',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&q=80'
    },
    create: {
      name: 'Dr. Gayathri R. (Director)',
      email: 'admin@vannam.edu',
      passwordHash: adminPasswordHash,
      role: 'ADMIN',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&q=80'
    }
  });
  console.log('✅ Admin user created/verified:', adminUser.email);

  // 3. Upsert Teacher User
  const teacherUser = await prisma.user.upsert({
    where: { email: 'teacher@vannam.edu' },
    update: {
      name: 'Teacher Sarah Jenkins',
      passwordHash: teacherPasswordHash,
      role: 'TEACHER',
      avatar: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=120&q=80'
    },
    create: {
      name: 'Teacher Sarah Jenkins',
      email: 'teacher@vannam.edu',
      passwordHash: teacherPasswordHash,
      role: 'TEACHER',
      avatar: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=120&q=80'
    }
  });
  console.log('✅ Teacher user created/verified:', teacherUser.email);

  // 4. Create Teacher Profile linked to User
  const teacherProfile = await prisma.teacher.upsert({
    where: { email: 'teacher@vannam.edu' },
    update: {
      userId: teacherUser.id,
      name: 'Teacher Sarah Jenkins',
      role: 'Lead Montessori Educator',
      experience: '7+ Years',
      qualifications: 'AMI Early Childhood Diploma',
      phone: '+91 98400 12345',
      image: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=400&q=80',
      active: true
    },
    create: {
      userId: teacherUser.id,
      name: 'Teacher Sarah Jenkins',
      email: 'teacher@vannam.edu',
      role: 'Lead Montessori Educator',
      experience: '7+ Years',
      qualifications: 'AMI Early Childhood Diploma',
      phone: '+91 98400 12345',
      image: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=400&q=80',
      active: true
    }
  });
  console.log('✅ Teacher profile configured:', teacherProfile.name);

  // 5. Create Classes
  const class1 = await prisma.class.upsert({
    where: { id: 'class-pre-kg-a' },
    update: {
      name: 'Pre-KG Explorers',
      grade: 'Pre-KG',
      room: 'Lotus Room 101',
      academicYear: '2026-27',
      capacity: 12,
      teacherId: teacherProfile.id
    },
    create: {
      id: 'class-pre-kg-a',
      name: 'Pre-KG Explorers',
      grade: 'Pre-KG',
      room: 'Lotus Room 101',
      academicYear: '2026-27',
      capacity: 12,
      teacherId: teacherProfile.id
    }
  });

  const class2 = await prisma.class.upsert({
    where: { id: 'class-lkg-a' },
    update: {
      name: 'Junior Kindergarten STEAM',
      grade: 'LKG',
      room: 'Orchid Room 102',
      academicYear: '2026-27',
      capacity: 15,
      teacherId: teacherProfile.id
    },
    create: {
      id: 'class-lkg-a',
      name: 'Junior Kindergarten STEAM',
      grade: 'LKG',
      room: 'Orchid Room 102',
      academicYear: '2026-27',
      capacity: 15,
      teacherId: teacherProfile.id
    }
  });
  console.log('✅ Classes created: Pre-KG Explorers & Junior Kindergarten STEAM');

  // 6. Create Students
  const student1 = await prisma.student.upsert({
    where: { studentId: 'VW-2026-001' },
    update: {
      name: 'Aarav Sharma',
      classId: class1.id,
      dob: new Date('2023-04-15'),
      gender: 'Boy',
      parentName: 'Deepak Sharma',
      parentEmail: 'deepak.sharma@example.com',
      parentPhone: '+91 98401 23456',
      bloodGroup: 'B+',
      allergies: 'None',
      status: 'Active'
    },
    create: {
      studentId: 'VW-2026-001',
      name: 'Aarav Sharma',
      classId: class1.id,
      dob: new Date('2023-04-15'),
      gender: 'Boy',
      parentName: 'Deepak Sharma',
      parentEmail: 'deepak.sharma@example.com',
      parentPhone: '+91 98401 23456',
      bloodGroup: 'B+',
      allergies: 'None',
      status: 'Active'
    }
  });

  const student2 = await prisma.student.upsert({
    where: { studentId: 'VW-2026-002' },
    update: {
      name: 'Ananya Ramesh',
      classId: class1.id,
      dob: new Date('2023-08-22'),
      gender: 'Girl',
      parentName: 'Ramesh Sundaram',
      parentEmail: 'ramesh.s@example.com',
      parentPhone: '+91 98402 34567',
      bloodGroup: 'O+',
      allergies: 'Peanut sensitivity',
      status: 'Active'
    },
    create: {
      studentId: 'VW-2026-002',
      name: 'Ananya Ramesh',
      classId: class1.id,
      dob: new Date('2023-08-22'),
      gender: 'Girl',
      parentName: 'Ramesh Sundaram',
      parentEmail: 'ramesh.s@example.com',
      parentPhone: '+91 98402 34567',
      bloodGroup: 'O+',
      allergies: 'Peanut sensitivity',
      status: 'Active'
    }
  });

  const student3 = await prisma.student.upsert({
    where: { studentId: 'VW-2026-003' },
    update: {
      name: 'Vihaan Karthik',
      classId: class2.id,
      dob: new Date('2022-11-10'),
      gender: 'Boy',
      parentName: 'Karthik Venkatesh',
      parentEmail: 'karthik.v@example.com',
      parentPhone: '+91 98403 45678',
      bloodGroup: 'A+',
      allergies: 'None',
      status: 'Active'
    },
    create: {
      studentId: 'VW-2026-003',
      name: 'Vihaan Karthik',
      classId: class2.id,
      dob: new Date('2022-11-10'),
      gender: 'Boy',
      parentName: 'Karthik Venkatesh',
      parentEmail: 'karthik.v@example.com',
      parentPhone: '+91 98403 45678',
      bloodGroup: 'A+',
      allergies: 'None',
      status: 'Active'
    }
  });
  console.log('✅ Sample students created:', student1.name, student2.name, student3.name);

  // 7. Seed Sample Activities
  await prisma.activity.create({
    data: {
      title: 'Sensory Finger Painting & Color Mixing',
      category: 'Art & Sensory',
      description: 'Aarav enthusiastically explored texture blending with child-safe organic finger paints today, creating vibrant concentric color patterns.',
      date: new Date(),
      classId: class1.id,
      studentId: student1.id,
      teacherId: teacherProfile.id,
      media: {
        create: [
          {
            url: 'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?w=800&q=80',
            fileName: 'finger-painting-activity-1.jpg',
            mimeType: 'image/jpeg'
          }
        ]
      }
    }
  });

  // 8. Seed Announcements
  await prisma.announcement.upsert({
    where: { id: 'ann-1' },
    update: {
      title: 'Annual Grand Sports & Wellness Carnival 2026',
      content: 'Join us on Saturday for interactive toddler motor challenges, fun obstacle races, and healthy family picnic stalls!',
      tag: 'Celebration',
      badge: 'Featured Event',
      status: 'PUBLISHED',
      pinned: true
    },
    create: {
      id: 'ann-1',
      title: 'Annual Grand Sports & Wellness Carnival 2026',
      content: 'Join us on Saturday for interactive toddler motor challenges, fun obstacle races, and healthy family picnic stalls!',
      tag: 'Celebration',
      badge: 'Featured Event',
      status: 'PUBLISHED',
      pinned: true
    }
  });

  // 9. Seed Audit Log
  await prisma.auditLog.create({
    data: {
      action: 'System Seed Initialized',
      entity: 'Database',
      details: 'Initial production seed successfully synchronized with Neon PostgreSQL.',
      userId: adminUser.id,
      userName: adminUser.name
    }
  });

  console.log('🎉 Seeding successfully completed!');
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
