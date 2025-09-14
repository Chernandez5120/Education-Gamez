import React, { useState, useCallback } from 'react';
import { useGoals } from '../context/GoalsContext';
import Confetti from 'react-confetti';
import '../styles/Goals.css';

export default function Goals() {
  const { goals, points, completedGoals, addGoal, completeGoal, deleteGoal } = useGoals();
  const [showForm, setShowForm] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [newGoal, setNewGoal] = useState({
    title: '',
    duration: '',
    description: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    addGoal({
      ...newGoal,
      duration: parseInt(newGoal.duration)
    });
    setNewGoal({ title: '', duration: '', description: '' });
    setShowForm(false);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="goals-page">
      {showConfetti && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          recycle={false}
          numberOfPieces={200}
          gravity={0.3}
        />
      )}
      <div className="goals-header">
        <h1>Training Goals</h1>
        <div className="points-display">
          <span className="points-icon">🏆</span>
          <span className="points-value">{points}</span>
          <span className="points-label">POINTS</span>
        </div>
      </div>

      <div className="goals-content">
        <div className="goals-section">
          <div className="section-header">
            <h2>Active Goals</h2>
            <button 
              className="add-goal-btn"
              onClick={() => setShowForm(true)}
            >
              + New Goal
            </button>
          </div>

          {showForm && (
            <div className="modal-overlay">
              <div className="modal-content">
                <form onSubmit={handleSubmit} className="goal-form">
                  <h3>Create New Goal</h3>
                  <div className="form-group">
                    <input
                      type="text"
                      placeholder="Goal Title"
                      value={newGoal.title}
                      onChange={(e) => setNewGoal({...newGoal, title: e.target.value})}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="number"
                      placeholder="Duration (minutes)"
                      value={newGoal.duration}
                      onChange={(e) => setNewGoal({...newGoal, duration: e.target.value})}
                      required
                      min="1"
                    />
                  </div>
                  <div className="form-group">
                    <textarea
                      placeholder="Description (optional)"
                      value={newGoal.description}
                      onChange={(e) => setNewGoal({...newGoal, description: e.target.value})}
                    />
                  </div>
                  <div className="form-actions">
                    <button type="submit" className="submit-btn">Create Goal</button>
                    <button 
                      type="button" 
                      className="cancel-btn"
                      onClick={() => setShowForm(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          <div className="goals-grid">
            {goals.map(goal => (
              <div key={goal.id} className="goal-card">
                <div className="goal-card-header">
                  <h3>{goal.title}</h3>
                  <span className="duration">{goal.duration} mins</span>
                </div>
                {goal.description && (
                  <p className="goal-description">{goal.description}</p>
                )}
                <div className="goal-card-actions">
                  <button 
                    className="complete-btn"
                    onClick={() => {
                      completeGoal(goal.id);
                      setShowConfetti(true);
                      setTimeout(() => setShowConfetti(false), 5000);
                    }}
                  >
                    Complete
                  </button>
                  <button 
                    className="delete-btn"
                    onClick={() => deleteGoal(goal.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="completed-section">
          <h2>Completed Goals</h2>
          <div className="completed-list">
            {completedGoals.map(goal => (
              <div key={goal.id} className="completed-goal-card">
                <div className="completed-goal-header">
                  <h3>{goal.title}</h3>
                  <span className="points-earned">+{goal.pointsEarned} pts</span>
                </div>
                <div className="completed-goal-details">
                  <span className="duration">{goal.duration} mins</span>
                  <span className="completion-date">
                    Completed on {formatDate(goal.completedAt)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}