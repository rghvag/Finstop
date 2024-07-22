// import logo from './logo.svg';
import './App.css';
import React from 'react';
import { useLocation } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { useGlobalContext } from './contextApi/globalContext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './layout/navbar';
import HomeViewMain from './pages/HomePage/homeViewMain';
import CartPageMainView from './pages/CartPage/CartPageMainView';
import SchemeQuesMainPage from './pages/SchemeQues/SchemeQuesMainPage';
import SchemeResultMainPage from './pages/SchemeRes/SchemeResultMainPage';
import QuizMainPage from './pages/Quiz/QuizMainPage';
import api from './api/api';
import CourseMainPage from './pages/courses/courseMainPage';
import axios from 'axios';
import TransMainPage from './pages/trans/TransMainPage';
export default function App() {

  // const testCall=async()=>
  // {
  //   // const response = await api.UserProfileDetailsService();
  //   const response = await axios.get('/myget')
  //   console.log(response)
  // }
  // React.useEffect(()=>
  // {
  //   testCall();
  // },[])

  return (
    <div className='App'>
      <Router>
        <Navbar />
        <ToastContainer
          position='top-right'
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme='colored'
        />
        <ScrollToTop></ScrollToTop>
        <Routes>
          <Route exact path='/' element={<HomeViewMain></HomeViewMain>} />
          <Route
            exact
            path='/cart'
            element={<CartPageMainView></CartPageMainView>}
          />
          <Route
            exact
            path='/courses'
            element={<CourseMainPage></CourseMainPage>}
          />
          <Route
            exact
            path='/trans'
            element={<TransMainPage></TransMainPage>}
          />
          <Route exact path='/quiz' element={<QuizMainPage></QuizMainPage>} />
          <Route
            exact
            path='/scheme'
            element={<SchemeQuesMainPage></SchemeQuesMainPage>}
          />
          <Route
            exact
            path='/scheme/search'
            element={<SchemeResultMainPage></SchemeResultMainPage>}
          />
          {/* <Route path='/recharge' element={<AllPost />}></Route> */}
        </Routes>
      </Router>
    </div>
  );
}

const ScrollToTop = () => {
  // Extracts pathname property(key) from an object
  const { pathname } = useLocation();

  // Automatically scrolls to top whenever pathname changes
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return <React.Fragment></React.Fragment>;
};