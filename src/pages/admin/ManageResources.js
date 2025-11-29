import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import Modal from '../../components/Modal';
import { resourcesApi } from '../../api/mockApi';
import { useToast } from '../../context/ToastContext';
import './ManageResources.css';

const ManageResources = () => {
  const { showToast } = useToast();
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingResource, setEditingResource] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'article',
    category: '',
    content: '',
    author: ''
  });

  useEffect(() => {
    loadResources();
  }, []);

  const loadResources = async () => {
    try {
      const response = await resourcesApi.getAll();
      setResources(response.data);
    } catch (error) {
      showToast('Failed to load resources', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (resource = null) => {
    if (resource) {
      setEditingResource(resource);
      setFormData({
        title: resource.title,
        description: resource.description,
        type: resource.type,
        category: resource.category,
        content: resource.content,
        author: resource.author
      });
    } else {
      setEditingResource(null);
      setFormData({
        title: '',
        description: '',
        type: 'article',
        category: '',
        content: '',
        author: ''
      });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingResource(null);
    setFormData({
      title: '',
      description: '',
      type: 'article',
      category: '',
      content: '',
      author: ''
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingResource) {
        const result = await resourcesApi.update(editingResource.id, formData);
        if (result.success) {
          showToast('Resource updated successfully', 'success');
          loadResources();
          handleCloseModal();
        }
      } else {
        const result = await resourcesApi.create(formData);
        if (result.success) {
          showToast('Resource created successfully', 'success');
          loadResources();
          handleCloseModal();
        }
      }
    } catch (error) {
      showToast('Failed to save resource', 'error');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this resource?')) {
      try {
        const result = await resourcesApi.delete(id);
        if (result.success) {
          showToast('Resource deleted successfully', 'success');
          loadResources();
        }
      } catch (error) {
        showToast('Failed to delete resource', 'error');
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
                <h1 className="page-title">Manage Resources</h1>
                <p className="page-subtitle">Add, edit, or delete mental health resources</p>
              </div>
              <button className="btn btn-primary" onClick={() => handleOpenModal()}>
                + Add Resource
              </button>
            </div>

            {resources.length > 0 ? (
              <div className="resources-table">
                <table>
                  <thead>
                    <tr>
                      <th>Title</th>
                      <th>Type</th>
                      <th>Category</th>
                      <th>Author</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {resources.map(resource => (
                      <tr key={resource.id}>
                        <td>{resource.title}</td>
                        <td>
                          <span className="resource-type-badge">{resource.type}</span>
                        </td>
                        <td>{resource.category}</td>
                        <td>{resource.author}</td>
                        <td>
                          <div className="action-buttons">
                            <button
                              className="btn btn-outline"
                              onClick={() => handleOpenModal(resource)}
                              style={{ padding: '6px 12px', fontSize: '14px', marginRight: '8px' }}
                            >
                              Edit
                            </button>
                            <button
                              className="btn btn-danger"
                              onClick={() => handleDelete(resource.id)}
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
                <div className="empty-state-icon">📚</div>
                <p className="empty-state-text">No resources found. Create one to get started.</p>
              </div>
            )}
          </div>
        </main>
      </div>

      <Modal
        isOpen={showModal}
        onClose={handleCloseModal}
        title={editingResource ? 'Edit Resource' : 'Add New Resource'}
        size="large"
      >
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
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
              <label className="form-label">Type</label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="form-select"
                required
              >
                <option value="article">Article</option>
                <option value="video">Video</option>
                <option value="tool">Tool</option>
              </select>
            </div>

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
          </div>

          <div className="form-group">
            <label className="form-label">Content/URL</label>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleChange}
              className="form-textarea"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Author</label>
            <input
              type="text"
              name="author"
              value={formData.author}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>

          <div className="modal-actions">
            <button type="button" className="btn btn-outline" onClick={handleCloseModal}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              {editingResource ? 'Update' : 'Create'} Resource
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default ManageResources;

