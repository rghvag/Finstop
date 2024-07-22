import React, { Component } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import  '../../assets/styles/pizzaCard.css';
import { motion ,Variants } from 'framer-motion';
import test from '../../assets/images/pizzabg.jpg'

export default function PizzaCard(props)
{
 const cardVariants= {
   offscreen: {
     y: 100,
   },
   onscreen: {
     y: 0,
     rotate: -0,
     transition: {
       type: 'spring',
       bounce: 0.4,
       duration: 0.8,
     },
   },
 };
 // return (
 //  <React.Fragment>
 //   <div className="pizza-card-inner-container">
 //    hello {props.data}
 //   </div>
 //  </React.Fragment>
 // )

 // const background = `linear-gradient(306deg, ${hue(hueA)}, ${hue(hueB)})`;

 return (
   <motion.div
     className='pizza-card-inner-container'
     initial='offscreen'
     whileInView='onscreen'
     viewport={{ once: true, amount: 0.8 }}
     variants={cardVariants}
     onClick={props.open}
   >
     {/* <div className='splash' style={{ background }} /> */}
     <div className='pizza-card-inner-container-image'>
       <img src={test}></img>
     </div>
     <div className='pizza-card-inner-container-detail'>
       <span>name fefefef fefefefefeff</span>
       <section> 34343434 Price</section>
     </div>
     <div className='pizza-card-inner-container-desp'>
       Lorem ipsum dolor sit amet consectetur, adipisicing elit. Minima nobis
       tempore eaque recusandae placeat quisquam minus, maiores molestiae quae
       corporis enim voluptatem neque omnis, eius possimus incidunt ad sint
       repellat.
     </div>
     <div className='pizza-card-inner-container-button'>
       <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
         Add To Cart
       </motion.button>
     </div>
   </motion.div>
 );
}