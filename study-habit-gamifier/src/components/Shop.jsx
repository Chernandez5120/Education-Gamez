import React from 'react';
import { useGoals } from '../context/GoalsContext';
import '../styles/Shop.css';

export default function Shop() {
  const { points, spendPoints, hasPurchasedBrain, purchasedBrains } = useGoals();

  const fighters = [
    { 
      id: 1, 
      name: 'Boxing Brain', 
      cost: 100, 
      image: '/src/assets/fighters/boxer-brain.png', 
      description: 'A determined fighter with boxing gloves and headband, ready for mental combat!'
    },
    { 
      id: 2, 
      name: 'Viking Scholar', 
      cost: 500, 
      image: 'src/assets/images/Gemini_Generated_Image_bj5zxrbj5zxrbj5z.png', 
      description: 'Ancient wisdom meets raw power, complete with runic knowledge'
    },
    { 
      id: 3, 
      name: 'Techno Brain', 
      cost: 750, 
      image: 'src/assets/images/Gemini_Generated_Image_3oo4u93oo4u93oo4.png', 
      description: 'Cybernetic enhancements and a monocle for calculated precision'
    },
    { 
      id: 4, 
      name: 'Valkyrie Brain', 
      cost: 1000, 
      image: 'src/assets/images/Gemini_Generated_Image_jhz9rsjhz9rsjhz9.png', 
      description: 'Magical warrior wielding rainbow powers and celestial might'
    },
    { 
      id: 5, 
      name: 'Neural King', 
      cost: 1500, 
      image: 'src/assets/images/Gemini_Generated_Image_hx4t7shx4t7shx4t.png', 
      description: 'Crowned champion of knowledge with supreme intellectual power'
    },
    { 
      id: 6, 
      name: 'Ice Fighter', 
      cost: 2000, 
      image: 'src/assets/images/Gemini_Generated_Image_g1g7veg1g7veg1g7.png', 
      description: 'Master of cool calculation with electrifying combat techniques'
    }
  ];

  const handlePurchase = (fighter) => {
    if (hasPurchasedBrain(fighter.id)) {
      alert('You already own this brain!');
      return;
    }

    if (points >= fighter.cost) {
      const success = spendPoints(fighter.cost, fighter.id);
      if (success) {
        alert(`Successfully purchased ${fighter.name}!`);
      } else {
        alert('Failed to complete purchase. Please try again.');
      }
    } else {
      alert('Not enough points!');
    }
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
              disabled={points < fighter.cost || hasPurchasedBrain(fighter.id)}
            >
              {points >= fighter.cost ? 'Purchase' : 'Not Enough Points'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}