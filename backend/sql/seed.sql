INSERT INTO services (name, category, description) VALUES
  ('Comprehensive nursing assessments', 'Nursing & Clinical Care', 'Routine in-home nursing review and vitals check'),
  ('Medication administration & management', 'Nursing & Clinical Care', 'Medication setup, dose tracking, and compliance support'),
  ('IV infusions and injections', 'Nursing & Clinical Care', 'At-home IV therapy and physician-prescribed injections'),
  ('Wound care & dressing', 'Nursing & Clinical Care', 'Advanced wound management and sterile dressing changes'),
  ('Doctor home visits', 'Medical & Specialist Visits', 'General practitioner home consultation and follow-up'),
  ('Specialist consultations', 'Medical & Specialist Visits', 'Specialist referral assessment on request'),
  ('Physiotherapy', 'Allied Health Services', 'Home physiotherapy for mobility and pain management'),
  ('Rehabilitation support', 'Allied Health Services', 'Post-illness or post-surgery rehabilitation assistance'),
  ('One-on-one caregivers', 'Personal & Support Care', 'Dedicated caregiver for ADLs and emotional support'),
  ('Palliative & end-of-life care', 'Personal & Support Care', 'Comfort-focused care with family support')
ON CONFLICT (name) DO NOTHING;
