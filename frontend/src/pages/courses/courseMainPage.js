import React, { Component, Suspense } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import '../../assets/styles/CourseMainPage.css';
import { motion } from 'framer-motion';
import SearchPlace from '../HomePage/components/searchPlace';
// import PizzaCard from '../../componenets/ui/pizzaCard';
// import OtherOptions from './components/OtherOption';
import { useGlobalContext } from '../../contextApi/globalContext';
import arrow from '../../assets/images/arrow.svg';
import scrollleft from '../../assets/images/left.svg'
import scrollright from '../../assets/images/right.svg';
import one from '../../assets/images/first.jpeg'
import sec from '../../assets/images/sec.jpeg';
import third from '../../assets/images/third.jpeg';
import four from '../../assets/images/four.jpeg';
export default function CourseMainPage()
{
 const wrapperRef = React.useRef(null);
 const scrollLeft = (e) => {
   console.log(e);
   console.log(wrapperRef.current.offsetWidth);
   // console.log(props.popularproduct.length * 200);
   let x = wrapperRef.current.scrollLeft;
   let y = wrapperRef.current.scrollTop;
   console.log(x);
   wrapperRef.current.scrollLeft += 800;
 };
 const scrollRight = (e) => {
   console.log(e);
   console.log(wrapperRef.current.offsetWidth);
   // console.log(props.popularproduct.length * 200);
   let x = wrapperRef.current.scrollLeft;
   let y = wrapperRef.current.scrollTop;
   wrapperRef.current.scrollLeft -= 800;
 };
 
 return (
   <React.Fragment>
     <div className='course-main-page-view'>
       <div className='course-main-page-view-search'>
         <SearchPlace></SearchPlace>
       </div>
       <div className='course-main-page-view-main'>
         <div className='course-main-page-view-main-cat1'>
           <div className='course-main-page-view-main-cat1-head'>Stocks</div>
           <div className='course-main-page-view-main-cat1-vid'>
             <div>
               <img src={one}></img>
             </div>
             <div>
               <img src={sec}></img>
             </div>
             <div>
               <img src={third}></img>
             </div>
           </div>
         </div>
         <div className='course-main-page-view-main-cat1'>
           <div className='course-main-page-view-main-cat1-head'>Stocks</div>
           <div className='course-main-page-view-main-cat1-vid'>
             <div>
               <img src={one}></img>
             </div>
             <div>
               <img src={sec}></img>
             </div>
             <div>
               <img src={third}></img>
             </div>
           </div>
         </div>
         <div className='course-main-page-view-main-cat1'>
           <div className='course-main-page-view-main-cat1-head'>Stocks</div>
           <div className='course-main-page-view-main-cat1-vid'>
             <div>
               <img src={one}></img>
             </div>
             <div>
               <img src={sec}></img>
             </div>
             <div>
               <img src={third}></img>
             </div>
           </div>
         </div>

         {/* <div className='popular-products-per-category-head'>
           <div className='popular-product-scroll'>
             <button
               className='popular-product-scroll-left'
               onClick={scrollRight}
             >
               <img src={scrollleft}></img>
             </button>
             <button
               className='popular-products-scroll-right'
               onClick={scrollLeft}
             >
               <img src={scrollright}></img>
             </button>
           </div>
           <div className='popular-products-per-category' ref={wrapperRef}>
             <div className='inside-of-old-code'></div>
             <div className='inside-of-old-code'></div>
             <div className='inside-of-old-code'></div>
             <div className='inside-of-old-code'></div>
             <div className='inside-of-old-code'></div>
             <div className='inside-of-old-code'></div>
             <div className='inside-of-old-code'></div>
             <div className='inside-of-old-code'></div>

             <div className='inside-of-old-code'></div>
             <div className='inside-of-old-code'></div>
           </div>
         </div> */}
       </div>
     </div>
   </React.Fragment>
 );
}