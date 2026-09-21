const { neon } = require('@neondatabase/serverless');

const sql = neon('postgresql://neondb_owner:npg_sbnhif1K2AZC@ep-autumn-resonance-awbnd4f3.c-12.us-east-1.aws.neon.tech/neondb?sslmode=require');

async function check() {
  const students = await sql`SELECT student_id, name, parent_name, parent_email, parent_pin FROM students;`;
  const users = await sql`SELECT id, name, email, role, password FROM users ORDER BY role, name;`;
  const classes = await sql`SELECT id, name, grade, capacity, teacher_name FROM classes;`;
  const activities = await sql`SELECT id, title, category, student_name, class_name FROM activities;`;
  const homework = await sql`SELECT id, title, subject, class_name, due_date FROM homework;`;

  console.log('\n--- 1. STUDENTS IN NEON POSTGRESQL (' + students.length + ') ---');
  console.table(students);

  console.log('\n--- 2. USERS (ADMIN, TEACHER, PARENTS) IN NEON POSTGRESQL (' + users.length + ') ---');
  console.table(users);

  console.log('\n--- 3. CLASSES IN NEON POSTGRESQL (' + classes.length + ') ---');
  console.table(classes);

  console.log('\n--- 4. ACTIVITIES IN NEON POSTGRESQL (' + activities.length + ') ---');
  console.table(activities);

  console.log('\n--- 5. HOMEWORK IN NEON POSTGRESQL (' + homework.length + ') ---');
  console.table(homework);
}

check().catch(console.error);
