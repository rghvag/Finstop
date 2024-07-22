import React, { Component, Suspense } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import '../../assets/styles/SchemeQuesMain.css';
import { motion } from 'framer-motion';
// import SearchPlace from './components/searchPlace';
// import PizzaCard from '../../componenets/ui/pizzaCard';
// import OtherOptions from './components/OtherOption';
import { useGlobalContext } from '../../contextApi/globalContext';
import arrow from '../../assets/images/arrow.svg';
import notify from '../../utlis/error';
import api from '../../api/api';

export default function SchemeQuesMainPage() {
  const [formData, setFormData] = React.useState({
    gender: '',
    age: '',
    state: '',
    area: '',
  });
  const navigate=useNavigate();
  const [page, setPage] = React.useState(1);

  function handleChange(event) {
    console.log(event);
    const { name, value, type, checked } = event.target;
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [name]: type === 'checkbox' ? checked : value,
      };
    });
    console.log(formData);
  }

  const nextPage = async() => {
    
    const response = await api.SendSchemePara(formData.gender)
    if(response)
    {
      navigate('./search', { state: { data: response.data.data } });
    }
  };
  return (
    <React.Fragment>
      <div className='scheme-ques-main-page'>
        <div className='scheme-ques-main-page-heading'>
          Let's Find Best Schemes For You ..
        </div>
        <div className='scheme-ques-main-page-box'>
          <div className='scheme-ques-main-page-box-gen'>
            <div className='scheme-ques-main-page-box-gen-ques'>
              Tell Us Your Gender ?
            </div>
            <div className='scheme-ques-main-page-box-gen-ques-option'>
              <motion.div
                whileHover={{ 'background-color': 'rgba(0, 0, 0, 0.125)' }}
                className='scheme-ques-main-page-box-gender-ans'
              > 
                <input
                  type='radio'
                  // id='part-time'
                  name='gender'
                  value='male'
                  checked={formData.gender === 'male'}
                  onChange={handleChange}
                />
                Male
              </motion.div>
              <motion.div
                whileHover={{ 'background-color': 'rgba(0, 0, 0, 0.125)' }}
                className='scheme-ques-main-page-box-gender-ans'
              >
                <input
                  type='radio'
                  // id='part-time'
                  name='gender'
                  value='female'
                  checked={formData.gender === 'female'}
                  onChange={handleChange}
                />
                Female
              </motion.div>
              <motion.div
                whileHover={{ 'background-color': 'rgba(0, 0, 0, 0.125)' }}
                className='scheme-ques-main-page-box-gender-ans'
              >
                <input
                  type='radio'
                  // id='part-time'
                  name='gender'
                  value='others'
                  checked={formData.gender === 'others'}
                  onChange={handleChange}
                />
                Others
              </motion.div>
            </div>
          </div>
          <div className='scheme-ques-main-page-box-age'>
            <div className='scheme-ques-main-page-box-age-head'>
              And Your Age Too..
            </div>
            <div className='scheme-ques-main-page-box-age-input'>
              <input
                type='number'
                placeholder='Your Age'
                onChange={handleChange}
                name='age'
                value={formData.age}
              />
            </div>
          </div>
          <div className='scheme-ques-main-page-box-submit'>
            <button onClick={nextPage}>Next <img src={arrow}></img></button>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
