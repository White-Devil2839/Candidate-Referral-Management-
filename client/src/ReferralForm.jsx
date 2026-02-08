import { useState } from 'react';
import { createCandidate } from './api';

function ReferralForm({ onCandidateAdded, onCancel }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    jobTitle: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Basic validation
    if (!formData.name || !formData.email || !formData.phone || !formData.jobTitle) {
      setError('All fields are required');
      return;
    }

    setLoading(true);

    try {
      // Call API to create candidate
      await createCandidate(formData);
      
      setSuccess('Candidate added successfully!');
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        jobTitle: ''
      });

      // Notify parent to refresh candidate list
      if (onCandidateAdded) {
        onCandidateAdded();
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add candidate');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ 
      background: 'white',
      border: '1px solid #e0e0e0',
      padding: '30px', 
      borderRadius: '8px',
      marginBottom: '40px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
    }}>
      <h2 style={{ marginBottom: '24px', fontSize: '20px', color: '#333' }}>Add New Candidate</h2>
      
      <form onSubmit={handleSubmit}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', fontSize: '14px' }}>Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              style={{ width: '100%', padding: '10px 12px', fontSize: '14px' }}
              disabled={loading}
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', fontSize: '14px' }}>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              style={{ width: '100%', padding: '10px 12px', fontSize: '14px' }}
              disabled={loading}
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', fontSize: '14px' }}>Phone:</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              style={{ width: '100%', padding: '10px 12px', fontSize: '14px' }}
              disabled={loading}
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', fontSize: '14px' }}>Job Title:</label>
            <input
              type="text"
              name="jobTitle"
              value={formData.jobTitle}
              onChange={handleChange}
              style={{ width: '100%', padding: '10px 12px', fontSize: '14px' }}
              disabled={loading}
            />
          </div>
        </div>

        {error && (
          <div style={{ 
            color: '#d32f2f',
            backgroundColor: '#ffebee',
            padding: '12px 16px',
            borderRadius: '6px',
            marginBottom: '20px',
            fontSize: '14px'
          }}>
            ⚠️ {error}
          </div>
        )}

        {success && (
          <div style={{ 
            color: '#2e7d32',
            backgroundColor: '#e8f5e9',
            padding: '12px 16px',
            borderRadius: '6px',
            marginBottom: '20px',
            fontSize: '14px'
          }}>
            ✓ {success}
          </div>
        )}

        <div style={{ display: 'flex', gap: '12px' }}>
          <button 
            type="submit" 
            className="btn-primary"
            disabled={loading}
          >
            {loading ? 'Adding...' : 'Add Candidate'}
          </button>
          
          {onCancel && (
            <button 
              type="button"
              onClick={onCancel}
              style={{
                padding: '12px 32px',
                fontSize: '16px',
                fontWeight: '600',
                backgroundColor: '#f5f5f5',
                color: '#666',
                border: '1px solid #ddd',
                borderRadius: '6px',
                cursor: 'pointer'
              }}
              disabled={loading}
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default ReferralForm;
