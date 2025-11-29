import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import { supportGroupsApi } from '../../api/mockApi';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import './SupportGroupsPage.css';

const SupportGroupsPage = () => {
  const { user } = useAuth();
  const { showToast } = useToast();
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [joining, setJoining] = useState(null);

  useEffect(() => {
    loadGroups();
  }, []);

  const loadGroups = async () => {
    try {
      const response = await supportGroupsApi.getAll();
      // Ensure Stress Management Group (id: '2') always has the Telegram link
      const groupsWithTelegram = response.data.map(group => {
        if (group.id === '2') {
          return {
            ...group,
            telegramLink: 'https://t.me/+86ygI24ZpZ5kNGE9'
          };
        }
        return group;
      });
      setGroups(groupsWithTelegram);
    } catch (error) {
      showToast('Failed to load support groups', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleJoinGroup = async (groupId) => {
    // Check if this is the Stress Management Group (id: '2')
    if (groupId === '2') {
      // Always open Telegram link for Stress Management Group
      const telegramUrl = 'https://t.me/+86ygI24ZpZ5kNGE9';
      // Open Telegram link in a new tab
      window.open(telegramUrl, '_blank', 'noopener,noreferrer');
      showToast('Opening Telegram group in a new tab...', 'info');
      // Also update member count locally
      setGroups(prevGroups => 
        prevGroups.map(g => 
          g.id === groupId ? { ...g, members: g.members + 1 } : g
        )
      );
      return;
    }
    
    // Check if group has a Telegram link
    const group = groups.find(g => g.id === groupId);
    if (group?.telegramLink) {
      window.open(group.telegramLink, '_blank', 'noopener,noreferrer');
      showToast('Opening Telegram group in a new tab...', 'info');
      // Also update member count locally
      setGroups(prevGroups => 
        prevGroups.map(g => 
          g.id === groupId ? { ...g, members: g.members + 1 } : g
        )
      );
      return;
    }
    
    // Otherwise, use the standard join process
    setJoining(groupId);
    try {
      const result = await supportGroupsApi.join(groupId, user.id);
      if (result.success) {
        showToast('Successfully joined the support group!', 'success');
        loadGroups();
      }
    } catch (error) {
      showToast('Failed to join group', 'error');
    } finally {
      setJoining(null);
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
            <h1 className="page-title">Support Groups</h1>
            <p className="page-subtitle">Connect with peers in a safe, supportive environment</p>

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
                    <button
                      className="btn btn-primary"
                      onClick={() => handleJoinGroup(group.id)}
                      disabled={joining === group.id}
                      style={{ width: '100%', marginTop: '16px' }}
                    >
                      {group.telegramLink ? 'Join Telegram Group' : (joining === group.id ? 'Joining...' : 'Join Group')}
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <div className="empty-state-icon">👥</div>
                <p className="empty-state-text">No support groups available at the moment</p>
              </div>
            )}
          </div>
        </main>
      </div>
    </>
  );
};

export default SupportGroupsPage;

