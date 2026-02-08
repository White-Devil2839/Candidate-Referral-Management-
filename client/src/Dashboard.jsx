import { useState, useEffect } from 'react';
import { useAuth } from './contexts/AuthContext';
import { 
  getCandidates, 
  updateCandidateStatus, 
  deleteCandidate,
  getStatusDistribution,
  getRecruiterPerformance,
  getMyStats
} from './api';
import ReferralForm from './ReferralForm';
import StatusPieChart from './components/StatusPieChart';
import RecruiterBarChart from './components/RecruiterBarChart';
import PersonalStatsCard from './components/PersonalStatsCard';

function Dashboard() {
  const { user, isAdmin, isRecruiter } = useAuth();
  
  // Candidate states
  const [candidates, setCandidates] = useState([]);
  const [filteredCandidates, setFilteredCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Search and filter states
  const [searchJobTitle, setSearchJobTitle] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  
  // Tab state
  const [activeTab, setActiveTab] = useState('Pending');
  
  // Form visibility state
  const [isFormVisible, setIsFormVisible] = useState(false);
  
  // Modal state
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  
  // Analytics states
  const [statusDistribution, setStatusDistribution] = useState(null);
  const [recruiterPerformance, setRecruiterPerformance] = useState(null);
  const [myStats, setMyStats] = useState(null);

  // Fetch candidates and analytics when component mounts
  useEffect(() => {
    fetchCandidates();
    fetchAnalytics();
  }, []);

  // Apply filters whenever search/filter values, tab, or candidates change
  useEffect(() => {
    applyFilters();
  }, [searchJobTitle, filterStatus, activeTab, candidates]);

  const fetchCandidates = async () => {
    try {
      const response = await getCandidates();
      setCandidates(response.data.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load candidates');
    } finally {
      setLoading(false);
    }
  };

 const fetchAnalytics = async () => {
    try {
      // Fetch status distribution for all users
      const statusResp = await getStatusDistribution();
      setStatusDistribution(statusResp.data.data);

      // Fetch recruiter performance for admin only
      if (isAdmin) {
        const performanceResp = await getRecruiterPerformance();
        setRecruiterPerformance(performanceResp.data.data);
      }

      // Fetch personal stats
      const myStatsResp = await getMyStats();
      setMyStats(myStatsResp.data.data);
    } catch (err) {
      console.error('Failed to load analytics:', err);
    }
  };

  // Simple frontend filtering
  const applyFilters = () => {
    let filtered = [...candidates];

    // Filter by active tab first
    filtered = filtered.filter(candidate => candidate.status === activeTab);

    // Filter by job title (case-insensitive search)
    if (searchJobTitle) {
      filtered = filtered.filter(candidate =>
        candidate.jobTitle.toLowerCase().includes(searchJobTitle.toLowerCase())
      );
    }

    // Apply status filter from dropdown (if still used alongside tabs)
    if (filterStatus) {
      filtered = filtered.filter(candidate => candidate.status === filterStatus);
    }

    setFilteredCandidates(filtered);
  };

  const handleStatusChange = async (candidateId, newStatus) => {
    try {
      await updateCandidateStatus(candidateId, newStatus);
      
      // Update local state without refetching
      setCandidates(candidates.map(candidate =>
        candidate._id === candidateId
          ? { ...candidate, status: newStatus }
          : candidate
      ));
      
      // Refresh analytics
      fetchAnalytics();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to update status');
    }
  };

  const handleDelete = async (candidateId) => {
    if (!window.confirm('Are you sure you want to delete this candidate?')) {
      return;
    }

    try {
      await deleteCandidate(candidateId);
      
      // Remove from local state
      setCandidates(candidates.filter(candidate => candidate._id !== candidateId));
      
      // Refresh analytics
      fetchAnalytics();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to delete candidate');
    }
  };

  const handleCandidateSuccess = () => {
    setIsFormVisible(false);
    fetchCandidates();
    fetchAnalytics();
  };

  const handleCandidateRowClick = (candidate) => {
    setSelectedCandidate(candidate);
  };

  const closeModal = () => {
    setSelectedCandidate(null);
  };

  // Calculate tab counts
  const pendingCount = candidates.filter(c => c.status === 'Pending').length;
  const reviewedCount = candidates.filter(c => c.status === 'Reviewed').length;
  const hiredCount = candidates.filter(c => c.status === 'Hired').length;

  if (loading) {
    return <div style={{ padding: '20px' }}>Loading...</div>;
  }

  return (
    <div className="container">
      {/* Analytics Section - Role-Based */}
      <div style={{ marginBottom: '32px' }}>
        <h2 className="section-title">Analytics Overview</h2>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: isAdmin ? 'repeat(auto-fit, minmax(400px, 1fr))' : '1fr',
          gap: '24px'
        }}>
          {/* Personal Stats - All users */}
          {myStats && <PersonalStatsCard stats={myStats} />}
          
          {/* Status Distribution - All users */}
          {statusDistribution && <StatusPieChart data={statusDistribution} />}
          
          {/* Recruiter Performance - Admin only */}
          {isAdmin && recruiterPerformance && (
            <RecruiterBarChart data={recruiterPerformance} />
          )}
        </div>
      </div>

      {/* Candidates Section */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: '24px'
      }}>
        <h2 className="section-title" style={{ marginBottom: 0 }}>
          Candidates
        </h2>
        
        {/* Add Candidate Button - Admin and Recruiter only */}
        {(isAdmin || isRecruiter) && !isFormVisible && (
          <button
            onClick={() => setIsFormVisible(true)}
            className="btn-primary"
            style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
          >
            <span style={{ fontSize: '18px' }}>+</span> Add Candidate
          </button>
        )}
      </div>

      {/* Collapsible Form - Admin and Recruiter only */}
      {(isAdmin || isRecruiter) && isFormVisible && (
        <div style={{ marginBottom: '30px' }}>
          <ReferralForm 
            onSuccess={handleCandidateSuccess}
            onCancel={() => setIsFormVisible(false)}
          />
        </div>
      )}

      {/* Search and Filter */}
      <div style={{ 
        display: 'flex', 
        gap: '15px', 
        marginBottom: '20px',
        flexWrap: 'wrap'
      }}>
        <input
          type="text"
          placeholder="Search by job title..."
          value={searchJobTitle}
          onChange={(e) => setSearchJobTitle(e.target.value)}
          className="input"
          style={{ flex: '1', minWidth: '250px' }}
        />
      </div>

      {/* Status Tabs */}
      <div className="tabs">
        <button
          className={`tab ${activeTab === 'Pending' ? 'active' : ''}`}
          onClick={() => setActiveTab('Pending')}
        >
          Pending <span className="tab-count">{pendingCount}</span>
        </button>
        <button
          className={`tab ${activeTab === 'Reviewed' ? 'active' : ''}`}
          onClick={() => setActiveTab('Reviewed')}
        >
          Reviewed <span className="tab-count">{reviewedCount}</span>
        </button>
        <button
          className={`tab ${activeTab === 'Hired' ? 'active' : ''}`}
          onClick={() => setActiveTab('Hired')}
        >
          Hired <span className="tab-count">{hiredCount}</span>
        </button>
      </div>

      {/* Error Display */}
      {error && (
        <div className="error-message" style={{ marginBottom: '20px' }}>
          {error}
        </div>
      )}

      {/* Candidates Table */}
      {filteredCandidates.length === 0 ? (
        <div style={{ 
          textAlign: 'center', 
          padding: '60px 20px',
          color: '#666'
        }}>
          <p style={{ fontSize: '18px', marginBottom: '10px' }}>
            No candidates found in "{activeTab}" status
          </p>
          <p style={{ fontSize: '14px', color: '#999' }}>
            {searchJobTitle ? 'Try adjusting your search criteria' : 'Start by adding a new candidate'}
          </p>
        </div>
      ) : (
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Job Title</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCandidates.map(candidate => (
                <tr 
                  key={candidate._id}
                  onClick={() => handleCandidateRowClick(candidate)}
                  style={{ cursor: 'pointer' }}
                >
                  <td>{candidate.name}</td>
                  <td>{candidate.email}</td>
                  <td>{candidate.phone}</td>
                  <td>{candidate.jobTitle}</td>
                  <td>
                    <select
                      value={candidate.status}
                      onChange={(e) => {
                        e.stopPropagation();
                        handleStatusChange(candidate._id, e.target.value);
                      }}
                      onClick={(e) => e.stopPropagation()}
                      className="status-select"
                      style={{
                        backgroundColor: 
                          candidate.status === 'Pending' ? '#fff3cd' :
                          candidate.status === 'Reviewed' ? '#cfe2ff' :
                          '#d1e7dd'
                      }}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Reviewed">Reviewed</option>
                      <option value="Hired">Hired</option>
                    </select>
                  </td>
                  <td>
                    {/* Only admin or owner can delete */}
                    {(isAdmin || candidate.referredBy?._id === user?.id) && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(candidate._id);
                        }}
                        className="btn-danger"
                      >
                        Delete
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Candidate Detail Modal */}
      {selectedCandidate && (
        <div
          className="modal-overlay"
          onClick={closeModal}
        >
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <h3>Candidate Details</h3>
              <button onClick={closeModal} className="modal-close">
                ×
              </button>
            </div>
            <div className="modal-body">
              <div className="modal-field">
                <strong>Name:</strong>
                <span>{selectedCandidate.name}</span>
              </div>
              <div className="modal-field">
                <strong>Email:</strong>
                <span>{selectedCandidate.email}</span>
              </div>
              <div className="modal-field">
                <strong>Phone:</strong>
                <span>{selectedCandidate.phone}</span>
              </div>
              <div className="modal-field">
                <strong>Job Title:</strong>
                <span>{selectedCandidate.jobTitle}</span>
              </div>
              <div className="modal-field">
                <strong>Status:</strong>
                <span className={`status-badge status-${selectedCandidate.status.toLowerCase()}`}>
                  {selectedCandidate.status}
                </span>
              </div>
              {selectedCandidate.referredBy && (
                <div className="modal-field">
                  <strong>Referred By:</strong>
                  <span>{selectedCandidate.referredBy.name} ({selectedCandidate.referredBy.email})</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
