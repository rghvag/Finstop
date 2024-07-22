import React, { Component } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import '../assets/styles/login-sidebar.css';
import { motion } from 'framer-motion';
import { useGlobalContext } from '../contextApi/globalContext';
import logo from '../assets/images/logo2.png'
import google from '../assets/images/google.svg';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { useGoogleLogin } from '@react-oauth/google';
import eyeclose from '../assets/images/eyeclose.svg';
import eye from '../assets/images/eye-pass.svg';
import api from '../api/api';



export default function LoginSideBar(props)
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
} = useGlobalContext();
const { loading, setLoading } = useGlobalContext();
const { changeInCart, setChangeInCart } = useGlobalContext();
const [display, setDisplay] = React.useState();
const [localMobileNumber, setLocalMobileNumber] = React.useState();
const [firstName, setFirstName] = React.useState('');
const [refral, setRefral] = React.useState();
const [lastName, setLastName] = React.useState('');
const [otp, setOtp] = React.useState({ 1: '', 2: '', 3: '', 4: '' });
const [page, setPage] = React.useState(1);
const [password, setPassword] = React.useState();
const [showPass, setShowPass] = React.useState(false);
const wrapperRef = React.useRef(null);




  OutsideAlerter(wrapperRef);
  function OutsideAlerter(ref) {
    React.useEffect(() => {
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          console.log(ref.current);
          setLoginPage(0);
        }
      }
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [ref]);
   }







 const CreateNewAccountButton = async () => {
   // try {
   //   setMobileNumber(localMobileNumber.split(' ')[0]);
   //   localStorage.setItem('prevtoken', localStorage.getItem('authtoken'));
   //   const response = await api.RegisterUSer(
   //     firstName,
   //     lastName,
   //     '+91' + localMobileNumber.split(' ')[0],
   //     refral,
   //     '',
   //     12
   //   );
   //   console.log(response);
   //   if (response.data.error === '') {
   //     localStorage.setItem('authtoken', response.data.token);
   //     console.log(localStorage.getItem('authtoken'));
   //     presignup();
   //     setTimer(true);

   //     setLoginPage(9);
   //   } else {
   //     notify('error', response.data.error);
   //     UserLocation();
   //   }
   // } catch (error) {
   //   notify('error', error);
   // }

   const response = await api.UserSignUp(firstName,lastName,localMobileNumber,refral)
   if(response.data && response.data.token)
   {
    localStorage.setItem('authtoken',response.data.token);
    setUserProfile(response.data.user)
    // localStorage.setItem('UserProfile',response.data.user);
    setLoginPage(0)
   }
 };
  const LoginWithOtpMobileFunc = async () => {

    // setMobileNumber(localMobileNumber.split(" ")[0]);

    // var letters = /^\d+$/;
    // if (letters.test(localMobileNumber.split(" ")[0])) {
    //   try{const response = await api.LoginWithOtpMobile('+91' + localMobileNumber.split(" ")[0]);
    //   console.log(response);
    //   if (response && response.data.token) {
    //     setAuthtemp(response.data.token);
    //     setTimer(true);
    //     console.log('timer', timer);
    //     setLoginPage(10);
    //   }}
    //   catch(error)
    //   {
    //     notify('error',error.message)
    //   }
    // } else {

    //   try{const response = await api.LoginWithOtpUserName(localMobileNumber.split(" ")[0]);
    //   console.log(response);
    //   if (response && response.data.token) {
    //     setAuthtemp(response.data.token);
    //     setTimer(true);
    //     setLoginPage(10);
    //   }}
    //   catch(error)
    //   {
    //     notify('error',error.message)
    //   }
    // }
  };


  const loginWithGoogleApiResponse = async (data) => {
    // const response = await api.LoginWithSocialMedia(
    //   'google',
    //   data.sub,
    //   data.email,
    //   data.name
    // );
    // console.log(response);
    // setLoginDetail(response.data);
    // localStorage.setItem('authtoken', response.data.token);
    // // presignup();
    // const myTimeout = setTimeout(getProfileAfterLogin, 5000);
  };
  const login = useGoogleLogin({
    // onSuccess: async (respose) => {
    //   try {
    //     const res = await axios.get(
    //       'https://www.googleapis.com/oauth2/v3/userinfo',
    //       {
    //         headers: {
    //           Authorization: `Bearer ${respose.access_token}`,
    //         },
    //       }
    //     );

    //     console.log(res.data);
    //     setLoginDetail(res.data);

    //     // console.log(loginDetail.name);
    //     loginWithGoogleApiResponse(res.data);
    //   } catch (err) {
    //     console.log(err);
    //   }
    // },
  });







  const LoginWithPasswordMobileFunc = async () => {
const response =await api.UserLogin(localMobileNumber,password)
 if (response.data && response.data.token) {
   localStorage.setItem('authtoken', response.data.token);
   setUserProfile(response.data.user);
    // localStorage.setItem('UserProfile', response.data.user);
   setLoginPage(0);
 }

  }

   const ClickForgotPass = () => {
   setLoginPage(2);
 };
 const ChangeEyeNewPass = () => {
   setShowPass(!showPass);
 };
  const ChangePageLogin = () => {
    setPage(1);
  };
  const ChangePageNewAccount = () => {
    setPage(2);
  };
    function editMobileNumber(e) {
    const val = e.target.value;
    setLocalMobileNumber(val);
    console.log(localMobileNumber);
  }
  function editPassword(e) {
    const val = e.target.value;
    setPassword(val);
    console.log(password);
  }
  function editFirstName(e) {
    const val = e.target.value;
    setFirstName(val);
    console.log(firstName);
  }
  function editLastName(e) {
    const val = e.target.value;
    setLastName(val);
    console.log(lastName);
  }
  function editReferralCode(e) {
    const val = e.target.value;
    setRefral(val);
    console.log(refral);
  }



 return (
   <React.Fragment>
     <React.Fragment>
       {loginPage === 1 && (
         <div className={props.view} ref={wrapperRef}>
           {/* <div className='close-login-sidebar'>
         <span onClick={onCross}>X</span>
       </div> */}

           <div className='login-box-sidebar-logo'>
             <img src={logo}></img>
           </div>
           <div className='login-box-sidebar-welcome'>
             Welcome To <span>FINSTOP</span>
           </div>
           <div className='login-box-sidebar-text'>
             Before you get started, you must login or register if you don't
             already have an account.
           </div>
           {page === 1 ? (
             <>
               <div className='login-box-sidebar-option'>
                 <div>LOGIN</div>
                 <span onClick={ChangePageNewAccount}>CREATE NEW ACCOUNT</span>
               </div>
               <div className='login-box-sidebar-input-box'>
                 <span>Email Address</span>
                 <input
                   placeholder='Enter Your Email'
                   type='text'
                   pattern='[1-9]{1}[0-9]{9}'
                   size='1'
                   value={localMobileNumber}
                   onChange={editMobileNumber}
                   //  oninput="checkIfValidIndianMobileNumber(value, 'login_mobile_number')"
                 ></input>

                 {!showPass ? (
                   <>
                     <span>Password</span>
                     <div>
                       <input
                         placeholder='Enter Password'
                         type='text'
                         pattern='[1-9]{1}[0-9]{9}'
                         size='1'
                         value={password}
                         onChange={editPassword}
                         //  oninput="checkIfValidIndianMobileNumber(value, 'login_mobile_number')"
                       ></input>
                       <img src={eye} onClick={ChangeEyeNewPass}></img>
                     </div>
                   </>
                 ) : (
                   <>
                     <span>Password</span>
                     <div>
                       <input
                         placeholder='Enter Password'
                         type='password'
                         pattern='[1-9]{1}[0-9]{9}'
                         size='1'
                         value={password}
                         onChange={editPassword}
                         //  oninput="checkIfValidIndianMobileNumber(value, 'login_mobile_number')"
                       ></input>
                       <img src={eyeclose} onClick={ChangeEyeNewPass}></img>
                     </div>
                   </>
                 )}
               </div>
               <div className='login-box-sidebar-button-login'>
                 <button onClick={LoginWithPasswordMobileFunc}>Login</button>
                 <button onClick={LoginWithOtpMobileFunc}>
                   Login With O.T.P
                 </button>
               </div>
               <div className='login-box-sidebar-description-terms'>
                 By clicking LogIn, LogIn with O.T.P or Continue with google ,
                 you agree to our <a>Terms and Conditions</a> and{' '}
                 <a>Privacy Statements</a>
               </div>
               <div
                 className='login-box-sidebar-forgot-password'
                 onClick={ClickForgotPass}
               >
                 Forgot Password?
               </div>
             </>
           ) : (
             <>
               <div className='login-box-sidebar-option'>
                 <span onClick={ChangePageLogin}>LOGIN</span>
                 <div>CREATE NEW ACCOUNT</div>
               </div>
               <div className='login-box-sidebar-input-box-new-account'>
                 <span>First Name</span>
                 <input
                   placeholder='Enter First Name'
                   type='text'
                   pattern='[1-9]{1}[0-9]{9}'
                   size='1'
                   value={firstName}
                   onChange={editFirstName}
                   //  oninput="checkIfValidIndianMobileNumber(value, 'login_mobile_number')"
                 ></input>
                 <span>Password</span>
                 <input
                   placeholder='Enter Password'
                   type='password'
                   value={lastName}
                   onChange={editLastName}
                   //  oninput="checkIfValidIndianMobileNumber(value, 'login_mobile_number')"
                 ></input>
                 <span>Mobile Number</span>
                 <input
                   placeholder='Enter Mobile Number'
                   type='text'
                   pattern='[1-9]{1}[0-9]{9}'
                   size='1'
                   maxLength='10'
                   value={localMobileNumber}
                   onChange={editMobileNumber}
                   //  oninput="checkIfValidIndianMobileNumber(value, 'login_mobile_number')"
                 ></input>
                 <span>Email</span>
                 <input
                   placeholder='Enter Your Email Address'
                   type='email'
                   value={refral}
                   onChange={editReferralCode}
                   //  oninput="checkIfValidIndianMobileNumber(value, 'login_mobile_number')"
                 ></input>
               </div>
               <div className='login-box-sidebar-button-login-new-account'>
                 <button onClick={CreateNewAccountButton}>
                   Create Account
                 </button>
               </div>
               <div className='login-box-sidebar-description-terms'>
                 By clicking LogIn, LogIn with O.T.P or Continue with google ,
                 you agree to our <a href=''>Terms and Conditions</a> and{' '}
                 <a href=''>Privacy Statements</a>
               </div>
             </>
           )}

           <div className='login-box-sidebar-hr'></div>
           <div className='login-box-sidebar-hr-text'>
             <span>Or Continue With</span>
           </div>
           <div className='login-box-sidebar-google-button'>
             <GoogleOAuthProvider clientId='234552605255-f6plqcaia9v3t8cqheqhrc7aiftsl6ag.apps.googleusercontent.com'>
               <button onClick={login} id='googleLoginButton'>
                 <img src={google} alt='google'></img>
                 Google
               </button>
             </GoogleOAuthProvider>
           </div>
         </div>
       )}
     </React.Fragment>
   </React.Fragment>
 );
}