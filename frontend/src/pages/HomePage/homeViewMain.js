import React, { Component,Suspense }from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
import '../../assets/styles/homeViewMain.css'
import { motion } from 'framer-motion';
import SearchPlace from './components/searchPlace';
import PizzaCard from '../../componenets/ui/pizzaCard';
import OtherOptions from './components/OtherOption';
import { useGlobalContext } from '../../contextApi/globalContext';
import arrow from '../../assets/images/arrow.svg'
import back from '../../assets/images/back.jpeg'
export default function HomeViewMain()
{
 let arr = [
   'acdcc',
   'dfefe',
   'ffff',
   'fsdaw',
   'acdcc',
   'dfefe',
   'ffff',
   'fsdaw',
 ];
 const navigate=useNavigate();
 const [display ,setDisplay]=React.useState(false);
 const { globalSearch, setGlobalSearch } = useGlobalContext();

 const hide=()=>
 {
  setDisplay(false);
 }
 const show=()=>
 {
  setDisplay(true);
 }
 function schemeForm()
 {
  navigate('./scheme');
 }
//  return(<div className='pizza-home-container'></div>)
 return (
   <React.Fragment>
     <div className='pizza-home-container'>
       <div className='iframe-container'>
         <iframe
           src='https://webchat.botframework.com/embed/chatbot-blackrock-bot?s=jgE6zFPAeoI.DqLS7lzO79u79HtfeGwpzFLJuDkcwogRZ357-X9vu_8'
           title='Chatbot'
         ></iframe>
       </div>
       <div className='pizza-home-container-left'>
         <img src={back}></img>
       </div>
       <div className='pizza-home-container-right'>
         <div className='pizza-home-container-right-head'>
           One Stop <br></br>
           <span>Finance</span>
         </div>
         <div className='pizza-home-container-right-desc'>
           Unlocking Financial Freedom: Your Comprehensive One-Stop Solution
           for Every Financial Challenge!{' '}
         </div>

         <div className='pizza-home-container-right-button'>
           <button onClick={schemeForm}>Scheme</button>
           <button
             onClick={() => {
               navigate('./trans');
             }}
           >
             Transcation
           </button>
         </div>
       </div>
       {/* <div className='scheme-find-heading'>
         #GOVERNMENTSCHEMES / #SCHEMESFORYOU
       </div> */}
       {/* <div className='scheme-find-button'>
         <div onClick={schemeForm}>
           Find Schemes For You <img src={arrow}></img>{' '}
         </div>
       </div>
       <div className='scheme-find-amount'>
         <div>
           <span>971</span>
           <section>Total Scheme</section>
         </div>
         <div>
           <span>371</span>
           <section>Central Government Scheme</section>
         </div>
         <div>
           <span>600</span>
           <section>State Government Scheme</section>
         </div>
       </div>
       <div
         className=''
         onClick={() => {
           navigate('./trans');
         }}
       >
         trans
       </div> */}
     </div>
   </React.Fragment>
 );
}