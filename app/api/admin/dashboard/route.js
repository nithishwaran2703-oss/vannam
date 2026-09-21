import { NextResponse } from 'next/server';
import { getStore } from '@/lib/dataStore';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  try {
    const store = getStore();

    // Enquiries & stats
    const enquiries = store.enquiries || [];
    const enquiryStats = {
      total: enquiries.length,
      new: enquiries.filter((e) => e.status === 'new').length,
      contacted: enquiries.filter((e) => e.status === 'contacted').length,
      followup: enquiries.filter((e) => e.status === 'followup').length,
      resolved: enquiries.filter((e) => e.status === 'resolved').length,
      archived: enquiries.filter((e) => e.status === 'archived').length
    };

    // Admissions & stats
    const admissions = store.admissions || [];
    const admissionStats = {
      total: admissions.length,
      pending: admissions.filter((a) => a.status === 'pending' || a.status === 'new').length,
      interview_scheduled: admissions.filter((a) => a.status === 'interview_scheduled').length,
      accepted: admissions.filter((a) => a.status === 'accepted').length,
      enrolled: admissions.filter((a) => a.status === 'enrolled').length,
      waitlisted: admissions.filter((a) => a.status === 'waitlisted').length,
      rejected: admissions.filter((a) => a.status === 'rejected').length
    };

    // Return everything in one single fast consolidated JSON payload
    return NextResponse.json(
      {
        success: true,
        enquiries,
        enquiryStats,
        admissions,
        admissionStats,
        programs: store.programs || [],
        teachers: store.teachers || [],
        gallery: store.gallery || [],
        announcements: store.announcements || [],
        logs: store.auditLogs || [],
        students: store.students || [],
        classes: store.classes || [],
        activities: store.activities || [],
        attendance: store.attendance || []
      },
      {
        headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate, max-age=0'
        }
      }
    );
  } catch (error) {
    console.error('Error fetching consolidated dashboard data:', error);
    return NextResponse.json({ error: error.message || 'Failed to fetch dashboard data' }, { status: 500 });
  }
}
