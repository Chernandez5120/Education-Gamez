import React, { useMemo } from 'react';
import { useGoals } from '../context/GoalsContext';
import '../styles/Leaderboard.css';

export default function Leaderboard() {
  const { points } = useGoals();
  
  // Generate fake leaderboard data with user's actual points
  const leaderboardData = useMemo(() => {
    const fakeUsers = [
      { name: "Christian", points: Math.floor(Math.random() * 1000) + 500 },
      { name: "Audrey", points: Math.floor(Math.random() * 1000) + 500 },
      { name: "Sarah", points: Math.floor(Math.random() * 1000) + 500 },
      { name: "Jenna", points: Math.floor(Math.random() * 1000) + 500 },
      { name: "You", points: points } // Actual user points
    ];
    
    // Sort by points in descending order
    return fakeUsers.sort((a, b) => b.points - a.points);
  }, [points]);

  return (
    <div className="leaderboard-page">
      <div className="leaderboard-header">
        <h1>Leaderboard</h1>
        <div className="points-display">
          <span className="points-icon">🏆</span>
          <span className="points-value">{points}</span>
          <span className="points-label">YOUR POINTS</span>
        </div>
      </div>

      <div className="leaderboard-content">
        <div className="leaderboard-list">
          {leaderboardData.map((user, index) => (
            <div 
              key={user.name} 
              className={`leaderboard-item ${user.name === 'You' ? 'current-user' : ''}`}
            >
              <div className="rank">#{index + 1}</div>
              <div className="user-info">
                <span className="user-name">{user.name}</span>
                <span className="user-points">{user.points} pts</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}