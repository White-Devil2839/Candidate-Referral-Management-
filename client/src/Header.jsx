import { useAuth } from './contexts/AuthContext';

function Header({ isLoggedIn, onLoginClick, onSignupClick }) {
  const { user, logout } = useAuth();

  const getRoleBadgeColor = (role) => {
    return role === 'admin' ? '#e74c3c' : '#27ae60';
  };

  return (
    <header style={{ 
      background: 'white',
      borderBottom: '1px solid #e9ecef',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '16px 24px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <h1 style={{ 
          margin: 0, 
          fontSize: '24px',
          fontWeight: '600',
          color: '#2c3e50',
          letterSpacing: '-0.5px'
        }}>
          Candidate Referral System
        </h1>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          {isLoggedIn ? (
            <button onClick={logout} className="btn-primary">
              Logout
            </button>
          ) : (
            <>
              <button 
                onClick={onLoginClick}
                style={{ 
                  padding: '10px 20px', 
                  cursor: 'pointer',
                  background: 'white',
                  border: '2px solid #3498db',
                  color: '#3498db',
                  borderRadius: '6px',
                  fontSize: '14px',
                  fontWeight: '500',
                  transition: 'all 0.2s ease'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = '#3498db';
                  e.currentTarget.style.color = 'white';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = 'white';
                  e.currentTarget.style.color = '#3498db';
                }}
              >
                Login
              </button>
              <button onClick={onSignupClick} className="btn-primary">
                Sign Up
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
