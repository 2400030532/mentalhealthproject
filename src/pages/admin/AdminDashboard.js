import React, { useState, useEffect, useCallback } from 'react';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import { useAuth } from '../../context/AuthContext';
import { sessionsApi, resourcesApi, supportGroupsApi } from '../../api/mockApi';
import { useToast } from '../../context/ToastContext';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const { user } = useAuth();
  const { showToast } = useToast();
  const [stats, setStats] = useState({
    totalResources: 0,
    totalSessions: 0,
    pendingSessions: 0,
    totalGroups: 0
  });
  const [pendingSessions, setPendingSessions] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadDashboardData = useCallback(async () => {
    try {
      const [sessionsRes, resourcesRes, groupsRes] = await Promise.all([
        sessionsApi.getAll(),
        resourcesApi.getAll(),
        supportGroupsApi.getAll()
      ]);

      const sessions = sessionsRes.data || [];
      const pending = sessions.filter(s => s.status === 'pending').slice(0, 5);

      setPendingSessions(pending);
      setStats({
        totalResources: resourcesRes.data?.length || 0,
        totalSessions: sessions.length,
        pendingSessions: sessions.filter(s => s.status === 'pending').length,
        totalGroups: groupsRes.data?.length || 0
      });
    } catch (error) {
      showToast('Failed to load dashboard data', 'error');
    } finally {
      setLoading(false);
    }
  }, [showToast]);

  useEffect(() => {
    loadDashboardData();
  }, [loadDashboardData]);

  const handleApproveSession = async (sessionId) => {
    try {
      const result = await sessionsApi.update(sessionId, { status: 'approved' });
      if (result.success) {
        showToast('Session approved successfully', 'success');
        loadDashboardData();
      }
    } catch (error) {
      showToast('Failed to approve session', 'error');
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
            <h1 className="page-title">Admin Dashboard</h1>
            <p className="page-subtitle">Welcome, {user.name}. Manage the platform here.</p>

            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-icon">📚</div>
                <div className="stat-content">
                  <h3>{stats.totalResources}</h3>
                  <p>Total Resources</p>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">📅</div>
                <div className="stat-content">
                  <h3>{stats.totalSessions}</h3>
                  <p>Total Sessions</p>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">⏳</div>
                <div className="stat-content">
                  <h3>{stats.pendingSessions}</h3>
                  <p>Pending Sessions</p>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">👥</div>
                <div className="stat-content">
                  <h3>{stats.totalGroups}</h3>
                  <p>Support Groups</p>
                </div>
              </div>
            </div>

            <div className="dashboard-section">
              <h2 className="section-title">Pending Session Approvals</h2>
              {pendingSessions.length > 0 ? (
                <div className="sessions-table">
                  <table>
                    <thead>
                      <tr>
                        <th>Student</th>
                        <th>Therapist</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {pendingSessions.map(session => (
                        <tr key={session.id}>
                          <td>{session.studentName}</td>
                          <td>{session.therapistName}</td>
                          <td>{new Date(session.date).toLocaleDateString()}</td>
                          <td>{session.time}</td>
                          <td>
                            <span className={`status-badge status-${session.status}`}>
                              {session.status}
                            </span>
                          </td>
                          <td>
                            <button
                              className="btn btn-primary"
                              onClick={() => handleApproveSession(session.id)}
                              style={{ padding: '6px 12px', fontSize: '14px' }}
                            >
                              Approve
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="empty-state">
                  <p>No pending sessions</p>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default AdminDashboard;

