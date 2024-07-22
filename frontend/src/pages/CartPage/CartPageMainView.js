import React, { Component } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import '../../assets/styles/cartMainPageView.css';
import { motion } from 'framer-motion';
import { useGlobalContext } from '../../contextApi/globalContext';

export default function CartPageMainView()
{
 return (
   <React.Fragment>
     <div className='pizza-cart-page-main-view'>
       <div className='pizza-cart-page-main-view-steps'>
         <div className='pizza-cart-page-main-view-steps-address'>
          
         </div>
       </div>
       <div className='pizza-cart-page-main-view-order'>
        
       </div>
     </div>
   </React.Fragment>
 );
}