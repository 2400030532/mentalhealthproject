import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import { quizApi } from '../../api/mockApi';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import './QuizPage.css';

const QuizPage = () => {
  const { user } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const loadQuestions = useCallback(async () => {
    try {
      const response = await quizApi.getQuestions();
      setQuestions(response.data);
    } catch (error) {
      showToast('Failed to load quiz questions', 'error');
    } finally {
      setLoading(false);
    }
  }, [showToast]);

  useEffect(() => {
    loadQuestions();
  }, [loadQuestions]);

  const handleAnswerChange = (questionId, value) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: parseInt(value)
    }));
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = async () => {
    // Check if all questions are answered
    const unanswered = questions.filter(q => !answers[q.id]);
    if (unanswered.length > 0) {
      showToast(`Please answer all questions. ${unanswered.length} question(s) remaining.`, 'warning');
      return;
    }

    setSubmitting(true);
    try {
      const result = await quizApi.submitQuiz(answers, user.id);
      if (result.success) {
        navigate('/student/quiz-results', { state: { result: result.data } });
      }
    } catch (error) {
      showToast('Failed to submit quiz', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const progress = questions.length > 0 ? ((currentQuestion + 1) / questions.length) * 100 : 0;
  const answeredCount = Object.keys(answers).length;

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

  if (questions.length === 0) {
    return (
      <>
        <Navbar />
        <div className="dashboard-layout">
          <Sidebar />
          <main className="dashboard-main">
            <div className="page-container">
              <div className="empty-state">
                <div className="empty-state-icon">📝</div>
                <p className="empty-state-text">No quiz questions available at the moment.</p>
              </div>
            </div>
          </main>
        </div>
      </>
    );
  }

  const question = questions[currentQuestion];

  return (
    <>
      <Navbar />
      <div className="dashboard-layout">
        <Sidebar />
        <main className="dashboard-main">
          <div className="page-container">
            <h1 className="page-title">Mental Health Assessment Quiz</h1>
            <p className="page-subtitle">Answer honestly to get personalized recommendations</p>

            <div className="quiz-progress-bar">
              <div className="quiz-progress-fill" style={{ width: `${progress}%` }}></div>
            </div>
            <div className="quiz-progress-text">
              Question {currentQuestion + 1} of {questions.length} • {answeredCount} answered
            </div>

            <div className="quiz-container">
              <div className="quiz-question-card">
                <div className="question-number">Question {currentQuestion + 1}</div>
                <h2 className="question-text">{question.question}</h2>
                
                <div className="quiz-options">
                  {question.options.map((option, index) => (
                    <label key={index} className="quiz-option">
                      <input
                        type="radio"
                        name={`question-${question.id}`}
                        value={option.value}
                        checked={answers[question.id] === option.value}
                        onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                      />
                      <span className="option-text">{option.text}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="quiz-navigation">
                <button
                  className="btn btn-outline"
                  onClick={handlePrevious}
                  disabled={currentQuestion === 0}
                >
                  ← Previous
                </button>
                
                {currentQuestion === questions.length - 1 ? (
                  <button
                    className="btn btn-primary"
                    onClick={handleSubmit}
                    disabled={submitting}
                  >
                    {submitting ? 'Submitting...' : 'Submit Quiz'}
                  </button>
                ) : (
                  <button
                    className="btn btn-primary"
                    onClick={handleNext}
                  >
                    Next →
                  </button>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default QuizPage;

