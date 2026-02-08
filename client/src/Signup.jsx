import { useState } from 'react';
import { useAuth } from './contexts/AuthContext';
import { register as registerApi } from './api';

function Signup({ onSignupSuccess, onLoginClick }) {
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Basic validation
    if (!formData.name || !formData.email || !formData.password) {
      setError('All fields are required');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);

    try {
      // Call register API
      const response = await registerApi(formData.name, formData.email, formData.password);
      
      // Use auth context to store token and decode user
      login(response.data.data.token);
      
      // Notify parent component about successful signup
      onSignupSuccess();
    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="card" style={{ maxWidth: '450px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '28px', marginBottom: '8px', textAlign: 'center' }}>
          Candidate Referral System
        </h1>
        <h2 style={{ fontSize: '20px', marginBottom: '32px', textAlign: 'center', color: '#666', fontWeight: 'normal' }}>
          Create your account
        </h2>
        
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              style={{ width: '100%', padding: '10px', fontSize: '14px' }}
              disabled={loading}
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              style={{ width: '100%', padding: '10px', fontSize: '14px' }}
              disabled={loading}
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Password</label>
            <div style={{ position: 'relative' }}>
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                disabled={loading}
                style={{ width: '100%', padding: '12px', paddingRight: '45px', fontSize: '14px' }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: '10px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '18px',
                  color: '#666',
                  padding: '4px'
                }}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? '👁️' : '👁️‍🗨️'}
              </button>
            </div>
          </div>

          {error && (
            <div style={{ color: 'red', marginBottom: '20px' }}>
              {error}
            </div>
          )}

          <button 
            type="submit" 
            className="btn-primary"
            style={{ width: '100%', marginBottom: '20px' }}
            disabled={loading}
          >
            {loading ? 'Creating account...' : 'Sign Up'}
          </button>
        </form>

        <p style={{ fontSize: '14px', textAlign: 'center', color: '#666' }}>
          Already have an account?{' '}
          <span 
            onClick={onLoginClick}
            style={{ color: '#007bff', cursor: 'pointer', textDecoration: 'underline' }}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}

export default Signup;
