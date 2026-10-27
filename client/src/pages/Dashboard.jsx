import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const { user } = useAuth();
  const [issues, setIssues] = useState([]);
  const [filter, setFilter] = useState({ status: '', category: '' });

  useEffect(() => {
    fetchIssues();
  }, [filter]);

  const fetchIssues = async () => {
    try {
      const params = {};
      if (filter.status) params.status = filter.status;
      if (filter.category) params.category = filter.category;
      const { data } = await api.get('/issues', { params });
      setIssues(data);
    } catch (error) {
      console.error('Error fetching issues:', error);
    }
  };

  const getBadgeClass = (type, value) => {
    const map = {
      status: { Pending: 'badge-pending', 'In Progress': 'badge-inprogress', Resolved: 'badge-resolved', Rejected: 'badge-rejected' },
      priority: { Low: 'badge-low', Medium: 'badge-medium', High: 'badge-high' }
    };
    return `badge ${map[type][value]}`;
  };

  return (
    <div className="container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h1>Issues Dashboard</h1>
        {user?.role === 'student' && <Link to="/create-issue" className="btn btn-primary">+ Report New Issue</Link>}
      </div>

      <div className="card">
        <div className="flex" style={{ gap: '1rem', flexWrap: 'wrap' }}>
          <select value={filter.status} onChange={(e) => setFilter({ ...filter, status: e.target.value })}>
            <option value="">All Status</option>
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Resolved">Resolved</option>
            <option value="Rejected">Rejected</option>
          </select>
          <select value={filter.category} onChange={(e) => setFilter({ ...filter, category: e.target.value })}>
            <option value="">All Categories</option>
            <option value="Electrical">Electrical</option>
            <option value="Plumbing">Plumbing</option>
            <option value="Internet">Internet</option>
            <option value="Cleanliness">Cleanliness</option>
            <option value="Other">Other</option>
          </select>
        </div>
      </div>

      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Category</th>
              <th>Location</th>
              <th>Status</th>
              <th>Priority</th>
              {user?.role === 'admin' && <th>Reported By</th>}
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {issues.length === 0 ? (
              <tr>
                <td colSpan="7" style={{ textAlign: 'center', color: '#666' }}>No issues found</td>
              </tr>
            ) : (
              issues.map((issue) => (
                <tr key={issue._id}>
                  <td>{issue.title}</td>
                  <td>{issue.category}</td>
                  <td>{issue.location}</td>
                  <td><span className={getBadgeClass('status', issue.status)}>{issue.status}</span></td>
                  <td><span className={getBadgeClass('priority', issue.priority)}>{issue.priority}</span></td>
                  {user?.role === 'admin' && <td>{issue.createdBy?.name}</td>}
                  <td>
                    <Link to={`/issue/${issue._id}`} className="btn btn-primary" style={{ padding: '0.25rem 0.5rem', fontSize: '0.8rem' }}>View</Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
