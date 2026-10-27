import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const { user } = useAuth();

  return (
    <div className="container">
      <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
        <h1 style={{ marginBottom: '1rem', color: '#2563eb' }}>Campus Issue Tracker</h1>
        <p style={{ marginBottom: '2rem', fontSize: '1.1rem', color: '#666' }}>
          Report and track campus maintenance issues efficiently
        </p>
        {user ? (
          <Link to="/dashboard" className="btn btn-primary">Go to Dashboard</Link>
        ) : (
          <div className="flex" style={{ justifyContent: 'center' }}>
            <Link to="/login" className="btn btn-primary">Login</Link>
            <Link to="/register" className="btn btn-success">Register</Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
