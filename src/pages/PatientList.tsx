import React, { useEffect, useState } from 'react';
import { getAllPatients, searchPatientsByName, deletePatient } from '../services/DatabaseService';
import { useDatabaseContext } from '../context/DatabaseContext';
import { Search, Download } from 'lucide-react';

interface Patient {
  id: number;
  first_name: string;
  last_name: string;
  date_of_birth: string;
  gender: string;
  email: string | null;
  phone: string | null;
  address: string | null;
  medical_notes: string | null;
  insurance_provider: string | null;
  insurance_id: string | null;
  created_at: string;
}

const PatientList: React.FC = () => {
  const { isInitialized } = useDatabaseContext();
  const [patients, setPatients] = useState<Patient[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState<keyof Patient>('last_name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  useEffect(() => {
    if (isInitialized) fetchPatients();
  }, [isInitialized]);

  const fetchPatients = async () => {
    setLoading(true);
    try {
      const data = await getAllPatients();
      setPatients(data);
    } catch {
      console.error('Error fetching patients');
    } finally {
      setLoading(false);
    }
  };

  const performSearch = async () => {
    if (!searchTerm.trim()) return fetchPatients();
    setLoading(true);
    try {
      const results = await searchPatientsByName(searchTerm);
      setPatients(results);
    } catch {
      console.error('Search failed');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this patient?')) return;
    try {
      await deletePatient(id);
      fetchPatients();
    } catch {
      alert('Failed to delete patient.');
    }
  };

  const toggleSort = (field: keyof Patient) => {
    if (field === sortBy) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  const sortedList = [...patients].sort((a, b) => {
    const aVal = a[sortBy];
    const bVal = b[sortBy];
    if (aVal === null || bVal === null) return aVal === null ? 1 : -1;
    if (typeof aVal === 'string' && typeof bVal === 'string') {
      return sortOrder === 'asc' ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
    }
    return sortOrder === 'asc' ? (aVal < bVal ? -1 : 1) : (aVal > bVal ? -1 : 1);
  });

  const exportData = () => {
    if (!patients.length) return;
    const data = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(patients, null, 2))}`;
    const link = document.createElement('a');
    link.href = data;
    link.download = 'patients_export.json';
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  if (!isInitialized) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="spinner-border animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <section className="fade-in transition-all duration-300">
      <header className="mb-6">
        <h1 className="text-3xl font-semibold text-gray-800">Registered Patients</h1>
        <p className="mt-1 text-sm text-gray-500">Search patients</p>
      </header>

      <div className="bg-white rounded shadow-md mb-8 p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5">
          <div className="relative flex-grow max-w-full sm:max-w-xs">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="w-5 h-5 text-gray-400" />
            </div>
            <input
              type="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && performSearch()}
              placeholder="Search by patient name"
              className="w-full pl-10 py-2 border rounded border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              aria-label="Search patients by name"
            />
          </div>
          <div className="flex gap-3 flex-wrap">
            <button onClick={performSearch} className="btn btn-primary px-4 py-2 rounded">
              Search
            </button>
            <button
              onClick={() => {
                setSearchTerm('');
                fetchPatients();
              }}
              className="btn btn-outline px-4 py-2 rounded"
            >
              Clear
            </button>
            <button
              onClick={exportData}
              disabled={!patients.length}
              className="btn btn-secondary flex items-center gap-1 px-4 py-2 rounded disabled:opacity-50"
            >
              <Download className="w-4 h-4" />
              Export
            </button>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="spinner-border animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
        </div>
      ) : !patients.length ? (
        <div className="bg-white shadow rounded p-10 text-center text-gray-600">
          <svg className="mx-auto mb-3 h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-lg font-medium">
            {searchTerm ? 'No matching patients found.' : 'No patients available. Add new patients to get started.'}
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto border border-gray-200 rounded shadow-sm">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {['Name', 'Date of Birth', 'Gender', 'Email', 'Phone', 'Registered', 'Actions'].map((col, i) => {
                  const keyMap: (keyof Patient)[] = ['last_name', 'date_of_birth', 'gender', 'email', 'phone', 'created_at'];
                  const key = keyMap[i];
                  return (
                    <th
                      key={col}
                      onClick={key ? () => toggleSort(key) : undefined}
                      className={`${key ? 'cursor-pointer' : ''} px-4 py-2 text-left text-sm font-medium text-gray-600`}
                      scope="col"
                      style={{ textAlign: col === 'Actions' ? 'right' : 'left' }}
                    >
                      <div className="flex items-center gap-1" style={{ justifyContent: col === 'Actions' ? 'flex-end' : 'flex-start' }}>
                        {col !== 'Actions' && col}
                        {key && sortBy === key && <span className="text-xs">{sortOrder === 'asc' ? '▲' : '▼'}</span>}
                      </div>
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sortedList.map(({ id, first_name, last_name, date_of_birth, gender, email, phone, created_at }) => (
                <tr key={id} className="hover:bg-gray-50">
                  <td className="whitespace-nowrap px-4 py-3 font-semibold text-gray-900">{last_name}, {first_name}</td>
                  <td className="px-4 py-3">{date_of_birth}</td>
                  <td className="capitalize px-4 py-3">{gender}</td>
                  <td className="px-4 py-3">{email || '—'}</td>
                  <td className="px-4 py-3">{phone || '—'}</td>
                  <td className="px-4 py-3">{new Date(created_at).toLocaleDateString()}</td>
                  <td className="px-4 py-3 text-right">
                    <button onClick={() => handleDelete(id)} className="text-red-600 hover:text-red-800" title="Delete">
                      🗑️
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
};

export default PatientList;
