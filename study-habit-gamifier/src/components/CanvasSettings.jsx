import React from 'react';
import { useGoals } from '../context/GoalsContext';
import '../styles/CanvasSettings.css';

export default function CanvasSettings() {
  const { 
    isCanvasEnabled, 
    setIsCanvasEnabled, 
    isLoadingCanvas, 
    canvasError,
    refreshCanvasTodos 
  } = useGoals();

  const handleToggleCanvas = () => {
    setIsCanvasEnabled(!isCanvasEnabled);
  };

  return (
    <div className="canvas-settings">
      <div className="canvas-header">
        <h2>Canvas Integration</h2>
        <div className="canvas-toggle">
          <label className="switch">
            <input
              type="checkbox"
              checked={isCanvasEnabled}
              onChange={handleToggleCanvas}
            />
            <span className="slider"></span>
          </label>
          <span className="toggle-label">
            {isCanvasEnabled ? 'Enabled' : 'Disabled'}
          </span>
        </div>
      </div>

      {isCanvasEnabled && (
        <div className="canvas-status">
          {isLoadingCanvas && (
            <div className="loading-message">
              <span className="loading-icon">🔄</span> Syncing with Canvas...
            </div>
          )}
          
          {canvasError && (
            <div className="error-message">
              ❌ Error: {canvasError}
            </div>
          )}

          <button 
            className="refresh-button"
            onClick={refreshCanvasTodos}
            disabled={isLoadingCanvas}
          >
            Refresh Canvas Tasks
          </button>
        </div>
      )}

      {isCanvasEnabled && (
        <div className="canvas-info">
          <p>
            Your Canvas assignments will automatically appear in your goals list.
            Completing a goal will mark it as submitted in Canvas.
          </p>
          <p className="note">
            Note: Make sure your Canvas API token is configured correctly.
          </p>
        </div>
      )}
    </div>
  );
}