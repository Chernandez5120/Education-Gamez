import React, { createContext, useContext, useState, useEffect } from 'react';

const GoalsContext = createContext();

export function useGoals() {
  const context = useContext(GoalsContext);
  if (!context) {
    throw new Error('useGoals must be used within a GoalsProvider');
  }
  return context;
}

export function GoalsProvider({ children }) {
  const [goals, setGoals] = useState(() => {
    const savedGoals = localStorage.getItem('goals');
    return savedGoals ? JSON.parse(savedGoals) : [];
  });

  const [points, setPoints] = useState(() => {
    const savedPoints = localStorage.getItem('points');
    return savedPoints ? parseInt(savedPoints) : 0;
  });

  const [completedGoals, setCompletedGoals] = useState(() => {
    const savedCompleted = localStorage.getItem('completedGoals');
    return savedCompleted ? JSON.parse(savedCompleted) : [];
  });

  useEffect(() => {
    localStorage.setItem('goals', JSON.stringify(goals));
    localStorage.setItem('points', points.toString());
    localStorage.setItem('completedGoals', JSON.stringify(completedGoals));
  }, [goals, points, completedGoals]);

  const addGoal = (goal) => {
    const newGoal = {
      ...goal,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      completed: false
    };
    setGoals(prev => [...prev, newGoal]);
  };

  const completeGoal = (goalId) => {
    const goalToComplete = goals.find(goal => goal.id === goalId);
    if (goalToComplete && !goalToComplete.completed) {
      // Calculate points based on duration
      const earnedPoints = Math.floor(goalToComplete.duration / 5) * 10; // 10 points per 5 minutes
      setPoints(prev => prev + earnedPoints);
      
      const completedGoal = {
        ...goalToComplete,
        completed: true,
        completedAt: new Date().toISOString(),
        pointsEarned: earnedPoints
      };
      
      // Add to completed goals
      setCompletedGoals(prev => [...prev, completedGoal]);
      // Remove from active goals
      setGoals(prev => prev.filter(goal => goal.id !== goalId));
    }
  };

  const deleteGoal = (goalId) => {
    setGoals(prev => prev.filter(goal => goal.id !== goalId));
  };

  return (
    <GoalsContext.Provider value={{
      goals,
      points,
      completedGoals,
      addGoal,
      completeGoal,
      deleteGoal
    }}>
      {children}
    </GoalsContext.Provider>
  );
}