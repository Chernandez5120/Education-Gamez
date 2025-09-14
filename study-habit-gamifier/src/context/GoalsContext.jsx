import React, { createContext, useContext, useState, useEffect } from 'react';
import { CanvasService } from '../services/CanvasService';

const GoalsContext = createContext();
let canvasService;
try {
  canvasService = new CanvasService();
} catch (error) {
  console.log('Canvas service initialization failed. Canvas features will be disabled.');
  canvasService = {
    isConfigured: false,
    fetchTodoItems: async () => [],
    fetchCourses: async () => [],
    markAssignmentAsSubmitted: async () => {}
  };
}

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

  const [isCanvasEnabled, setIsCanvasEnabled] = useState(() => {
    return localStorage.getItem('isCanvasEnabled') === 'true';
  });

  const [canvasError, setCanvasError] = useState(null);

  const [isLoadingCanvas, setIsLoadingCanvas] = useState(false);

  const [completedGoals, setCompletedGoals] = useState(() => {
    const savedCompleted = localStorage.getItem('completedGoals');
    return savedCompleted ? JSON.parse(savedCompleted) : [];
  });

  const [purchasedBrains, setPurchasedBrains] = useState(() => {
    const saved = localStorage.getItem('purchasedBrains');
    return saved ? JSON.parse(saved) : [];
  });

  const hasPurchasedBrain = (brainId) => {
    return purchasedBrains.includes(brainId);
  };

  const addPurchasedBrain = (brainId) => {
    setPurchasedBrains(prev => {
      const newPurchasedBrains = [...prev, brainId];
      localStorage.setItem('purchasedBrains', JSON.stringify(newPurchasedBrains));
      return newPurchasedBrains;
    });
  };

  const spendPoints = (amount, brainId) => {
    if (points >= amount && !hasPurchasedBrain(brainId)) {
      setPoints(prevPoints => {
        const newPoints = prevPoints - amount;
        localStorage.setItem('points', newPoints.toString());
        return newPoints;
      });
      addPurchasedBrain(brainId);
      return true;
    }
    return false;
  };

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
    localStorage.setItem('isCanvasEnabled', isCanvasEnabled.toString());
  }, [goals, points, completedGoals, streak, isCanvasEnabled]);

  // Fetch Canvas todos when enabled
  useEffect(() => {
    if (isCanvasEnabled) {
      fetchCanvasTodos();
    }
  }, [isCanvasEnabled]);

  const fetchCanvasTodos = async () => {
    try {
      setIsLoadingCanvas(true);
      setCanvasError(null);
      const canvasTodos = await canvasService.fetchTodoItems();
      
      // Filter out any Canvas todos that are already in our goals list
      const newTodos = canvasTodos.filter(todo => 
        !goals.some(goal => goal.id === todo.id) &&
        !completedGoals.some(goal => goal.id === todo.id)
      );

      if (newTodos.length > 0) {
        setGoals(prev => [...prev, ...newTodos]);
      }
    } catch (error) {
      setCanvasError(error.message);
      console.error('Error fetching Canvas todos:', error);
    } finally {
      setIsLoadingCanvas(false);
    }
  };

  const addGoal = (goal) => {
    const newGoal = {
      ...goal,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      completed: false
    };
    setGoals(prev => [...prev, newGoal]);
  };

  const completeGoal = async (goalId) => {
    const goalToComplete = goals.find(goal => goal.id === goalId);
    if (goalToComplete && !goalToComplete.completed) {
      // Calculate points based on duration or Canvas points possible
      const earnedPoints = goalToComplete.source === 'canvas' && goalToComplete.pointsPossible
        ? Math.floor(goalToComplete.pointsPossible)
        : Math.floor(goalToComplete.duration / 5) * 10; // 10 points per 5 minutes
      setPoints(prev => prev + earnedPoints);

      // If it's a Canvas assignment, mark it as submitted
      if (goalToComplete.source === 'canvas') {
        try {
          await canvasService.markAssignmentAsSubmitted(
            goalToComplete.canvasAssignmentId,
            goalToComplete.courseId
          );
        } catch (error) {
          console.error('Error marking Canvas assignment as complete:', error);
          // Continue with local completion even if Canvas sync fails
        }
      }
      
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
      spendPoints,
      hasPurchasedBrain,
      purchasedBrains,
      addGoal,
      completeGoal,
      deleteGoal,
      isCanvasEnabled,
      setIsCanvasEnabled,
      isLoadingCanvas,
      canvasError,
      refreshCanvasTodos: fetchCanvasTodos
    }}>
      {children}
    </GoalsContext.Provider>
  );
}