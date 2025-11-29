import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import { useAuth } from '../../context/AuthContext';
import { sessionsApi, resourcesApi, supportGroupsApi } from '../../api/mockApi';
import { useToast } from '../../context/ToastContext';
import './StudentDashboard.css';

const StudentDashboard = () => {
  const { user } = useAuth();
  const { showToast } = useToast();
  const [stats, setStats] = useState({
    upcomingSessions: 0,
    resourcesViewed: 0,
    groupsJoined: 0
  });
  const [upcomingSessions, setUpcomingSessions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      const [sessionsRes, resourcesRes, groupsRes] = await Promise.all([
        sessionsApi.getByStudentId(user.id),
        resourcesApi.getAll(),
        supportGroupsApi.getAll()
      ]);

      const sessions = sessionsRes.data || [];
      const today = new Date();
      const upcoming = sessions
        .filter(s => s.status === 'approved' && new Date(s.date) >= today)
        .sort((a, b) => new Date(a.date) - new Date(b.date))
        .slice(0, 3);

      setUpcomingSessions(upcoming);
      setStats({
        upcomingSessions: sessions.filter(s => s.status === 'approved').length,
        resourcesViewed: resourcesRes.data?.length || 0,
        groupsJoined: groupsRes.data?.length || 0
      });
    } catch (error) {
      showToast('Failed to load dashboard data', 'error');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="loading-container">
          <div className="spinner"></div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="dashboard-layout">
        <Sidebar />
        <main className="dashboard-main">
          <div className="page-container">
            <h1 className="page-title">Welcome back, {user.name}!</h1>
            <p className="page-subtitle">Here's an overview of your mental health journey</p>

            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-icon">📅</div>
                <div className="stat-content">
                  <h3>{stats.upcomingSessions}</h3>
                  <p>Upcoming Sessions</p>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">📚</div>
                <div className="stat-content">
                  <h3>{stats.resourcesViewed}</h3>
                  <p>Available Resources</p>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">👥</div>
                <div className="stat-content">
                  <h3>{stats.groupsJoined}</h3>
                  <p>Support Groups</p>
                </div>
              </div>
            </div>

            <div className="dashboard-section">
              <h2 className="section-title">Upcoming Sessions</h2>
              {upcomingSessions.length > 0 ? (
                <div className="sessions-list">
                  {upcomingSessions.map(session => (
                    <div key={session.id} className="session-card">
                      <div className="session-info">
                        <h3>{session.therapistName}</h3>
                        <p>{new Date(session.date).toLocaleDateString()} at {session.time}</p>
                        <span className={`status-badge status-${session.status}`}>
                          {session.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="empty-state">
                  <p>No upcoming sessions. <Link to="/student/book-session">Book one now</Link></p>
                </div>
              )}
            </div>

            <div className="dashboard-section">
              <h2 className="section-title">Quick Actions</h2>
              <div className="quick-actions">
                <Link to="/student/quiz" className="action-card">
                  <span className="action-icon">📝</span>
                  <span className="action-text">Take Mental Health Quiz</span>
                </Link>
                <Link to="/student/book-session" className="action-card">
                  <span className="action-icon">📅</span>
                  <span className="action-text">Book a Session</span>
                </Link>
                <Link to="/student/approved-sessions" className="action-card">
                  <span className="action-icon">✅</span>
                  <span className="action-text">Approved Sessions</span>
                </Link>
                <Link to="/student/resources" className="action-card">
                  <span className="action-icon">📚</span>
                  <span className="action-text">Browse Resources</span>
                </Link>
                <Link to="/student/support-groups" className="action-card">
                  <span className="action-icon">👥</span>
                  <span className="action-text">Join Support Group</span>
                </Link>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default StudentDashboard;

