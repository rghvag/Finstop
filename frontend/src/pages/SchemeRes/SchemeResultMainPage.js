import React, { Component, Suspense } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import '../../assets/styles/SchemeQuesMain.css';
import { motion } from 'framer-motion';
// import  from './components/searchPlace';
// import PizzaCard from '../../componenets/ui/pizzaCard';
import SearchPlace from '../HomePage/components/searchPlace';
import { useGlobalContext } from '../../contextApi/globalContext';
import arrow from '../../assets/images/arrow.svg';
import notify from '../../utlis/error';
import { useLocation } from 'react-router-dom';
export default function SchemeResultMainPage()
{
 
 const { globalSearch, setGlobalSearch } = useGlobalContext();
  const location = useLocation();

 return (
   <React.Fragment>
     <div className="scheme-result-grid-main">
     {location && location.state && location.state.data && location.state.data.map((item)=>
     {
        return <MyBlog data={item}></MyBlog>
     })}
     </div>
   </React.Fragment>
 );
}

function MyBlog(props)
{
  return (
    <React.Fragment>
      <div className='scheme-result-grid-main-blog'>
        <div className='scheme-result-grid-main-head'>
          {props.data.name}
        </div>
        <div className="scheme-result-grid-main-desc">
          {props.data.summary}
        </div>
      </div>
    </React.Fragment>
  );

}