import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import './LandingPage.css';

const LandingPage = () => {
  return (
    <>
      <Navbar />
      <div className="landing-page">
        <section className="hero">
          <div className="container">
            <div className="hero-content">
              <h1 className="hero-title">Your Mental Health Matters</h1>
              <p className="hero-subtitle">
                A safe, supportive platform designed to help students navigate their mental health journey
              </p>
              <div className="hero-buttons">
                <Link to="/signup" className="btn btn-primary">Get Started</Link>
                <Link to="/about" className="btn btn-outline">Learn More</Link>
              </div>
            </div>
          </div>
        </section>

        <section className="features">
          <div className="container">
            <h2 className="section-title">How We Can Help</h2>
            <div className="features-grid">
              <div className="feature-card">
                <div className="feature-icon">📚</div>
                <h3>Mental Health Resources</h3>
                <p>Access articles, videos, and tools to support your mental wellness journey.</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">💬</div>
                <h3>Professional Counseling</h3>
                <p>Schedule virtual therapy sessions with licensed mental health professionals.</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">👥</div>
                <h3>Support Groups</h3>
                <p>Connect with peers in safe, moderated support group environments.</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">🧘</div>
                <h3>Self-Help Tools</h3>
                <p>Explore meditation guides, stress management techniques, and more.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="cta">
          <div className="container">
            <h2>Ready to Start Your Journey?</h2>
            <p>Join our community and take the first step towards better mental health.</p>
            <Link to="/signup" className="btn btn-primary">Sign Up Now</Link>
          </div>
        </section>
      </div>
    </>
  );
};

export default LandingPage;

