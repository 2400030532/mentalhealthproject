import React, { useState, useEffect, useCallback } from 'react';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import { resourcesApi } from '../../api/mockApi';
import { useToast } from '../../context/ToastContext';
import './ResourcesPage.css';

const ResourcesPage = () => {
  const [resources, setResources] = useState([]);
  const [filteredResources, setFilteredResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const { showToast } = useToast();

  const loadResources = useCallback(async () => {
    if (selectedCategory === 'all') {
      setFilteredResources(resources);
    } else {
      setFilteredResources(resources.filter(r => r.category === selectedCategory));
    }
  }, [selectedCategory, resources]);
  
  const loadResourcesFetch = useCallback(async () => {
    try {
      const response = await resourcesApi.getAll();
      setResources(response.data);
      setFilteredResources(response.data);
    } catch (error) {
      showToast('Failed to load resources', 'error');
    } finally {
      setLoading(false);
    }
  }, [showToast]);

  useEffect(() => {
    loadResourcesFetch();
  }, [loadResourcesFetch]);

  const categories = ['all', ...new Set(resources.map(r => r.category))];

  const getTypeIcon = (type) => {
    switch (type) {
      case 'article': return '📄';
      case 'video': return '🎥';
      case 'tool': return '🛠️';
      default: return '📚';
    }
  };

  const handleViewResource = (resource) => {
    // If content is a URL (starts with http), open it in a new tab
    if (resource.content && resource.content.startsWith('http')) {
      window.open(resource.content, '_blank', 'noopener,noreferrer');
    } else {
      // Otherwise, show the content in a modal or alert
      showToast('Resource content: ' + resource.content, 'info');
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
            <h1 className="page-title">Mental Health Resources</h1>
            <p className="page-subtitle">Explore articles, videos, and tools to support your mental wellness</p>

            <div className="filter-section">
              <label>Filter by category:</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="form-select"
                style={{ maxWidth: '300px' }}
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>
                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            {filteredResources.length > 0 ? (
              <div className="resources-grid">
                {filteredResources.map(resource => (
                  <div key={resource.id} className="resource-card">
                    <div className="resource-header">
                      <span className="resource-type-icon">{getTypeIcon(resource.type)}</span>
                      <span className="resource-type">{resource.type}</span>
                    </div>
                    <h3 className="resource-title">{resource.title}</h3>
                    <p className="resource-description">{resource.description}</p>
                    <div className="resource-footer">
                      <span className="resource-category">{resource.category}</span>
                      <span className="resource-author">By {resource.author}</span>
                    </div>
                    <button 
                      className="btn btn-primary" 
                      style={{ width: '100%', marginTop: '16px' }}
                      onClick={() => handleViewResource(resource)}
                    >
                      {resource.content && resource.content.startsWith('http') ? 'Open PDF/Resource' : 'View Resource'}
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <div className="empty-state-icon">📚</div>
                <p className="empty-state-text">No resources found in this category</p>
              </div>
            )}
          </div>
        </main>
      </div>
    </>
  );
};

export default ResourcesPage;

