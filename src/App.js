import './App.css';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faVolumeMute } from '@fortawesome/free-solid-svg-icons';
import { useCallback, useEffect, useState } from 'react';

const tiles = ["tile-1", "tile-2", "tile-3", "tile-4"]

function App() {
  const [sequence, setSequence] = useState([]);
  const [userSequence, setUserSequence] = useState([]);
  const [userPlayed, setUserPlayed] = useState(true);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const addColor = useCallback(() => {
    const randomIndex = Math.floor(Math.random() * tiles.length);
    const nextTile = tiles[randomIndex];

    setSequence((prevSequence) => [...prevSequence, nextTile])
  }, [setSequence]);

  const playSequence = useCallback(() => {
    sequence.forEach((tile, index) => {
      let currentTile = document.getElementById(tile);

      const delay = index * 1000;

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

  const resetGame = useCallback(() => {
    setScore(0);
    setSequence([]);
    setUserSequence([]);
    setUserPlayed(false);
    setTimeout(() => {
      setGameOver(false);
    }, 1000);
  }, [setSequence, setUserSequence, setUserPlayed]);

  const playAgain = useCallback(() => {
    let gameOver = document.getElementById("game-over");
    gameOver.classList.add("game-over-inactive");
    gameOver.classList.remove("game-over-active");

    resetGame();
  }, [resetGame]);

  useEffect(() => {
    let currentTile = userSequence.length - 1;

    if (userSequence[currentTile] !== sequence[currentTile]) {
      let gameOver = document.getElementById("game-over");

      gameOver.classList.add("game-over-active");
      gameOver.classList.remove("game-over-inactive");
      setGameOver(true);
    
    } else if (userSequence.length === sequence.length && sequence.length > 0) {
      setScore((prevScore) => prevScore + 1);
    }
  }, [userSequence, sequence, resetGame]);

  useEffect(() => {
    if (userSequence.length === sequence.length && !userPlayed && !gameOver) {
      addColor();
      setUserPlayed(true);
      setUserSequence([]);
    }
    console.log("Sequence: ", sequence);
    console.log("User Sequence: ", userSequence);
  }, [userSequence, sequence, addColor, userPlayed, gameOver]);

  useEffect(() => {
    if (userPlayed && !gameOver) {
      setUserPlayed(false);
      setTimeout(playSequence, 1000);
    }
  }, [userPlayed, playSequence, gameOver]);

  return (
    <div className="App">
      <div className='background-image'>
        <div className="title">
          <h1 data-text="Simon Says">Simon Says</h1>
        </div>

        <div className="controls">
          <p className="score">Score: {score}</p>
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

        <div className='game-over game-over-inactive' id='game-over'>
          <p className='game-over-text'>Game Over</p>
          <button className='play-again' onClick={playAgain}>Play Again</button>
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

