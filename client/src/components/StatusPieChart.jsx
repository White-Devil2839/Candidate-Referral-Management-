import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

function StatusPieChart({ data }) {
  const chartData = [
    { name: 'Pending', value: data.Pending || 0, color: '#ff9800' },
    { name: 'Reviewed', value: data.Reviewed || 0, color: '#2196f3' },
    { name: 'Hired', value: data.Hired || 0, color: '#4caf50' }
  ];

  const total = chartData.reduce((sum, item) => sum + item.value, 0);

  if (total === 0) {
    return (
      <div className="card" style={{ textAlign: 'center', padding: '40px' }}>
        <p style={{ color: '#666' }}>No data available</p>
      </div>
    );
  }

  return (
    <div className="card">
      <h3 style={{ marginBottom: '20px', fontSize: '18px', color: '#333' }}>
        Candidate Status Distribution
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-around', 
        marginTop: '20px',
        padding: '16px',
        backgroundColor: '#f5f5f5',
        borderRadius: '6px'
      }}>
        {chartData.map(item => (
          <div key={item.name} style={{ textAlign: 'center' }}>
            <div style={{ 
              fontSize: '24px', 
              fontWeight: 'bold', 
              color: item.color 
            }}>
              {item.value}
            </div>
            <div style={{ fontSize: '12px', color: '#666', marginTop: '4px' }}>
              {item.name}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default StatusPieChart;
