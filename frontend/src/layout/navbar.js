import React, { Component } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import '../assets/styles/navbar.css'
import { motion } from 'framer-motion';
import LoginSideBar from './loginSidebar';
import { useGlobalContext } from '../contextApi/globalContext';
import api from '../api/api';
import notify from '../utlis/error';
import trophy from '../assets/images/trophy.png'
import Notification from './notification';
import logo from '../assets/images/logo.png'
export default function Navbar()
{
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
    tempProduct,
    setTempProduct,
  } = useGlobalContext();
  const wrapperRef = React.useRef(null);

  useOutsideAlerter(wrapperRef);
 const navigate=useNavigate();
 const [logoutdrop,setlogoutdrop]=React.useState('login-details-header-dropdown-none')
 const [display, setDisplay] = React.useState('login-sidebar-container-none');
  const [cibil, setCibil] = React.useState();

  // const GetMyCibil=async()=>
  // {
  //   const response = await api.GetCIBIL();
  //   setCibil(response.data);
  // }

  // React.useEffect(()=>
  // {if(Userprofile)
  //   GetMyCibil();
  // },[tempProduct])
 
  function useOutsideAlerter(ref) {
    React.useEffect(() => {
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          // alert('You clicked outside of me!');
          setlogoutdrop('login-details-header-dropdown-none');
        }
      }
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [ref]);
  }

 const handleChange = () => {
   console.log('fired');
   setDisplay('login-sidebar-container-none');
 };

  const onLogin = () => {
    setDisplay('login-sidebar-container2');
    setLoginPage(1);
    console.log(display);
  };

  const LogoutDropDown = () => {
    if (logoutdrop === 'login-details-header-dropdown') {
      setlogoutdrop('login-details-header-dropdown-none');
    } else {
      setlogoutdrop('login-details-header-dropdown');
    }
  };


   const logOutOption = async () => {
     const response = api.LogOut();
     console.log(response);
       navigate('/');
       setLoginDetail();
       setUserProfile();

       localStorage.removeItem('UserProfile');
       localStorage.removeItem('authtoken');

       // presignup();

       notify('success', 'logout successful');
   };


   


 return (
   <React.Fragment>
     <div className='pizza-navbar-container'>
       <div className='pizza-navbar-container-logo'>
         <motion.img
           whileHover={{ scale: 1.1 }}
           whileTap={{ scale: 0.9 }}
           className='pizza-navbar-container-logo-title'
           onClick={() => navigate('/')}
           src={logo}
         >
           
         </motion.img>
       </div>
       <div className='pizza-navbar-container-links'>
         <motion.div
           whileHover={{ scale: 1.1 }}
           whileTap={{ scale: 0.9 }}
           className='pizza-navbar-container-links-home'
           onClick={() => navigate('/quiz')}
         >
           Quiz
         </motion.div>
         <motion.div
           whileHover={{ scale: 1.1 }}
           whileTap={{ scale: 0.9 }}
           className='pizza-navbar-container-links-order'
           onClick={() => navigate('/courses')}
         >
           My Courses
         </motion.div>
         <motion.div
           whileHover={{ scale: 1.1 }}
           whileTap={{ scale: 0.9 }}
           onHoverStart={(e) => {}}
           onHoverEnd={(e) => {}}
           className='pizza-navbar-container-links-cart'
           onClick={() => {
             window.location.href = 'http://localhost:5000/';
           }}
         >
           Chat
         </motion.div>
       </div>

       <div className='pizza-navbar-container-logger'>
         {Userprofile && (
           <div className='notification-header-mine'>
             <img className='bell-icon' src={trophy}></img>
             <span>{Userprofile.score}</span>
             {/* <div className='notification-header-modal'>
            {!notification ? (
              <div className='notification-none'></div>
            ) : (
              <div className='notification-show'>
                <Notification></Notification>
              </div>
            )}
          </div> */}
           </div>
         )}
         {Userprofile ? (
           <>
             <div className='login-details-header' onClick={LogoutDropDown}>
               <div className='login-details-header-image'>
               </div>
               <div className='login-details-header-details'>
                 <div className='login-details-header-details-name'>
                   {Userprofile.name}
                 </div>
               </div>
               <div ref={wrapperRef} className={logoutdrop}>
                 <span>
                   <div onClick={logOutOption}>Log Out</div>
                 </span>
                 {tempProduct && (
                   <span>
                     <div>CIBIL Score : {tempProduct}</div>
                   </span>
                 )}
               </div>
             </div>
           </>
         ) : (
           <div className='login-button' onClick={onLogin}>
             Log In
           </div>
         )}
       </div>
       <div className='login-sidebar'>
         <LoginSideBar view={display} onChange={handleChange} />
         {/* <LoginSidebarForgotPassword view={display} /> */}
       </div>
     </div>
   </React.Fragment>
 );
}







{/* <CustomLink to="/pricing">Pricing</CustomLink>
        <CustomLink to="/about">About</CustomLink>
      </ul>
    </nav>
  )
}

function CustomLink({ to, children, ...props }) {
  const resolvedPath = useResolvedPath(to)
  const isActive = useMatch({ path: resolvedPath.pathname, end: true })

  return (
    <li className={isActive ? "active" : ""}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  ) */}