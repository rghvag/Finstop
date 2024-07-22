import React, { useState, useContext, useEffect } from 'react';
import { useCallback } from 'react';
// import api from './api/api';
// import apiclient from './api/apiclient';

//rerenderd is happeing becuase of fetchproducts api  but context is rerendering only once

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [globalSearch, setGlobalSearch] = React.useState('');
  const [service, setServices] = React.useState([]);
  const [loginDetail, setLoginDetail] = React.useState();
  const [loginPage, setLoginPage] = React.useState(0);
  const [products, setProducts] = React.useState([]);
  const [authtemp, setAuthtemp] = React.useState();
  const [tabs, setTabs] = React.useState([]);
  const [mobileNumber, setMobileNumber] = React.useState();
  const [allService, setAllService] = React.useState([]);
  const [userName, setUserName] = React.useState();
  const [timer, setTimer] = React.useState(false);
  let newObject = window.localStorage.getItem('UserProfile');
  // console.log(JSON.parse(newObject));
  const [Userprofile, setUserProfile] = React.useState(JSON.parse(newObject));
  // console.log(Userprofile)
  const [UserLocation, setUserLocation] = React.useState(newObject);
  // console.log(JSON.parse(newObject));
  const [allServiceSelector, setAllServiceSelector] = React.useState([]);
  const [tempProduct, setTempProduct] = React.useState(false);
  const [tempProduct3, setTempProduct3] = React.useState([]);
  const [tempProduct4, setTempProduct4] = React.useState([]);
  const [tempProduct5, setTempProduct5] = React.useState(0);
  const [loading, setLoading] = React.useState(true);
  const [UndesiredProducts, setUndesiredProducts] = React.useState([]);
  const [desiredProducts, setDesiredProducts] = React.useState([]);
  const [changeInCart, setChangeInCart] = React.useState();
  const [likeUpdate, setLikeUpdate] = useState(false);


  return (
    <AppContext.Provider
      value={{
        service,
        products,
        tabs,
        allService,
        userName,
        setUserName,
        loginDetail,
        setLoginDetail,
        loginPage,
        setLoginPage,
        authtemp,
        setAuthtemp,
        mobileNumber,
        setMobileNumber,
        desiredProducts,
        setDesiredProducts,
        timer,
        setTimer,
        Userprofile,
        setUserProfile,
        allServiceSelector,
        setAllServiceSelector,
        tempProduct,
        setTempProduct,
        UndesiredProducts,
        setUndesiredProducts,
        loading,
        setLoading,
       globalSearch, setGlobalSearch,
        changeInCart,
        setChangeInCart,
        likeUpdate,
        setLikeUpdate,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
