import React, { useState } from 'react';
import { useDatabaseContext } from '../context/DatabaseContext';
import { registerPatient } from '../services/DatabaseService';

const initialForm = {
  first_name: '',
  last_name: '',
  date_of_birth: '',
  gender: '',
  email: '',
  phone: '',
  address: '',
  medical_notes: '',
  insurance_provider: '',
  insurance_id: '',
};

const PatientRegistration: React.FC = () => {
  const { isInitialized } = useDatabaseContext();
  const [formData, setFormData] = useState(initialForm);
  const [errors, setErrors] = useState<any>({});
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: undefined });
  };

  const validate = () => {
    const newErrors: any = {};
    if (!formData.first_name.trim()) newErrors.first_name = 'Required';
    if (!formData.last_name.trim()) newErrors.last_name = 'Required';
    if (!formData.date_of_birth) newErrors.date_of_birth = 'Required';
    if (!formData.gender) newErrors.gender = 'Required';
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      await registerPatient(formData);
      setSuccess(true);
      setFormData(initialForm);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (!isInitialized) return <div className="text-center py-12">Loading...</div>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow">
      <h1 className="text-xl font-semibold mb-4">Register new Patient</h1>
      {success && <div className="mb-4 text-green-600">Patient registered successfully!</div>}

      <form onSubmit={handleSubmit} className="grid gap-4 grid-cols-1 sm:grid-cols-2">
        {['first_name', 'last_name', 'date_of_birth', 'gender', 'email', 'phone'].map((field) => (
          <div key={field} className="col-span-1">
            <label className="block text-sm font-medium mb-1 capitalize" htmlFor={field}>{field.replace('_', ' ')}</label>
            {field === 'gender' ? (
              <select
                name="gender"
                id="gender"
                value={formData.gender}
                onChange={handleChange}
                className="form-input w-full"
              >
                <option value="">Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            ) : (
              <input
                type={field === 'date_of_birth' ? 'date' : 'text'}
                id={field}
                name={field}
                value={(formData as any)[field]}
                onChange={handleChange}
                className="form-input w-full"
              />
            )}
            {errors[field] && <p className="text-red-500 text-sm">{errors[field]}</p>}
          </div>
        ))}

        <div className="sm:col-span-2">
          <label className="block text-sm font-medium mb-1" htmlFor="address">Address</label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="form-input w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="insurance_provider">Insurance Provider</label>
          <input
            type="text"
            id="insurance_provider"
            name="insurance_provider"
            value={formData.insurance_provider}
            onChange={handleChange}
            className="form-input w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="insurance_id">Insurance ID</label>
          <input
            type="text"
            id="insurance_id"
            name="insurance_id"
            value={formData.insurance_id}
            onChange={handleChange}
            className="form-input w-full"
          />
        </div>

        <div className="sm:col-span-2">
          <label className="block text-sm font-medium mb-1" htmlFor="medical_notes">Medical notes</label>
          <textarea
            id="medical_notes"
            name="medical_notes"
            value={formData.medical_notes}
            onChange={handleChange}
            rows={3}
            className="form-textarea w-full"
          ></textarea>
        </div>

        <div className="sm:col-span-2 text-right">
          <button
            type="submit"
            className="btn btn-primary"
            disabled={loading}
          >
            {loading ? 'Submitting...' : 'Register Patient'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PatientRegistration;
