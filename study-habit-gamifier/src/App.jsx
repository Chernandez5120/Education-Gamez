import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  return (
    <div className="app-container">
      <div className="logo-container">
        <img src="/src/assets/brain-boxing.svg" alt="Brain with boxing gloves" className="app-logo" />
        <h1>Knowledge Lockout</h1>
      </div>
      <div className="button-container">
        <button className="main-button" onClick={() => console.log('Set Goal clicked')}>
          Set Goal
        </button>
        <button className="main-button" onClick={() => console.log('Check Goals clicked')}>
          Check Goals
        </button>
        <button className="main-button" onClick={() => console.log('Leaderboard clicked')}>
          Leaderboard
        </button>
      </div>
    </div>
  )
}

export default App
