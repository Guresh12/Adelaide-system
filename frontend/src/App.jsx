import { useEffect, useMemo, useState } from 'react';
import StatCard from './components/StatCard.jsx';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';

const fallbackServices = [
  { name: 'Comprehensive nursing assessments', category: 'Nursing & Clinical Care' },
  { name: 'Doctor home visits', category: 'Medical & Specialist Visits' },
  { name: 'Physiotherapy', category: 'Allied Health Services' },
  { name: 'Palliative & end-of-life care', category: 'Personal & Support Care' }
];

export default function App() {
  const [dashboard, setDashboard] = useState(null);
  const [services, setServices] = useState([]);
  const [form, setForm] = useState({ name: '', phone: '', serviceNeeded: '', message: '' });
  const [status, setStatus] = useState('idle');

  useEffect(() => {
    fetch(`${API_BASE}/dashboard`)
      .then((res) => res.json())
      .then(setDashboard)
      .catch(() => setDashboard({ totals: { patients: 0, appointments: 0, carePlans: 0 }, upcomingVisits: [] }));

    fetch(`${API_BASE}/services`)
      .then((res) => res.json())
      .then(setServices)
      .catch(() => setServices(fallbackServices));
  }, []);

  const groupedServices = useMemo(() => {
    return services.reduce((acc, item) => {
      acc[item.category] = [...(acc[item.category] || []), item.name];
      return acc;
    }, {});
  }, [services]);

  const onChange = (event) => {
    setForm((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const submitInquiry = async (event) => {
    event.preventDefault();
    setStatus('submitting');

    try {
      const response = await fetch(`${API_BASE}/inquiries`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });

      if (!response.ok) {
        throw new Error('Submission failed');
      }

      setStatus('success');
      setForm({ name: '', phone: '', serviceNeeded: '', message: '' });
    } catch {
      setStatus('error');
    }
  };

  return (
    <main className="layout">
      <header className="hero">
        <h1>Adelaide Medical Services - Operations MVP</h1>
        <p>
          Nairobi-based home healthcare coordination dashboard for nursing care, specialist visits,
          allied health, and personal support services.
        </p>
      </header>

      <section className="grid stats">
        <StatCard label="Registered Patients" value={dashboard?.totals?.patients ?? '...'} />
        <StatCard label="Total Appointments" value={dashboard?.totals?.appointments ?? '...'} />
        <StatCard label="Active Care Plans" value={dashboard?.totals?.carePlans ?? '...'} />
      </section>

      <section className="panel">
        <h2>Our Services</h2>
        <div className="service-grid">
          {Object.entries(groupedServices).map(([category, items]) => (
            <article key={category} className="service-card">
              <h3>{category}</h3>
              <ul>
                {items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="panel">
        <h2>Why Choose Adelaide Medical Services</h2>
        <ul>
          <li>Qualified and experienced healthcare professionals</li>
          <li>Hospital-level care in your home</li>
          <li>Individualised care plans with dignity, privacy, and respect</li>
          <li>Flexible short-term and long-term care options</li>
          <li>Trusted by families across Nairobi</li>
        </ul>
      </section>

      <section className="grid two">
        <article className="panel">
          <h2>Who We Serve</h2>
          <ul>
            <li>Elderly clients</li>
            <li>Post-hospital patients</li>
            <li>Individuals with chronic conditions</li>
            <li>New mothers and families</li>
            <li>Clients requiring short-term or long-term care</li>
          </ul>
        </article>
        <article className="panel">
          <h2>Our Commitment</h2>
          <ul>
            <li>Safe, ethical, and compassionate care</li>
            <li>Evidence-based clinical practices</li>
            <li>Continuous quality improvement</li>
            <li>Supporting families through every stage of care</li>
          </ul>
        </article>
      </section>

      <section className="panel">
        <h2>Contact & Intake</h2>
        <form onSubmit={submitInquiry} className="intake-form">
          <input name="name" value={form.name} onChange={onChange} placeholder="Full name" required />
          <input name="phone" value={form.phone} onChange={onChange} placeholder="Phone number" required />
          <input
            name="serviceNeeded"
            value={form.serviceNeeded}
            onChange={onChange}
            placeholder="Service needed"
            required
          />
          <textarea
            name="message"
            value={form.message}
            onChange={onChange}
            rows="4"
            placeholder="Share patient needs or location in Nairobi"
          />
          <button type="submit" disabled={status === 'submitting'}>
            {status === 'submitting' ? 'Submitting...' : 'Submit inquiry'}
          </button>
        </form>
        {status === 'success' && <p className="success">Thanks! We will contact you shortly.</p>}
        {status === 'error' && <p className="error">Could not submit right now. Please call support.</p>}
      </section>
    </main>
  );
}
