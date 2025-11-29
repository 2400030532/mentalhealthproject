import React from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import { resourcesApi } from '../../api/mockApi';
import { useToast } from '../../context/ToastContext';
import './QuizResultsPage.css';

const QuizResultsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const result = location.state?.result;

  React.useEffect(() => {
    if (!result) {
      navigate('/student/quiz');
    }
  }, [result, navigate]);

  if (!result) {
    return null;
  }

  const getCategoryColor = (category) => {
    switch (category) {
      case 'low':
        return 'var(--success)';
      case 'moderate':
        return 'var(--warning)';
      case 'high':
        return 'var(--error)';
      default:
        return 'var(--text-secondary)';
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'low':
        return '✅';
      case 'moderate':
        return '⚠️';
      case 'high':
        return '🔴';
      default:
        return '📊';
    }
  };

  const getRecommendations = (category) => {
    const recommendations = {
      low: {
        title: 'Keep Up the Great Work!',
        resources: [
          { type: 'article', title: 'Building Resilience', link: '/student/resources' },
          { type: 'video', title: 'Mindfulness Meditation Techniques', link: '/student/resources' }
        ],
        tips: [
          'Continue practicing self-care routines',
          'Maintain healthy sleep patterns',
          'Stay connected with your support network',
          'Engage in regular physical activity',
          'Practice stress management techniques regularly'
        ]
      },
      moderate: {
        title: 'Time to Focus on Self-Care',
        resources: [
          { type: 'article', title: 'Stress Management Workbook', link: '/student/resources' },
          { type: 'article', title: 'Understanding Anxiety', link: '/student/resources' },
          { type: 'video', title: 'Breathing Exercises for Calm', link: '/student/resources' }
        ],
        tips: [
          'Practice daily relaxation techniques',
          'Review your sleep hygiene habits',
          'Consider joining a support group',
          'Take regular breaks from stressful activities',
          'Consider booking a counseling session for additional support'
        ]
      },
      high: {
        title: 'Prioritize Your Mental Health',
        resources: [
          { type: 'article', title: 'Understanding Anxiety', link: '/student/resources' },
          { type: 'article', title: 'Stress Management Workbook', link: '/student/resources' },
          { type: 'article', title: 'Sleep Hygiene Guide', link: '/student/resources' }
        ],
        tips: [
          'Book a counseling session as soon as possible',
          'Practice breathing exercises daily',
          'Reach out to your support network',
          'Consider joining a support group',
          'Prioritize self-care activities',
          'If you\'re in crisis, contact emergency services or a crisis hotline'
        ]
      }
    };
    return recommendations[category] || recommendations.moderate;
  };

  const recommendations = getRecommendations(result.category);

  return (
    <>
      <Navbar />
      <div className="dashboard-layout">
        <Sidebar />
        <main className="dashboard-main">
          <div className="page-container">
            <h1 className="page-title">Your Assessment Results</h1>

            <div className="results-summary">
              <div className="score-card" style={{ borderColor: getCategoryColor(result.category) }}>
                <div className="score-icon">{getCategoryIcon(result.category)}</div>
                <div className="score-value">{result.percentage}%</div>
                <div className="score-label">Stress Level</div>
                <div className="category-badge" style={{ backgroundColor: getCategoryColor(result.category) }}>
                  {result.categoryText}
                </div>
              </div>

              <div className="results-details">
                <h2>Assessment Summary</h2>
                <p>
                  Based on your responses, your stress level is categorized as <strong>{result.categoryText}</strong>.
                  {result.category === 'high' && ' We strongly recommend seeking professional support.'}
                  {result.category === 'moderate' && ' Consider implementing some self-care strategies.'}
                  {result.category === 'low' && ' You\'re managing well! Keep up the good work.'}
                </p>
              </div>
            </div>

            <div className="recommendations-section">
              <h2 className="section-title">{recommendations.title}</h2>

              <div className="recommendations-grid">
                <div className="recommendation-card">
                  <h3>📚 Recommended Resources</h3>
                  <ul>
                    {recommendations.resources.map((resource, index) => (
                      <li key={index}>
                        <Link to={resource.link}>{resource.title}</Link>
                      </li>
                    ))}
                  </ul>
                  <Link to="/student/resources" className="btn btn-primary" style={{ marginTop: '16px', display: 'inline-block' }}>
                    Browse All Resources
                  </Link>
                </div>

                <div className="recommendation-card">
                  <h3>💡 Self-Care Tips</h3>
                  <ul>
                    {recommendations.tips.map((tip, index) => (
                      <li key={index}>{tip}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="action-buttons">
              <Link to="/student/book-session" className="btn btn-primary">
                Book a Counseling Session
              </Link>
              <Link to="/student/support-groups" className="btn btn-secondary">
                Join a Support Group
              </Link>
              <button onClick={() => navigate('/student/quiz')} className="btn btn-outline">
                Retake Quiz
              </button>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default QuizResultsPage;

