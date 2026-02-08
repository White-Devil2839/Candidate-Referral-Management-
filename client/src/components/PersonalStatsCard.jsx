function PersonalStatsCard({ stats }) {
  if (!stats) {
    return null;
  }

  const statItems = [
    { label: 'Total Referrals', value: stats.total || 0, color: '#3498db', icon: '📊' },
    { label: 'Pending', value: stats.pending || 0, color: '#ff9800', icon: '⏳' },
    { label: 'Reviewed', value: stats.reviewed || 0, color: '#2196f3', icon: '👀' },
    { label: 'Hired', value: stats.hired || 0, color: '#4caf50', icon: '✅' }
  ];

  return (
    <div className="card">
      <h3 style={{ marginBottom: '20px', fontSize: '18px', color: '#333' }}>
        Your Performance
      </h3>
      
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(2, 1fr)', 
        gap: '16px' 
      }}>
        {statItems.map(item => (
          <div key={item.label} style={{
            padding: '20px',
            backgroundColor: '#f8f9fa',
            borderRadius: '8px',
            borderLeft: `4px solid ${item.color}`,
            transition: 'transform 0.2s',
            cursor: 'default'
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            <div style={{ fontSize: '24px', marginBottom: '8px' }}>
              {item.icon}
            </div>
            <div style={{ 
              fontSize: '28px', 
              fontWeight: 'bold', 
              color: item.color,
              marginBottom: '4px'
            }}>
              {item.value}
            </div>
            <div style={{ 
              fontSize: '13px', 
              color: '#666',
              fontWeight: '500'
            }}>
              {item.label}
            </div>
          </div>
        ))}
      </div>

      {stats.total > 0 && (
        <div style={{ 
          marginTop: '20px',
          padding: '16px',
          backgroundColor: '#e3f2fd',
          borderRadius: '6px',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '14px', color: '#1976d2', fontWeight: '600' }}>
            Success Rate: {((stats.hired / stats.total) * 100).toFixed(1)}%
          </div>
          <div style={{ fontSize: '12px', color: '#666', marginTop: '4px' }}>
            {stats.hired} hired out of {stats.total} total referrals
          </div>
        </div>
      )}
    </div>
  );
}

export default PersonalStatsCard;
