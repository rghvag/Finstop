import React, { Component } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import '../../../assets/styles/search.css';
import { motion } from 'framer-motion';
import searchIcon from '../../../assets/images/searchIcon.svg'
import { useGlobalContext } from '../../../contextApi/globalContext';
// import useOutsideAlerter from '../../../utlis/OutsideAlert';
export default function SearchPlace()
{
 const navigate =useNavigate()
 const [searchString,setSearchString]=React.useState('')   //include in redux
const { globalSearch, setGlobalSearch } = useGlobalContext();

 const wrapperRef = React.useRef(null);

 useOutsideAlerter(wrapperRef);

function useOutsideAlerter(ref) {
  React.useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        // alert('You clicked outside of me!');
        // setDisplaySearch();
        // setlogoutdrop('login-details-header-dropdown-none');
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref]);
}

 const searchInput=(e)=>
 {
  setSearchString(e.target.value)
 }

const searchNow = async (e) => {
  if (e.key === 'Enter') {
    document.activeElement.blur();
    setGlobalSearch(searchString);

  }
};

 return (
   <React.Fragment>
     <div className='pizza-home-search-bar-container' ref={wrapperRef}>
       <input
         type='text'
         name='searchValue'
         className='pizza-home-search-bar-container-bar'
         placeholder='Search Here'
         value={searchString}
         onChange={searchInput}
         onKeyDown={searchNow}
       ></input>
       <div className='pizza-home-search-bar-container-icon'>
         <motion.img
           whileHover={{ scale: 1.1 ,cursor: 'pointer'}}
           whileTap={{ scale: 0.9 }}
           className='pizza-home-search-bar-container-icon-image'
           src={searchIcon}
           alt='search_icon'
           onClick={searchNow}
           // onKeyUp={searchNow}
         ></motion.img>
       </div>
       {/* {displaySearch && (
         <div className='search-modal'>
           {searchPrediction &&
             searchPrediction.map((item) => {
               return (
                 <div
                   onClick={() => {
                     setMyValueForSearchFromPredictions(item);
                   }}
                 >
                   {item}
                 </div>
               );
             })}
         </div>
       )} */}
     </div>
   </React.Fragment>
 );
}