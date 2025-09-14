import { useState } from 'react';
import brainLogo from '../assets/images/brain.png';
import opponentBrain from '../assets/images/Gemini_Generated_Image_r6ugl9r6ugl9r6ug.png';
import '../styles/CortexColosseum.css';

export default function CortexColosseum() {
  const [battleState, setBattleState] = useState('ready'); // ready, starting, fighting, finished
  const [battleResult, setBattleResult] = useState(null);

  const startBattle = () => {
    setBattleState('starting');
    setTimeout(() => {
      setBattleState('fighting');
      // Simulate battle sequence
      simulateBattle();
    }, 2000);
  };

  const simulateBattle = () => {
    const sequence = [
      { time: 0, action: () => console.log('Battle started') },
      { time: 2000, action: () => document.querySelector('.brain.player').classList.add('attack') },
      { time: 3000, action: () => document.querySelector('.brain.opponent').classList.add('damaged') },
      { time: 4000, action: () => document.querySelector('.brain.opponent').classList.add('attack') },
      { time: 5000, action: () => document.querySelector('.brain.player').classList.add('damaged') },
      { time: 6000, action: () => {
        setBattleState('finished');
        setBattleResult('defeat'); // or 'victory' based on your game logic
      }},
    ];

    sequence.forEach(({ time, action }) => {
      setTimeout(action, time);
    });
  };

  return (
    <div className="cortex-arena">
      <header className="arena-header">
        <h1 className="arena-title">The Cortex Colosseum</h1>
      </header>

      <div className="arena-content">
        <div className={`battle-scene ${battleState}`}>
          <div className="brain player">
            <img src={brainLogo} alt="Player's brain" className="brain-image" />
            <div className="synapses"></div>
            <div className="power-level">Level 25</div>
            <div className="brain-effects">
              <div className="fire-effect"></div>
              <div className="hit-effect"></div>
            </div>
          </div>
          
          <div className="battle-effects">
            <div className="lightning"></div>
            <div className="explosion"></div>
            {battleState === 'starting' && (
              <div className="battle-message">
                <div className="pulse-effect">Fight!</div>
              </div>
            )}
            {battleState === 'finished' && (
              <div className="battle-message">
                <div className="pulse-effect">
                  {battleResult === 'victory' ? 'Victory!' : 'Defeat!'}
                </div>
              </div>
            )}
          </div>
          
          <div className="brain opponent">
            <img src={opponentBrain} alt="Opponent's brain" className="brain-image" />
            <div className="synapses"></div>
            <div className="power-level">Level 30</div>
            <div className="brain-effects">
              <div className="fire-effect"></div>
              <div className="hit-effect"></div>
            </div>
          </div>
        </div>

        <div className="arena-description">
          <p className="power-surge">A Level 30 Brain Challenger Appears!</p>
          <p>Defeat your opponent in this battle of knowledge supremacy.</p>
        </div>

        <div className="arena-stats">
          <div className="stat-item">
            <div className="stat-icon">📚</div>
            <div className="stat-label">Topics</div>
            <div className="stat-value">History • Science • Arts</div>
          </div>

          <div className="stat-item">
            <div className="stat-icon">⚡</div>
            <div className="stat-label">Difficulty</div>
            <div className="stat-value">Hard</div>
          </div>

          <div className="stat-item">
            <div className="stat-icon">🏆</div>
            <div className="stat-label">Your Record</div>
            <div className="stat-value">5 Wins, 2 Losses</div>
          </div>
        </div>

        <button className="engage-button" onClick={startBattle}>
          Engage
          <div className="button-glow"></div>
        </button>
      </div>
    </div>
  );
}