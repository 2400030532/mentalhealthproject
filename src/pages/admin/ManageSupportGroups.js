import React, { useState, useEffect, useCallback } from 'react';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import Modal from '../../components/Modal';
import { supportGroupsApi } from '../../api/mockApi';
import { useToast } from '../../context/ToastContext';
import './ManageSupportGroups.css';

const ManageSupportGroups = () => {
  const { showToast } = useToast();
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingGroup, setEditingGroup] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    facilitator: '',
    meetingTime: '',
    status: 'active'
  });

  const loadGroups = useCallback(async () => {
    try {
      const response = await supportGroupsApi.getAll();
      setGroups(response.data);
    } catch (error) {
      showToast('Failed to load support groups', 'error');
    } finally {
      setLoading(false);
    }
  }, [showToast]);

  useEffect(() => {
    loadGroups();
  }, [loadGroups]);

  const handleOpenModal = (group = null) => {
    if (group) {
      setEditingGroup(group);
      setFormData({
        name: group.name,
        description: group.description,
        category: group.category,
        facilitator: group.facilitator,
        meetingTime: group.meetingTime,
        status: group.status
      });
    } else {
      setEditingGroup(null);
      setFormData({
        name: '',
        description: '',
        category: '',
        facilitator: '',
        meetingTime: '',
        status: 'active'
      });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingGroup(null);
    setFormData({
      name: '',
      description: '',
      category: '',
      facilitator: '',
      meetingTime: '',
      status: 'active'
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingGroup) {
        const result = await supportGroupsApi.update(editingGroup.id, formData);
        if (result.success) {
          showToast('Support group updated successfully', 'success');
          loadGroups();
          handleCloseModal();
        }
      } else {
        const result = await supportGroupsApi.create(formData);
        if (result.success) {
          showToast('Support group created successfully', 'success');
          loadGroups();
          handleCloseModal();
        }
      }
    } catch (error) {
      showToast('Failed to save support group', 'error');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this support group?')) {
      try {
        const result = await supportGroupsApi.delete(id);
        if (result.success) {
          showToast('Support group deleted successfully', 'success');
          loadGroups();
        }
      } catch (error) {
        showToast('Failed to delete support group', 'error');
      }
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
                <h1 className="page-title">Manage Support Groups</h1>
                <p className="page-subtitle">Add, edit, or delete support groups</p>
              </div>
              <button className="btn btn-primary" onClick={() => handleOpenModal()}>
                + Add Support Group
              </button>
            </div>

            {groups.length > 0 ? (
              <div className="groups-grid">
                {groups.map(group => (
                  <div key={group.id} className="group-card">
                    <div className="group-header">
                      <h3 className="group-name">{group.name}</h3>
                      <span className="group-category">{group.category}</span>
                    </div>
                    <p className="group-description">{group.description}</p>
                    <div className="group-details">
                      <div className="group-detail-item">
                        <span className="detail-icon">👥</span>
                        <span>{group.members} members</span>
                      </div>
                      <div className="group-detail-item">
                        <span className="detail-icon">👨‍🏫</span>
                        <span>{group.facilitator}</span>
                      </div>
                      <div className="group-detail-item">
                        <span className="detail-icon">🕐</span>
                        <span>{group.meetingTime}</span>
                      </div>
                    </div>
                    <div className="group-status">
                      <span className={`status-badge status-${group.status}`}>
                        {group.status}
                      </span>
                    </div>
                    <div className="group-actions">
                      <button
                        className="btn btn-outline"
                        onClick={() => handleOpenModal(group)}
                        style={{ flex: 1, marginRight: '8px' }}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={() => handleDelete(group.id)}
                        style={{ flex: 1 }}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <div className="empty-state-icon">👥</div>
                <p className="empty-state-text">No support groups found. Create one to get started.</p>
              </div>
            )}
          </div>
        </main>
      </div>

      <Modal
        isOpen={showModal}
        onClose={handleCloseModal}
        title={editingGroup ? 'Edit Support Group' : 'Add New Support Group'}
        size="large"
      >
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Group Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="form-textarea"
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Category</label>
              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Facilitator</label>
              <input
                type="text"
                name="facilitator"
                value={formData.facilitator}
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Meeting Time</label>
              <input
                type="text"
                name="meetingTime"
                value={formData.meetingTime}
                onChange={handleChange}
                className="form-input"
                placeholder="e.g., Every Monday, 6:00 PM"
                required
              />
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
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>

          <div className="modal-actions">
            <button type="button" className="btn btn-outline" onClick={handleCloseModal}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              {editingGroup ? 'Update' : 'Create'} Group
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default ManageSupportGroups;

