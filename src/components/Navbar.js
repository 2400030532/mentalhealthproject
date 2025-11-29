import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setMobileMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to={isAuthenticated ? (user.role === 'admin' ? '/admin/dashboard' : '/student/dashboard') : '/'} className="navbar-logo">
          <span className="logo-icon">🧠</span>
          <span className="logo-text">Mental Health Support</span>
        </Link>

        <button 
          className="mobile-menu-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <ul className={`navbar-menu ${mobileMenuOpen ? 'active' : ''}`}>
          {!isAuthenticated ? (
            <>
              <li><Link to="/" onClick={() => setMobileMenuOpen(false)}>Home</Link></li>
              <li><Link to="/about" onClick={() => setMobileMenuOpen(false)}>About</Link></li>
              <li><Link to="/login" onClick={() => setMobileMenuOpen(false)} className="btn btn-outline">Login</Link></li>
              <li><Link to="/signup" onClick={() => setMobileMenuOpen(false)} className="btn btn-primary">Sign Up</Link></li>
            </>
          ) : user.role === 'admin' ? (
            <>
              <li><Link to="/admin/dashboard" onClick={() => setMobileMenuOpen(false)}>Dashboard</Link></li>
              <li><Link to="/admin/resources" onClick={() => setMobileMenuOpen(false)}>Resources</Link></li>
              <li><Link to="/admin/sessions" onClick={() => setMobileMenuOpen(false)}>Sessions</Link></li>
              <li><Link to="/admin/support-groups" onClick={() => setMobileMenuOpen(false)}>Support Groups</Link></li>
              <li><span className="navbar-user">Welcome, {user.name}</span></li>
              <li><button onClick={handleLogout} className="btn btn-outline">Logout</button></li>
            </>
          ) : (
            <>
              <li><Link to="/student/dashboard" onClick={() => setMobileMenuOpen(false)}>Dashboard</Link></li>
              <li><Link to="/student/resources" onClick={() => setMobileMenuOpen(false)}>Resources</Link></li>
              <li><Link to="/student/book-session" onClick={() => setMobileMenuOpen(false)}>Book Session</Link></li>
              <li><Link to="/student/support-groups" onClick={() => setMobileMenuOpen(false)}>Support Groups</Link></li>
              <li><Link to="/student/profile" onClick={() => setMobileMenuOpen(false)}>Profile</Link></li>
              <li><span className="navbar-user">Welcome, {user.name}</span></li>
              <li><button onClick={handleLogout} className="btn btn-outline">Logout</button></li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;

