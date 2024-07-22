import React, { Component, Suspense } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import '../../assets/styles/TransMain.css';
import { motion } from 'framer-motion';
// import  from './components/searchPlace';
// import PizzaCard from '../../componenets/ui/pizzaCard';
// import SearchPlace from '../HomePage/components/searchPlace';
import { useGlobalContext } from '../../contextApi/globalContext';
import arrow from '../../assets/images/arrow.svg';
import notify from '../../utlis/error';
import { useLocation } from 'react-router-dom';
import api from '../../api/api';
export default function TransMainPage() {
  const { globalSearch, setGlobalSearch, tempProduct, setTempProduct } =
    useGlobalContext();
  const location = useLocation();
  const [amt,setAmt]=React.useState()
  const [rcpt,setRcpt]=React.useState()
  function handleChange(e)
  {
   setAmt(e.target.value); 
  }

   function handleChange2(e) {
     setRcpt(e.target.value);
   }
  const submit =async()=>
  {
   const response =await api.MakeTrans(amt);
   if(response)
   {
    notify('success',`Paid successfuly to ${rcpt}`)
    setRcpt('')
    setAmt('');
    GetMyCibil();
   }
  }

  const GetMyCibil = async () => {
    const response = await api.GetCIBIL();
    setTempProduct(response.data.val)
  };


  return (
    <React.Fragment>
      <div className='trans-result-grid-main'>
        <div className='trans-result-grid-main-box'>
          <div className='trans-result-grid-main-input'>
           Pay To :
            <input
              placeholder='Enter Phone Number'
              type='text'
              value={rcpt}
              onChange={handleChange2}
            ></input>

          </div>
          <div className='trans-result-grid-main-input'>
           Enter Amount :
            <input
              placeholder='Enter Your Amount'
              type='text'
              value={amt}
              onChange={handleChange}
            ></input>
          </div>
          <div className='trans-result-grid-main-input-submit'>
            <button onClick={submit}>Submit</button>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}