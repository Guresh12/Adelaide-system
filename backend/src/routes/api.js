import { Router } from 'express';
import { pool } from '../db/pool.js';
import { getDashboardSummary } from '../services/dashboardService.js';

const router = Router();

router.get('/health', async (_, res) => {
  const db = await pool.query('SELECT NOW() AS now');
  res.json({ status: 'ok', dbTime: db.rows[0].now });
});

router.get('/dashboard', async (_, res, next) => {
  try {
    const summary = await getDashboardSummary();
    res.json(summary);
  } catch (error) {
    next(error);
  }
});

router.get('/services', async (_, res, next) => {
  try {
    const result = await pool.query('SELECT * FROM services ORDER BY name');
    res.json(result.rows);
  } catch (error) {
    next(error);
  }
});

router.get('/patients', async (_, res, next) => {
  try {
    const result = await pool.query('SELECT * FROM patients ORDER BY created_at DESC LIMIT 100');
    res.json(result.rows);
  } catch (error) {
    next(error);
  }
});

router.post('/patients', async (req, res, next) => {
  const { fullName, phone, location, careType } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO patients (full_name, phone, location, care_type)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [fullName, phone, location, careType]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    next(error);
  }
});

router.get('/appointments', async (_, res, next) => {
  try {
    const result = await pool.query(`
      SELECT a.id, p.full_name AS patient_name, s.name AS service, a.scheduled_for, a.status, a.notes
      FROM appointments a
      JOIN patients p ON p.id = a.patient_id
      JOIN services s ON s.id = a.service_id
      ORDER BY a.scheduled_for DESC
      LIMIT 100
    `);

    res.json(result.rows);
  } catch (error) {
    next(error);
  }
});

router.post('/appointments', async (req, res, next) => {
  const { patientId, serviceId, scheduledFor, notes } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO appointments (patient_id, service_id, scheduled_for, notes)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [patientId, serviceId, scheduledFor, notes]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    next(error);
  }
});

router.post('/inquiries', async (req, res, next) => {
  const { name, phone, serviceNeeded, message } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO inquiries (name, phone, service_needed, message)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [name, phone, serviceNeeded, message]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    next(error);
  }
});

export default router;
