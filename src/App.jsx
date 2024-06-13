import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './home';
import FormPage from './formPage';
import './Style/App.css'
import Score from './components/Scores';
function Menu() {
    const [selectedDifficulty, setSelectedDifficulty] = useState('Easy');
    const [isPlaying, setIsPlaying] = useState(false);

    const handlePlayClick = () => {
      setIsPlaying(true);
    }
  
    return (
      <>
        <div className='Menu'>
          <div className="title">
              <h1>AlgoChamp</h1>
          </div>
          <div className="options">
            {!isPlaying ? (
              <div className='Option-div'>
                <div className="option-div-child">
                  <label >Select Difficulty: </label>
                  <select value={selectedDifficulty} onChange={(event) => setSelectedDifficulty(event.target.value)}>
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                    <option value="Random">Random</option>
                  </select>
                  </div>
                <button onClick={handlePlayClick}>Play</button>
              </div>
            ) : (
              <Home difficulty={selectedDifficulty} />
            )}
          </div>
          {!isPlaying?(<div className="scoreBoard">
            <Score />
          </div>
          ):(<div> </div>)}
           
        </div>
    </>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Menu />} />
        <Route path="/play" element={<Home />} />
        <Route path="/submit" element={<FormPage />} />
      </Routes>
    </Router>
  )
}

export default App;
