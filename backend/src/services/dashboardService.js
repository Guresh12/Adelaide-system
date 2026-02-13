import { pool } from '../db/pool.js';

export async function getDashboardSummary() {
  const [patients, appointments, carePlans, upcoming] = await Promise.all([
    pool.query('SELECT COUNT(*)::int AS total FROM patients'),
    pool.query('SELECT COUNT(*)::int AS total FROM appointments'),
    pool.query('SELECT COUNT(*)::int AS total FROM care_plans'),
    pool.query(`
      SELECT a.id, p.full_name AS patient_name, s.name AS service, a.scheduled_for, a.status
      FROM appointments a
      JOIN patients p ON p.id = a.patient_id
      JOIN services s ON s.id = a.service_id
      WHERE a.scheduled_for >= NOW()
      ORDER BY a.scheduled_for ASC
      LIMIT 8
    `)
  ]);

  return {
    totals: {
      patients: patients.rows[0].total,
      appointments: appointments.rows[0].total,
      carePlans: carePlans.rows[0].total
    },
    upcomingVisits: upcoming.rows
  };
}
