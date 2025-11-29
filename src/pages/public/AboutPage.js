import React from 'react';
import Navbar from '../../components/Navbar';
import './AboutPage.css';

const AboutPage = () => {
  return (
    <>
      <Navbar />
      <div className="about-page">
        <div className="container">
          <div className="about-content">
            <h1 className="page-title">About Us</h1>
            <div className="about-section">
              <h2>Our Mission</h2>
              <p>
                We are dedicated to providing accessible, comprehensive mental health support for students.
                Our platform offers a safe space where students can access resources, connect with professionals,
                and find community support.
              </p>
            </div>
            <div className="about-section">
              <h2>What We Offer</h2>
              <ul>
                <li>Curated mental health resources including articles, videos, and interactive tools</li>
                <li>Virtual therapy sessions with licensed mental health professionals</li>
                <li>Peer support groups moderated by trained facilitators</li>
                <li>Self-help resources for managing stress, anxiety, and other mental health challenges</li>
              </ul>
            </div>
            <div className="about-section">
              <h2>Our Values</h2>
              <div className="values-grid">
                <div className="value-item">
                  <h3>Confidentiality</h3>
                  <p>Your privacy and confidentiality are our top priorities.</p>
                </div>
                <div className="value-item">
                  <h3>Accessibility</h3>
                  <p>We strive to make mental health support accessible to all students.</p>
                </div>
                <div className="value-item">
                  <h3>Compassion</h3>
                  <p>We approach every interaction with empathy and understanding.</p>
                </div>
                <div className="value-item">
                  <h3>Support</h3>
                  <p>We're here to support you on your mental health journey.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutPage;

