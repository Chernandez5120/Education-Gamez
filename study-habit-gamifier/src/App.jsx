import { useState } from 'react'
import brainLogo from './assets/images/brain.png'
import './App.css'

function App() {
  return (
    <div className="app-container">
      <header className="navbar">
        <div className="nav-logo">
          <img src={brainLogo} alt="Brain with boxing gloves" className="nav-logo-image" />
          <span className="nav-title">Knowledge Knockout</span>
        </div>
        <nav className="nav-links">
          <button className="nav-button">Home</button>
          <button className="nav-button">Set Goal</button>
          <button className="nav-button">Check Goals</button>
          <button className="nav-button">Leaderboard</button>
        </nav>
      </header>

      <main className="main-content">
        <div className="hero-section">
          <img src={brainLogo} alt="Brain with boxing gloves" className="hero-logo" />
          <h1>Knowledge Knockout</h1>
          <p className="hero-subtitle">Train Your Brain, Fight for Knowledge!</p>
        </div>
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
  )
}

export default App