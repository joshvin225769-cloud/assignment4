import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">Campus Issue Tracker</Link>
      <div className="navbar-links">
        {user ? (
          <>
            <span>Welcome, {user.name} ({user.role})</span>
            <Link to="/dashboard">Dashboard</Link>
            {user.role === 'student' && <Link to="/create-issue">Report Issue</Link>}
            <button onClick={logout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
