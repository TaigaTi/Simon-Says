import './App.css';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faVolumeMute } from '@fortawesome/free-solid-svg-icons';
import { useCallback, useEffect, useState } from 'react';

const tiles = ["tile-1", "tile-2", "tile-3", "tile-4"]

function App() {
  const [sequence, setSequence] = useState([]);
  const [userSequence, setUserSequence] = useState([]);
  const [userPlayed, setUserPlayed] = useState(false);

  const addColor = useCallback(() => {
    const randomIndex = Math.floor(Math.random() * tiles.length);
    const nextTile = tiles[randomIndex];

    setSequence((prevSequence) => [...prevSequence, nextTile])
  }, [setSequence]);

  const playSequence = useCallback(() => {
    sequence.forEach((tile, index) => {
      let currentTile = document.getElementById(tile);

      const delay = index * 2000;

      setTimeout(() => {
        currentTile.classList.add(tile + "-active");
      }, delay);

      setTimeout(() => {
        currentTile.classList.remove(tile + "-active");
      }, delay + 800);
    });
  }, [sequence]);

  const addUserSequence = (tile) => {
    setUserSequence((prevSequence) => [...prevSequence, tile]);
  }

  const resetGame = () => {
    setSequence([]);
    setUserSequence([]);
    setUserPlayed(false);
    setTimeout(addColor, 1000);
  }

  useEffect(() => {
    if (sequence.length === 0) {
      addColor();
      setUserPlayed(true);
    }
  }, [sequence, addColor]);

  useEffect(() => {
    if (userSequence.length === sequence.length) {
      setUserPlayed(true);
      addColor();
      setUserSequence([]);
    }
  }, [userSequence, sequence, addColor]);

  useEffect(() => {
    if (sequence.length > 0 && userPlayed) {
      setUserPlayed(false);
      setTimeout(playSequence, 1000);
    }
  }, [userPlayed, sequence, addColor, playSequence]);

  return (
    <div className="App">
      <div className='background-image'>
        <div className="title">
          <h1 data-text="Simon Says">Simon Says</h1>
        </div>

        <div className="controls">
          <p className="score">Score: 0</p>
          <p className="audio">
            {/* <FontAwesomeIcon icon={faVolumeMute} size="2x" /> */}
          </p>
        </div>

        <div className="board">
          <div className="board-row">
            <button id="tile-1" className="tile" onClick={() => addUserSequence("tile-1")}></button>
            <button id="tile-2" className="tile" onClick={() => addUserSequence("tile-2")}></button>
          </div>

          <div className="board-row">
            <button id="tile-3" className="tile" onClick={() => addUserSequence("tile-3")}></button>
            <button id="tile-4" className="tile" onClick={() => addUserSequence("tile-4")}></button>
          </div>
        </div>

        <div className="reset-control">
          <button className="reset-button" onClick={resetGame}>
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;

