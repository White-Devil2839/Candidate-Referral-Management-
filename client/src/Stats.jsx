import { useState, useEffect } from 'react';
import { getStats } from './api';

function Stats() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch stats when component mounts
  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await getStats();
      setStats(response.data.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load statistics');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div style={{ marginBottom: '30px' }}>Loading statistics...</div>;
  }

  if (error) {
    return (
      <div style={{ 
        color: '#d32f2f', 
        backgroundColor: '#ffebee',
        padding: '15px',
        borderRadius: '5px',
        marginBottom: '20px'
      }}>
        ⚠️ Something went wrong loading statistics. Please refresh the page.
      </div>
    );
  }

  return (
    <div style={{ marginBottom: '40px' }}>
      <h2 style={{ marginBottom: '20px', fontSize: '24px', color: '#333' }}>Statistics</h2>
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '20px' 
      }}>
        {/* Total Card */}
        <div style={{ 
          background: 'white',
          border: '1px solid #e0e0e0',
          borderRadius: '8px',
          padding: '24px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
          transition: 'transform 0.2s, box-shadow 0.2s'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-2px)';
          e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.05)';
        }}>
          <div style={{ fontSize: '36px', fontWeight: 'bold', color: '#333', marginBottom: '8px' }}>
            {stats?.total || 0}
          </div>
          <div style={{ fontSize: '14px', color: '#666', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            Total Candidates
          </div>
        </div>
        
        {/* Pending Card */}
        <div style={{ 
          background: 'white',
          border: '1px solid #e0e0e0',
          borderLeft: '4px solid #ff9800',
          borderRadius: '8px',
          padding: '24px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
          transition: 'transform 0.2s, box-shadow 0.2s'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-2px)';
          e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.05)';
        }}>
          <div style={{ fontSize: '36px', fontWeight: 'bold', color: '#ff9800', marginBottom: '8px' }}>
            {stats?.pending || 0}
          </div>
          <div style={{ fontSize: '14px', color: '#666', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            Pending Review
          </div>
        </div>
        
        {/* Reviewed Card */}
        <div style={{ 
          background: 'white',
          border: '1px solid #e0e0e0',
          borderLeft: '4px solid #2196f3',
          borderRadius: '8px',
          padding: '24px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
          transition: 'transform 0.2s, box-shadow 0.2s'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-2px)';
          e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.05)';
        }}>
          <div style={{ fontSize: '36px', fontWeight: 'bold', color: '#2196f3', marginBottom: '8px' }}>
            {stats?.reviewed || 0}
          </div>
          <div style={{ fontSize: '14px', color: '#666', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            Under Review
          </div>
        </div>
        
        {/* Hired Card */}
        <div style={{ 
          background: 'white',
          border: '1px solid #e0e0e0',
          borderLeft: '4px solid #4caf50',
          borderRadius: '8px',
          padding: '24px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
          transition: 'transform 0.2s, box-shadow 0.2s'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-2px)';
          e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.05)';
        }}>
          <div style={{ fontSize: '36px', fontWeight: 'bold', color: '#4caf50', marginBottom: '8px' }}>
            {stats?.hired || 0}
          </div>
          <div style={{ fontSize: '14px', color: '#666', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            Successfully Hired
          </div>
        </div>
      </div>
    </div>
  );
}

export default Stats;
