# Adelaide Medical Services MVP

A small but scalable operations system for a Nairobi-based home healthcare agency.

## Stack
- **Frontend:** React + Vite
- **Backend:** Node.js + Express
- **Database:** PostgreSQL

## MVP Features
- Service catalog grouped by care category.
- Dashboard totals (patients, appointments, care plans).
- Appointment and patient API endpoints.
- Contact/intake form for new inquiries.
- SQL schema + seed scripts for quick setup.

## Project Structure
- `frontend/` React operations dashboard and intake UI.
- `backend/` REST API and PostgreSQL integration.
- `backend/sql/schema.sql` database schema.
- `backend/sql/seed.sql` starter service data.

## Run Locally
1. Install dependencies:
   ```bash
   npm install
   ```
2. Create database and run scripts:
   ```bash
   createdb adelaide
   psql -d adelaide -f backend/sql/schema.sql
   psql -d adelaide -f backend/sql/seed.sql
   ```
3. Configure backend env:
   ```bash
   cp backend/.env.example backend/.env
   ```
4. Start frontend + backend:
   ```bash
   npm run dev
   ```

## Suggested Next Iterations
- Authentication and role-based access (admin, nurse, coordinator).
- Scheduling calendar view and staff assignment.
- Clinical notes and file uploads.
- Billing/invoice module with M-Pesa integration.
- Audit logs and analytics for quality improvement.
