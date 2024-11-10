import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVolumeMute } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';

const tiles = ["tile-1", "tile-2", "tile-3", "tile-4"]

function App() {
  const [sequence, setSequence] = useState([]);

  const addColor = () => {
    const randomIndex = Math.floor(Math.random() * tiles.length);
    const nextTile = tiles[randomIndex];

    setSequence((prevSequence) => [...prevSequence, nextTile])
    console.log(sequence)
  }

  const playSequence = () => {
    sequence.forEach((tile, index) => {
      let currentTile = document.getElementById(tile);
  
      const delay = index * 3000;
  
      setTimeout(() => {
        currentTile.classList.add(tile + "-active");
      }, delay);
  
      setTimeout(() => {
        currentTile.classList.remove(tile + "-active");
      }, delay + 1500); 
    });
  };

  useEffect(() => {
    addColor()
    addColor()
    addColor()
    addColor()
    setTimeout(() => { playSequence() }, 10000);
  }, []);

  return (
    <div className="App">
      <div className='background-image'>
        <div className="title">
          <h1 data-text="Simon Says">Simon Says</h1>
        </div>

        <div className="controls">
          <p className="score">Score: 0</p>
          <p className="audio">
            <FontAwesomeIcon icon={faVolumeMute} size="2x" />
          </p>
        </div>

        <div className="board">
          <div className="board-row">
            <button id="tile-1" className="tile"></button>
            <button id="tile-2" className="tile"></button>
          </div>

          <div className="board-row">
            <button id="tile-3" className="tile"></button>
            <button id="tile-4" className="tile"></button>
          </div>
        </div>

        <div className="reset-control">
          <button className="reset-button">
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
