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

  const [streak, setStreak] = useState(() => {
    const savedStreak = localStorage.getItem('streak');
    return savedStreak ? JSON.parse(savedStreak) : {
      count: 0,
      lastCompletedDate: null
    };
  });

  useEffect(() => {
    localStorage.setItem('goals', JSON.stringify(goals));
    localStorage.setItem('points', points.toString());
    localStorage.setItem('completedGoals', JSON.stringify(completedGoals));
    localStorage.setItem('streak', JSON.stringify(streak));
  }, [goals, points, completedGoals, streak]);

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
      
      const now = new Date();
      const completedGoal = {
        ...goalToComplete,
        completed: true,
        completedAt: now.toISOString(),
        pointsEarned: earnedPoints
      };

      // Update streak
      const today = now.toDateString();
      setStreak(prev => {
        const lastDate = prev.lastCompletedDate ? new Date(prev.lastCompletedDate).toDateString() : null;
        
        if (!lastDate) {
          // First completion
          return { count: 1, lastCompletedDate: now.toISOString() };
        } else if (lastDate === today) {
          // Already completed a goal today, maintain streak and date
          return prev;
        } else {
          const lastCompletedDate = new Date(prev.lastCompletedDate);
          const dayDifference = Math.floor((now - lastCompletedDate) / (1000 * 60 * 60 * 24));
          
          if (dayDifference === 1) {
            // Consecutive day, increase streak
            return { count: prev.count + 1, lastCompletedDate: now.toISOString() };
          } else {
            // Streak broken
            return { count: 1, lastCompletedDate: now.toISOString() };
          }
        }
      });
      
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
      streak,
      addGoal,
      completeGoal,
      deleteGoal
    }}>
      {children}
    </GoalsContext.Provider>
  );
}