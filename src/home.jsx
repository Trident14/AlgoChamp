import { useState, useEffect } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import FormPage from './formPage';
import axios from 'axios';
import Score from './components/Scores';
import './Style/Home.css'

const Home = (props )=> {

   const { difficulty } = props;
  const [data,setData]=useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score,setScore] = useState(0);
  const [flag,setFlag] = useState(false);
  const [timer, setTimer] = useState(10);
  const [quizEnded, setQuizEnded] = useState(false);


  const fetchData = () => {
    const url = 'https://algochampservice.onrender.com/questions/random'; 
    axios.get(url)
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        toast.error("This didn't work.")
        // console.error('Error fetching data:', error);
      });
  };



  const checkAns = (va) =>{
    setFlag(true);
    if(va.correct==true){

      setScore(score+1);
      
    }
    setTimer(10);
    setCurrentIndex(currentIndex + 1);
  }



  // Function to display the current question and choices
  const renderQuestion = () => {
    const currentQuestion = data[currentIndex];
    if(currentIndex==data.length) setQuizEnded(true);

    return (
      <div>
        <p>{currentIndex+1}. {currentQuestion.question}. {currentQuestion.difficulty}</p>
        <ul className='option'>
         
          {currentQuestion.options.map((choice, index) => (
             <button  onClick={()=>checkAns(choice)}><li  key={index}>{choice.text}</li></button>
          ))}
          
        </ul>
        {currentIndex < data.length - 1 && (
          <>
            <button onClick={nextQuestion}>Next Question</button>
          </>
        )}
      </div>
    );
  };

  const nextQuestion = () => {
    if (currentIndex < data.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setFlag(false); // Reset the flag for the next question
      setTimer(10); // Reset the timer for the next question
    } else{
      setQuizEnded(true);
    }
  };

  const fetchDataEasy = () => {
    const url = 'https://algochampservice.onrender.com/questions/Easy';
    axios.get(url)
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        toast.error("This didn't work.")
        // console.error('Error fetching data:', error);
      });
  };

  const fetchDataMedium = () => {
   
    const url = 'https://algochampservice.onrender.com/questions/Medium';
    axios.get(url)
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        toast.error("This didn't work.")
        // console.error('Error fetching data:', error);
      });
  };

  const fetchDataHard = () => {
  
    const url = 'https://algochampservice.onrender.com/questions/Hard';
    axios.get(url)
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        toast.error("This didn't work.")
        // console.error('Error fetching data:', error);
      });
  };

  useEffect(() => {
    console.log(difficulty);
    switch (difficulty) {
      case 'Easy':
        fetchDataEasy();
        break;
      case 'medium':
        fetchDataMedium();
        break;
      case 'hard':
        fetchDataHard();
        break;

      case 'Random':
        fetchData();
        break;
      default:
        fetchData();

    }
  }, [difficulty]);

  useEffect(() => {
 
    let countdown;
  
    if (timer > 0 && currentIndex < data.length) {
      countdown = setInterval(() => {
        setTimer(timer - 1);
      }, 1000);
    }
  
    if (timer === 0) {
      toast.error("Times Up", {
        duration: 1000,
        icon: '⏱️'
      });
      clearInterval(countdown);
      if (currentIndex !== data.length) nextQuestion(); // Move to the next question
    }
  
    // Clean up the interval when the component unmounts
    return () => clearInterval(countdown);
  }, [timer, currentIndex, data.length]);
  
  return (
    <>
    <div><Toaster/></div>
      <div className="home_main">
        <div className='first-contianer'>
          <div> 
            {currentIndex < data.length ? (
              <>
                <div className='score'>Score: {score}</div>
                <div className='Timer'>Time Left: {timer}</div>
                {renderQuestion()}
              </>
            ) : (
                  <FormPage userScore={score} />
                )}
              </div>
        </div>
        
        <div className="second-contianer">
            <div className="second-title">
              <Score />
            </div>
        </div>
     </div>
    </>
  );
}

export default Home;
