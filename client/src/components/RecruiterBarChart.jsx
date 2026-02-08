import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function RecruiterBarChart({ data }) {
  if (!data || data.length === 0) {
    return (
      <div className="card" style={{ textAlign: 'center', padding: '40px' }}>
        <p style={{ color: '#666' }}>No recruiter data available</p>
      </div>
    );
  }

  return (
    <div className="card">
      <h3 style={{ marginBottom: '20px', fontSize: '18px', color: '#333' }}>
        Recruiter Performance
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="recruiterName" 
            angle={-15}
            textAnchor="end"
            height={80}
          />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="candidateCount" fill="#3498db" name="Candidates Referred" />
        </BarChart>
      </ResponsiveContainer>
      <div style={{ 
        marginTop: '20px',
        padding: '16px',
        backgroundColor: '#f5f5f5',
        borderRadius: '6px'
      }}>
        <div style={{ fontSize: '14px', fontWeight: '600', color: '#333', marginBottom: '8px' }}>
          Top Performers
        </div>
        {data.slice(0, 3).map((recruiter, index) => (
          <div key={recruiter.recruiterId} style={{ 
            display: 'flex', 
            justifyContent: 'space-between',
            padding: '8px 0',
            borderBottom: index < 2 ? '1px solid #e0e0e0' : 'none'
          }}>
            <span style={{ color: '#666' }}>
              {index + 1}. {recruiter.recruiterName}
            </span>
            <span style={{ fontWeight: '600', color: '#3498db' }}>
              {recruiter.candidateCount} candidates
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecruiterBarChart;
