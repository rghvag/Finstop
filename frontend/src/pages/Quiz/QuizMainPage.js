import React, { Component, Suspense } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import '../../assets/styles/QuizMainPage.css';
import { motion } from 'framer-motion';
// import SearchPlace from './components/searchPlace';
// import PizzaCard from '../../componenets/ui/pizzaCard';
// import OtherOptions from './components/OtherOption';
import { useGlobalContext } from '../../contextApi/globalContext';
import arrow from '../../assets/images/arrow.svg';
import api from '../../api/api';

export default function QuizMainPage() {

  const {
    loginDetail,
    setLoginDetail,
    loginPage,
    setLoginPage,
    authtemp,
    setAuthtemp,
    mobileNumber,
    setMobileNumber,
    timer,
    setTimer,
    Userprofile,
    setUserProfile,
  } = useGlobalContext();
  const [ques, setQues] = React.useState([
    {
      id: 1,
      question: 'what is capital of france1',
      options: ['Paris1', 'London1', 'Berlin1', 'Rome1'],
      correctAnswer: 'Paris',
    },
    {
      id: 2,
      question: 'what is capital of france2',
      options: ['Paris', 'London', 'Berlin', 'Rome'],
      correctAnswer: 'Paris',
    },
    {
      id: 3,
      question: 'what is capital of france3',
      options: ['Paris', 'London', 'Berlin', 'Rome'],
      correctAnswer: 'Paris',
    },
    {
      id: 4,
      question: 'what is capital of france4',
      options: ['Paris', 'London', 'Berlin', 'Rome'],
      correctAnswer: 'Paris',
    },
  ]);
  const [ans, setAns] = React.useState({ 1: '', 2: '', 3: '', 4: '' });
  const [showScore, setShowScore] = React.useState(false);
  const [scoreFinal, setScoreFinal] = React.useState(0);
  const [page, setPage] = React.useState(1);

  function handleChange(event) {
    console.log(event);
    const { name, value, type, checked } = event.target;
    setAns((prevFormData) => {
      return {
        ...prevFormData,
        [name]: type === 'checkbox' ? checked : value,
      };
    });
    console.log(ans);
  }
  function changeShowScore() {
    if (!showScore) {
      let temp = 0;
      let len = ques.length;
      for (let i = 0; i < len; i++) {
        if (ans[i] && ans[i] === ques[i].correctAnswer) {
          temp++;
          console.log(temp);
        }
      }
      setScoreFinal(temp);
    } else {
      setScoreFinal(0);
      setAns({});
    }
    setShowScore(!showScore);
  }

  const sendScore=async(temp)=>
  {
    const response=await api.SubmitScore(temp)
    if(response)
    {
        //  localStorage.setItem('authtoken', response.data.token);
         setUserProfile(response.data.user);
        //  setLoginPage(0);
    }
    
  }
  function calculateScore()
  {
     if (!showScore) {
       let temp = 0;
       let len = ques.length;
       for (let i = 0; i < len; i++) {
         if (ans[i] && ans[i] === ques[i].correctAnswer) {
           temp++;
           console.log(temp);
         }
       }
       setScoreFinal(temp); 
       sendScore(temp);

     } else {
       setScoreFinal(0);
       setAns({});
       setPage(1)
     }
     setShowScore(!showScore);
  }
  return (
    <React.Fragment>
      <div className='quiz-main-page'>
        <div className='quiz-main-page-left'>
          <div className='quiz-main-page-left-ques'>
            <span>Question {page} : </span>
            {ques[page - 1].question}
          </div>
          <span className='quiz-main-page-left-ques-ans'> Answer : </span>
          <div className='quiz-main-page-left-option'>
            {ques &&
              ques[page - 1].options &&
              ques[page - 1].options.map((item, index) => {
                console.log(ans[page - 1]);
                return (
                  <motion.div
                    whileHover={{ 'background-color': 'rgba(0, 0, 0, 0.125)' }}
                    className='quiz-main-page-left-option-block'
                  >
                    <input
                      type='radio'
                      name={page - 1}
                      value={item}
                      checked={ans[page - 1] === item}
                      onChange={handleChange}
                    />
                    {item}
                  </motion.div>
                );
              })}
          </div>
        </div>
        <div className='quiz-main-page-right-main'>
          <div className='quiz-main-page-right'>
            {ques &&
              ques.map((item, index) => {
                return (
                  <motion.div
                    onClick={() => setPage(index + 1)}
                    style={
                      ans[index]
                        ? { 'background-color': ' rgb(18, 193, 18)' }
                        : { 'background-color': 'rgba(193, 185, 186, 0.466)' }
                    }
                  >
                    {index + 1}
                  </motion.div>
                );
              })}
          </div>
          <div className='quiz-main-page-right-submit'>
            
            {
              !showScore?<button onClick={calculateScore}>Submit</button>:<><div>Your Score : {scoreFinal}</div><button onClick={calculateScore}>Try Again</button></>
            }
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
