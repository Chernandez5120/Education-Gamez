import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import brainLogo from './assets/images/brain.png'
import Goals from './components/Goals'
import Leaderboard from './components/Leaderboard'
import Shop from './components/Shop'
import CortexColosseum from './components/CortexColosseum'
import { GoalsProvider } from './context/GoalsContext'
import './App.css'

console.log('App is rendering');

function App() {
  return (
    <Router>
      <GoalsProvider>
        <div className="app-container">
      <header className="navbar">
        <div className="nav-logo">
          <img src={brainLogo} alt="Brain with boxing gloves" className="nav-logo-image" />
          <span className="nav-title">Knowledge Knockout</span>
        </div>
        <nav className="nav-links">
          <Link to="/" className="nav-button">Home</Link>
          <Link to="/arena" className="nav-button">Battle Arena</Link>
          <Link to="/goals" className="nav-button">Goals</Link>
          <Link to="/leaderboard" className="nav-button">Leaderboard</Link>
          <Link to="/shop" className="nav-button">Shop</Link>
        </nav>
      </header>

      <main className="main-content">
        <Routes>
          <Route path="/arena" element={<CortexColosseum />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/" element={
            <>
              <div className="hero-section">
                <img src={brainLogo} alt="Brain with boxing gloves" className="hero-logo" />
                <h1>Knowledge Knockout</h1>
                <p className="hero-subtitle">Train Your Brain, Fight for Knowledge!</p>
              </div>

              <div className="features-section">
                <h2>Why Choose Knowledge Knockout?</h2>
                <div className="features-grid">
                  <div className="feature-card">
                    <div className="feature-icon">🎯</div>
                    <h3>Set Clear Goals</h3>
                    <p>Define your learning objectives and create actionable study plans.</p>
                  </div>
                  <div className="feature-card">
                    <div className="feature-icon">📈</div>
                    <h3>Track Progress</h3>
                    <p>Monitor your study hours and celebrate your achievements.</p>
                  </div>
                  <div className="feature-card">
                    <div className="feature-icon">🏆</div>
                    <h3>Stay Motivated</h3>
                    <p>Compete with others and maintain your study streaks.</p>
                  </div>
                  <div className="feature-card">
                    <div className="feature-icon">💎</div>
                    <h3>Join Community</h3>
                    <p>Connect with fellow learners and share your success stories.</p>
                  </div>
                </div>
              </div>
            </>
          } />
          <Route path="/goals" element={<Goals />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
        </Routes>
      </main>

      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Quick Links</h3>
            <ul>
              <li><a href="#">About Us</a></li>
              <li><a href="#">Help Center</a></li>
              <li><a href="#">Terms of Use</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h3>Contact</h3>
            <ul>
              <li>Email: support@knowledgeknockout.com</li>
              <li>Follow us on social media</li>
            </ul>
          </div>
          <div className="footer-section">
            <h3>Get Started</h3>
            <button className="footer-cta">Create Account</button>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2025 Knowledge Knockout. All rights reserved.</p>
        </div>
      </footer>
        </div>
      </GoalsProvider>
    </Router>
  )
}

export default App