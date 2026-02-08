import { useState } from 'react';
import { useAuth } from './contexts/AuthContext';
import { login as loginApi } from './api';

function Login({ onLoginSuccess, onSignupClick }) {
  const { login } = useAuth();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Basic validation
    if (!formData.email || !formData.password) {
      setError('Please provide email and password');
      return;
    }

    setLoading(true);

    try {
      // Call login API
      const response = await loginApi(formData.email, formData.password);
      
      // Use auth context to store token and decode user
      login(response.data.data.token);
      
      // Notify parent component about successful login
      onLoginSuccess();
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
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
          Login to your account
        </h2>
        
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
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
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <p style={{ fontSize: '14px', textAlign: 'center', color: '#666' }}>
          Don't have an account?{' '}
          <span 
            onClick={onSignupClick}
            style={{ color: '#007bff', cursor: 'pointer', textDecoration: 'underline' }}
          >
            Sign up
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;
