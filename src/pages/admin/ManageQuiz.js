import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import Modal from '../../components/Modal';
import { quizApi } from '../../api/mockApi';
import { useToast } from '../../context/ToastContext';
import './ManageQuiz.css';

const ManageQuiz = () => {
  const { showToast } = useToast();
  const [questions, setQuestions] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState(null);
  const [showStats, setShowStats] = useState(false);
  const [formData, setFormData] = useState({
    question: '',
    category: 'stress',
    options: [
      { text: '', value: 1 },
      { text: '', value: 2 },
      { text: '', value: 3 },
      { text: '', value: 4 }
    ]
  });

  useEffect(() => {
    loadQuestions();
    loadStats();
  }, []);

  const loadQuestions = async () => {
    try {
      const response = await quizApi.getQuestions();
      setQuestions(response.data);
    } catch (error) {
      showToast('Failed to load quiz questions', 'error');
    } finally {
      setLoading(false);
    }
  };

  const loadStats = async () => {
    try {
      const response = await quizApi.getStats();
      setStats(response.data);
    } catch (error) {
      // Silent fail for stats
    }
  };

  const handleOpenModal = (question = null) => {
    if (question) {
      setEditingQuestion(question);
      setFormData({
        question: question.question,
        category: question.category,
        options: question.options
      });
    } else {
      setEditingQuestion(null);
      setFormData({
        question: '',
        category: 'stress',
        options: [
          { text: '', value: 1 },
          { text: '', value: 2 },
          { text: '', value: 3 },
          { text: '', value: 4 }
        ]
      });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingQuestion(null);
    setFormData({
      question: '',
      category: 'stress',
      options: [
        { text: '', value: 1 },
        { text: '', value: 2 },
        { text: '', value: 3 },
        { text: '', value: 4 }
      ]
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate
    if (!formData.question.trim()) {
      showToast('Please enter a question', 'error');
      return;
    }
    
    if (formData.options.some(opt => !opt.text.trim())) {
      showToast('Please fill in all option texts', 'error');
      return;
    }

    try {
      if (editingQuestion) {
        const result = await quizApi.updateQuestion(editingQuestion.id, formData);
        if (result.success) {
          showToast('Question updated successfully', 'success');
          loadQuestions();
          handleCloseModal();
        }
      } else {
        const result = await quizApi.createQuestion(formData);
        if (result.success) {
          showToast('Question created successfully', 'success');
          loadQuestions();
          handleCloseModal();
        }
      }
    } catch (error) {
      showToast('Failed to save question', 'error');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this question?')) {
      try {
        const result = await quizApi.deleteQuestion(id);
        if (result.success) {
          showToast('Question deleted successfully', 'success');
          loadQuestions();
        }
      } catch (error) {
        showToast('Failed to delete question', 'error');
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleOptionChange = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      options: prev.options.map((opt, i) => 
        i === index ? { ...opt, [field]: field === 'value' ? parseInt(value) : value } : opt
      )
    }));
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
                <h1 className="page-title">Manage Quiz</h1>
                <p className="page-subtitle">Add, edit, or delete quiz questions</p>
              </div>
              <div className="header-actions">
                <button className="btn btn-secondary" onClick={() => setShowStats(!showStats)}>
                  {showStats ? 'Hide' : 'View'} Statistics
                </button>
                <button className="btn btn-primary" onClick={() => handleOpenModal()}>
                  + Add Question
                </button>
              </div>
            </div>

            {showStats && stats && (
              <div className="stats-section">
                <h2 className="section-title">Quiz Statistics</h2>
                <div className="stats-grid">
                  <div className="stat-card">
                    <div className="stat-value">{stats.totalAttempts}</div>
                    <div className="stat-label">Total Attempts</div>
                  </div>
                  <div className="stat-card">
                    <div className="stat-value">{Math.round(stats.averageScore)}%</div>
                    <div className="stat-label">Average Score</div>
                  </div>
                  <div className="stat-card">
                    <div className="stat-value">{stats.lowStressCount}</div>
                    <div className="stat-label">Low Stress</div>
                  </div>
                  <div className="stat-card">
                    <div className="stat-value">{stats.moderateStressCount}</div>
                    <div className="stat-label">Moderate Stress</div>
                  </div>
                  <div className="stat-card">
                    <div className="stat-value">{stats.highStressCount}</div>
                    <div className="stat-label">High Stress</div>
                  </div>
                </div>
              </div>
            )}

            {questions.length > 0 ? (
              <div className="questions-list">
                {questions.map((question, index) => (
                  <div key={question.id} className="question-card">
                    <div className="question-header">
                      <span className="question-number">Q{index + 1}</span>
                      <span className="question-category">{question.category}</span>
                    </div>
                    <h3 className="question-text">{question.question}</h3>
                    <div className="question-options">
                      {question.options.map((option, optIndex) => (
                        <div key={optIndex} className="option-item">
                          <span className="option-value">{option.value}</span>
                          <span className="option-text">{option.text}</span>
                        </div>
                      ))}
                    </div>
                    <div className="question-actions">
                      <button
                        className="btn btn-outline"
                        onClick={() => handleOpenModal(question)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={() => handleDelete(question.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <div className="empty-state-icon">📝</div>
                <p className="empty-state-text">No quiz questions found. Create one to get started.</p>
              </div>
            )}
          </div>
        </main>
      </div>

      <Modal
        isOpen={showModal}
        onClose={handleCloseModal}
        title={editingQuestion ? 'Edit Question' : 'Add New Question'}
        size="large"
      >
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Question Text</label>
            <textarea
              name="question"
              value={formData.question}
              onChange={handleChange}
              className="form-textarea"
              rows="3"
              required
              placeholder="Enter the question..."
            />
          </div>

          <div className="form-group">
            <label className="form-label">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="form-select"
              required
            >
              <option value="stress">Stress</option>
              <option value="anxiety">Anxiety</option>
              <option value="mood">Mood</option>
              <option value="sleep">Sleep</option>
              <option value="concentration">Concentration</option>
              <option value="energy">Energy</option>
              <option value="coping">Coping</option>
              <option value="enjoyment">Enjoyment</option>
              <option value="social">Social</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Answer Options</label>
            {formData.options.map((option, index) => (
              <div key={index} className="option-input-group">
                <input
                  type="number"
                  value={option.value}
                  onChange={(e) => handleOptionChange(index, 'value', e.target.value)}
                  className="form-input option-value-input"
                  min="1"
                  max="4"
                  required
                />
                <input
                  type="text"
                  value={option.text}
                  onChange={(e) => handleOptionChange(index, 'text', e.target.value)}
                  className="form-input"
                  placeholder={`Option ${index + 1} text`}
                  required
                />
              </div>
            ))}
          </div>

          <div className="modal-actions">
            <button type="button" className="btn btn-outline" onClick={handleCloseModal}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              {editingQuestion ? 'Update' : 'Create'} Question
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default ManageQuiz;

