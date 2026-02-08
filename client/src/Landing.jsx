function Landing({ onLoginClick }) {
  return (
    <div className="container">
      <div className="card">
        <h1 style={{ fontSize: '42px', marginBottom: '16px', textAlign: 'center' }}>
          Candidate Referral Management System
        </h1>
        
        <p style={{ 
          fontSize: '18px', 
          color: '#666', 
          marginBottom: '50px',
          textAlign: 'center',
          lineHeight: '1.6'
        }}>
          Streamline your employee referral process and track candidate progress efficiently
        </p>

        <div style={{ marginBottom: '50px' }}>
          <h2 style={{ 
            fontSize: '24px', 
            marginBottom: '24px',
            color: '#333'
          }}>
            What you can do:
          </h2>
          <ul style={{ 
            fontSize: '16px', 
            lineHeight: '2',
            paddingLeft: '20px'
          }}>
            <li style={{ marginBottom: '12px' }}>
              <strong>Add and manage candidate referrals</strong> — Submit new candidates with their details and track them all in one place
            </li>
            <li style={{ marginBottom: '12px' }}>
              <strong>Track candidate status</strong> — Update candidates through the hiring pipeline: Pending, Reviewed, or Hired
            </li>
            <li style={{ marginBottom: '12px' }}>
              <strong>View real-time statistics</strong> — Monitor your referral metrics and see how many candidates are in each stage
            </li>
          </ul>
        </div>

        <div className="text-center">
          <button 
            onClick={onLoginClick}
            className="btn-primary"
          >
            Login to Get Started
          </button>
        </div>
      </div>
    </div>
  );
}

export default Landing;
