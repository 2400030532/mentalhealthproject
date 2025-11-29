import React, { useState, useEffect, useCallback } from 'react';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import { sessionsApi } from '../../api/mockApi';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import './ApprovedSessionsPage.css';

const ApprovedSessionsPage = () => {
  const { user } = useAuth();
  const { showToast } = useToast();
  const [approvedSessions, setApprovedSessions] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadApprovedSessions = useCallback(async () => {
    try {
      const response = await sessionsApi.getByStudentId(user.id);
      let approved = (response.data || [])
        .filter(session => session.status === 'approved')
        .map(session => {
          // Ensure session with Dr. Sarah Johnson (id: '1') has the zoom link
          if (session.id === '1' && session.therapistName === 'Dr. Sarah Johnson') {
            return {
              ...session,
              zoomLink: session.zoomLink || 'https://us05web.zoom.us/j/5819766338?pwd=ymsoHHkmaWLnVoh0bcITbefCP0Rsqo.1&omn=83467907716',
              status: 'approved'
            };
          }
          return session;
        })
        .sort((a, b) => {
          // Sort by date and time, upcoming first
          const dateA = new Date(`${a.date} ${a.time}`);
          const dateB = new Date(`${b.date} ${b.time}`);
          return dateA - dateB;
        });
      setApprovedSessions(approved);
    } catch (error) {
      showToast('Failed to load approved sessions', 'error');
    } finally {
      setLoading(false);
    }
  }, [user.id, showToast]);

  useEffect(() => {
    loadApprovedSessions();
  }, [loadApprovedSessions]);

  const handleJoinZoom = (session) => {
    if (session.zoomLink) {
      window.open(session.zoomLink, '_blank', 'noopener,noreferrer');
      showToast('Opening Zoom meeting...', 'info');
    } else {
      showToast('Zoom link not available for this session', 'warning');
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const isUpcoming = (session) => {
    const sessionDateTime = new Date(`${session.date} ${session.time}`);
    return sessionDateTime >= new Date();
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

  const upcomingSessions = approvedSessions.filter(isUpcoming);
  const pastSessions = approvedSessions.filter(s => !isUpcoming(s));

  return (
    <>
      <Navbar />
      <div className="dashboard-layout">
        <Sidebar />
        <main className="dashboard-main">
          <div className="page-container">
            <h1 className="page-title">Approved Sessions</h1>
            <p className="page-subtitle">View your approved therapy sessions and join Zoom meetings</p>

            {upcomingSessions.length > 0 && (
              <div className="sessions-section">
                <h2 className="section-title">Upcoming Sessions</h2>
                <div className="sessions-grid">
                  {upcomingSessions.map(session => (
                    <div key={session.id} className="session-card upcoming">
                      <div className="session-header">
                        <div className="session-therapist">
                          <span className="therapist-icon">👨‍⚕️</span>
                          <div>
                            <h3 className="therapist-name">{session.therapistName}</h3>
                            <span className="session-duration">{session.duration} minutes</span>
                          </div>
                        </div>
                        <span className="status-badge status-approved">Approved</span>
                      </div>
                      
                      <div className="session-details">
                        <div className="detail-item">
                          <span className="detail-icon">📅</span>
                          <span className="detail-text">{formatDate(session.date)}</span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-icon">🕐</span>
                          <span className="detail-text">{session.time}</span>
                        </div>
                        {session.notes && (
                          <div className="detail-item">
                            <span className="detail-icon">📝</span>
                            <span className="detail-text">{session.notes}</span>
                          </div>
                        )}
                      </div>

                      {session.zoomLink && session.zoomLink.trim() ? (
                        <button
                          className="btn btn-primary"
                          onClick={() => handleJoinZoom(session)}
                          style={{ width: '100%', marginTop: '16px' }}
                        >
                          🎥 Click Here to Join Meeting
                        </button>
                      ) : (
                        <div className="no-zoom-link">
                          <p>Zoom link will be provided soon</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {pastSessions.length > 0 && (
              <div className="sessions-section">
                <h2 className="section-title">Past Sessions</h2>
                <div className="sessions-grid">
                  {pastSessions.map(session => (
                    <div key={session.id} className="session-card past">
                      <div className="session-header">
                        <div className="session-therapist">
                          <span className="therapist-icon">👨‍⚕️</span>
                          <div>
                            <h3 className="therapist-name">{session.therapistName}</h3>
                            <span className="session-duration">{session.duration} minutes</span>
                          </div>
                        </div>
                        <span className="status-badge status-approved">Completed</span>
                      </div>
                      
                      <div className="session-details">
                        <div className="detail-item">
                          <span className="detail-icon">📅</span>
                          <span className="detail-text">{formatDate(session.date)}</span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-icon">🕐</span>
                          <span className="detail-text">{session.time}</span>
                        </div>
                        {session.notes && (
                          <div className="detail-item">
                            <span className="detail-icon">📝</span>
                            <span className="detail-text">{session.notes}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {approvedSessions.length === 0 && (
              <div className="empty-state">
                <div className="empty-state-icon">📅</div>
                <p className="empty-state-text">No approved sessions yet.</p>
                <p className="empty-state-subtext">Book a session and wait for admin approval.</p>
                <a href="/student/book-session" className="btn btn-primary" style={{ marginTop: '20px', display: 'inline-block' }}>
                  Book a Session
                </a>
              </div>
            )}
          </div>
        </main>
      </div>
    </>
  );
};

export default ApprovedSessionsPage;

