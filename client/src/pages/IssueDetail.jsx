import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

const IssueDetail = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [issue, setIssue] = useState(null);
  const [status, setStatus] = useState('');
  const [priority, setPriority] = useState('');

  useEffect(() => {
    fetchIssue();
  }, [id]);

  const fetchIssue = async () => {
    try {
      const { data } = await api.get(`/issues/${id}`);
      setIssue(data);
      setStatus(data.status);
      setPriority(data.priority);
    } catch (error) {
      console.error('Error fetching issue:', error);
    }
  };

  const handleUpdate = async () => {
    try {
      await api.put(`/issues/${id}/status`, { status, priority });
      fetchIssue();
      alert('Issue updated successfully');
    } catch (error) {
      alert('Failed to update issue');
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this issue?')) {
      try {
        await api.delete(`/issues/${id}`);
        navigate('/dashboard');
      } catch (error) {
        alert(error.response?.data?.message || 'Failed to delete issue');
      }
    }
  };

  if (!issue) return <div className="container">Loading...</div>;

  return (
    <div className="container" style={{ maxWidth: '800px' }}>
      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
          <h2>{issue.title}</h2>
          {user?.role === 'student' && issue.status === 'Pending' && (
            <button onClick={handleDelete} className="btn btn-danger">Delete</button>
          )}
        </div>
        
        <div className="grid" style={{ gridTemplateColumns: '1fr 1fr', marginBottom: '1rem' }}>
          <div><strong>Category:</strong> {issue.category}</div>
          <div><strong>Location:</strong> {issue.location}</div>
          <div><strong>Status:</strong> {issue.status}</div>
          <div><strong>Priority:</strong> {issue.priority}</div>
          <div><strong>Reported By:</strong> {issue.createdBy?.name}</div>
          <div><strong>Reported On:</strong> {new Date(issue.createdAt).toLocaleDateString()}</div>
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <strong>Description:</strong>
          <p style={{ marginTop: '0.5rem', padding: '1rem', background: '#f9fafb', borderRadius: '4px' }}>{issue.description}</p>
        </div>

        {user?.role === 'admin' && (
          <div style={{ paddingTop: '1rem', borderTop: '1px solid #e5e7eb' }}>
            <h3 style={{ marginBottom: '1rem' }}>Update Issue</h3>
            <div className="flex" style={{ flexWrap: 'wrap' }}>
              <select value={status} onChange={(e) => setStatus(e.target.value)}>
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Resolved">Resolved</option>
                <option value="Rejected">Rejected</option>
              </select>
              <select value={priority} onChange={(e) => setPriority(e.target.value)}>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
              <button onClick={handleUpdate} className="btn btn-success">Update</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default IssueDetail;
