import React from 'react';
import { useGoals } from '../context/GoalsContext';
import '../styles/Shop.css';

export default function Shop() {
  const { points } = useGoals();

  const fighters = [
    { id: 1, name: 'Basic Brain', cost: 100, image: '/brain-placeholder-1.png', description: 'A reliable starter brain fighter' },
    { id: 2, name: 'Speed Synapse', cost: 250, image: '/brain-placeholder-2.png', description: 'Quick-thinking fighter with fast reactions' },
    { id: 3, name: 'Memory Master', cost: 500, image: '/brain-placeholder-3.png', description: 'Excellent at pattern recognition and recall' },
    { id: 4, name: 'Logic Lord', cost: 750, image: '/brain-placeholder-4.png', description: 'Superior problem-solving abilities' },
    { id: 5, name: 'Creative Crusader', cost: 1000, image: '/brain-placeholder-5.png', description: 'Thinks outside the box with unique strategies' },
    { id: 6, name: 'Wisdom Warrior', cost: 1500, image: '/brain-placeholder-6.png', description: 'Ultimate brain fighter with balanced stats' }
  ];

  const handlePurchase = (fighter) => {
    // TODO: Implement purchase functionality
    console.log(`Attempting to purchase ${fighter.name} for ${fighter.cost} points`);
  };

  return (
    <div className="shop-container">
      <div className="shop-header">
        <h1>Brain Fighter Shop</h1>
        <div className="points-display">
          Available Points: <span className="points">{points}</span>
        </div>
      </div>

      <div className="fighters-grid">
        {fighters.map(fighter => (
          <div key={fighter.id} className="fighter-card">
            <img 
              src={fighter.image} 
              alt={fighter.name}
              onError={(e) => {
                e.target.src = '/src/assets/images/brain.png';
                e.target.onerror = null;
              }}
              className="fighter-image" 
            />
            <h3>{fighter.name}</h3>
            <p className="fighter-description">{fighter.description}</p>
            <div className="fighter-cost">{fighter.cost} points</div>
            <button
              className="purchase-button"
              onClick={() => handlePurchase(fighter)}
              disabled={points < fighter.cost}
            >
              {points >= fighter.cost ? 'Purchase' : 'Not Enough Points'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}