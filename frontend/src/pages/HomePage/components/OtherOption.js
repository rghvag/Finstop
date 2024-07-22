import React, { Component } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import '../../../assets/styles/otherOptions.css';
import { motion } from 'framer-motion';
import { useGlobalContext } from '../../../contextApi/globalContext';


export default function OtherOptions(props)
{
  const [options,setOptions]=React.useState({
    base:'',
    cheese:'',
    size:''
  })
  const [counter,setCounter]=React.useState(1)
 const hide=(e)=>
 {
  console.log(e.target.className)
  if (e.target.className === 'pizza-home-container-addons-modal-background')
    props.hide();
 }

   function handleChange(event) {
     console.log(event);
     const { name, value, type, checked } = event.target;
     setOptions((prevFormData) => {
       return {
         ...prevFormData,
         [name]: type === 'checkbox' ? checked : value,
       };
     });
     console.log(options);
   }

   //using prev we change the counter value so if user press it fastly then lot of counter reduce will go but then all will be reducing prev value that is 1 to 0 
   // if update was slow the setCounter(counter+1) creates problem as lot of function go on but update the changed value that is the current value of counter not the value of counter when they were called as in prev syntax 
   //so this leads to surpacing of the if condition in case of slow updation
     function reduce() {

      if (counter > 1) {
        setCounter((prev) => prev - 1);
      }
      //can pass state to function too
      // setCounter(abc(counter));
    }

    function increase() {
      
      setCounter((prev) => prev + 1);
      
    }

 return (
   <React.Fragment>
     {props.view && (
       <div
         className='pizza-home-container-addons-modal-background'
         onClick={hide}
       >
         <div className='pizza-home-container-addons-modal'>
           <div className='pizza-home-container-addons-modal-items'>
             <div className='pizza-home-container-addons-modal-items-base'>
               <h1>Select A Base : </h1>
               <select name='base' onChange={handleChange}>
                 <option value='Thin Crust'>Thin Crust</option>
               </select>
             </div>
             <div className='pizza-home-container-addons-modal-items-cheese'>
               <h1>Select A Cheese : </h1>
               <select name='cheese' onChange={handleChange}>
                 <option value='Cheddar'>Cheddar</option>
               </select>
             </div>
             <div className='pizza-home-container-addons-modal-items-size'>
               <h1>Select A Size : </h1>
               <select name='size' onChange={handleChange}>
                 <option value='regular'>Regular</option>
                 <option value='medium'>medium</option>
                 <option value='large'>Large</option>
                 <option value='giant'>Giant</option>
                 <option value='monster'>Monster</option>
               </select>
             </div>
           </div>
           <div className='pizza-home-container-addons-modal-total'>
             <div className='pizza-home-container-addons-modal-total-price'>
               &#8377; 454
             </div>
             <div className='pizza-home-container-addons-modal-total-quant'>
              <div onClick={increase}>+</div>
              <span>{counter}</span>
              <div onClick={reduce}>-</div>
             </div>
           </div>
         </div>
       </div>
     )}
   </React.Fragment>
 );
}


//can pass state to functions too
// function abc(props)
// {
//   props+=1;
//   return props;
// }