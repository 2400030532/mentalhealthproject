import React, { useState, useEffect, useCallback } from 'react';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import Modal from '../../components/Modal';
import { sessionsApi } from '../../api/mockApi';
import { useToast } from '../../context/ToastContext';
import './ManageSessions.css';

const ManageSessions = () => {
  const { showToast } = useToast();
  const [sessions, setSessions] = useState([]);
  const [filteredSessions, setFilteredSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [selectedSession, setSelectedSession] = useState(null);
  const [formData, setFormData] = useState({
    status: '',
    notes: '',
    zoomLink: ''
  });

  const loadSessions = useCallback(async () => {
    try {
      const response = await sessionsApi.getAll();
      setSessions(response.data);
      setFilteredSessions(response.data);
    } catch (error) {
      showToast('Failed to load sessions', 'error');
    } finally {
      setLoading(false);
    }
  }, [showToast]);

  useEffect(() => {
    loadSessions();
  }, [loadSessions]);

  useEffect(() => {
    if (statusFilter === 'all') {
      setFilteredSessions(sessions);
    } else {
      setFilteredSessions(sessions.filter(s => s.status === statusFilter));
    }
  }, [statusFilter, sessions]);

  

  const handleOpenModal = (session) => {
    setSelectedSession(session);
    setFormData({
      status: session.status,
      notes: session.notes || '',
      zoomLink: session.zoomLink || ''
    });
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedSession(null);
    setFormData({ status: '', notes: '', zoomLink: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await sessionsApi.update(selectedSession.id, formData);
      if (result.success) {
        showToast('Session updated successfully', 'success');
        loadSessions();
        handleCloseModal();
      }
    } catch (error) {
      showToast('Failed to update session', 'error');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this session?')) {
      try {
        const result = await sessionsApi.delete(id);
        if (result.success) {
          showToast('Session deleted successfully', 'success');
          loadSessions();
        }
      } catch (error) {
        showToast('Failed to delete session', 'error');
      }
    }
  };

  const handleQuickApprove = async (id) => {
    const zoomLink = window.prompt('Enter Zoom meeting link (optional):');
    const updateData = { status: 'approved' };
    if (zoomLink && zoomLink.trim()) {
      updateData.zoomLink = zoomLink.trim();
    }
    
    try {
      const result = await sessionsApi.update(id, updateData);
      if (result.success) {
        showToast('Session approved successfully', 'success');
        loadSessions();
      }
    } catch (error) {
      showToast('Failed to approve session', 'error');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
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
            <div className="page-header">
              <div>
                <h1 className="page-title">Manage Sessions</h1>
                <p className="page-subtitle">View and manage all therapy sessions</p>
              </div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="form-select"
                style={{ maxWidth: '200px' }}
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>

            {filteredSessions.length > 0 ? (
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
                    {filteredSessions.map(session => (
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
                          <div className="action-buttons">
                            {session.status === 'pending' && (
                              <button
                                className="btn btn-primary"
                                onClick={() => handleQuickApprove(session.id)}
                                style={{ padding: '6px 12px', fontSize: '14px', marginRight: '8px' }}
                              >
                                Approve
                              </button>
                            )}
                            <button
                              className="btn btn-outline"
                              onClick={() => handleOpenModal(session)}
                              style={{ padding: '6px 12px', fontSize: '14px', marginRight: '8px' }}
                            >
                              Edit
                            </button>
                            <button
                              className="btn btn-danger"
                              onClick={() => handleDelete(session.id)}
                              style={{ padding: '6px 12px', fontSize: '14px' }}
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="empty-state">
                <div className="empty-state-icon">📅</div>
                <p className="empty-state-text">No sessions found</p>
              </div>
            )}
          </div>
        </main>
      </div>

      <Modal
        isOpen={showModal}
        onClose={handleCloseModal}
        title="Edit Session"
        size="medium"
      >
        {selectedSession && (
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Student</label>
              <input
                type="text"
                value={selectedSession.studentName}
                className="form-input"
                disabled
              />
            </div>

            <div className="form-group">
              <label className="form-label">Therapist</label>
              <input
                type="text"
                value={selectedSession.therapistName}
                className="form-input"
                disabled
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Date</label>
                <input
                  type="text"
                  value={new Date(selectedSession.date).toLocaleDateString()}
                  className="form-input"
                  disabled
                />
              </div>

              <div className="form-group">
                <label className="form-label">Time</label>
                <input
                  type="text"
                  value={selectedSession.time}
                  className="form-input"
                  disabled
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="form-select"
                required
              >
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Zoom Meeting Link</label>
              <input
                type="url"
                name="zoomLink"
                value={formData.zoomLink}
                onChange={handleChange}
                className="form-input"
                placeholder="https://zoom.us/j/..."
              />
              <small className="form-help-text">Enter the Zoom meeting link for this session</small>
            </div>

            <div className="form-group">
              <label className="form-label">Notes</label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                className="form-textarea"
                rows="4"
              />
            </div>

            <div className="modal-actions">
              <button type="button" className="btn btn-outline" onClick={handleCloseModal}>
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                Update Session
              </button>
            </div>
          </form>
        )}
      </Modal>
    </>
  );
};

export default ManageSessions;

