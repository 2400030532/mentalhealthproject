import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Sidebar.css';

const Sidebar = () => {
  const { user } = useAuth();
  const location = useLocation();

  const studentLinks = [
    { path: '/student/dashboard', label: 'Dashboard', icon: '📊' },
    { path: '/student/resources', label: 'Resources', icon: '📚' },
    { path: '/student/quiz', label: 'Mental Health Quiz', icon: '📝' },
    { path: '/student/book-session', label: 'Book Session', icon: '📅' },
    { path: '/student/approved-sessions', label: 'Approved Sessions', icon: '✅' },
    { path: '/student/support-groups', label: 'Support Groups', icon: '👥' },
    { path: '/student/profile', label: 'Profile', icon: '👤' }
  ];

  const adminLinks = [
    { path: '/admin/dashboard', label: 'Dashboard', icon: '📊' },
    { path: '/admin/resources', label: 'Manage Resources', icon: '📚' },
    { path: '/admin/quiz', label: 'Manage Quiz', icon: '📝' },
    { path: '/admin/sessions', label: 'Manage Sessions', icon: '📅' },
    { path: '/admin/support-groups', label: 'Manage Groups', icon: '👥' }
  ];

  const links = user?.role === 'admin' ? adminLinks : studentLinks;

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h3>Menu</h3>
      </div>
      <nav className="sidebar-nav">
        <ul>
          {links.map(link => (
            <li key={link.path}>
              <Link
                to={link.path}
                className={location.pathname === link.path ? 'active' : ''}
              >
                <span className="sidebar-icon">{link.icon}</span>
                <span className="sidebar-label">{link.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;

