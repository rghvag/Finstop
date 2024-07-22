import axios from 'axios';

const API_BASE_URL = 'https://putatoetest-k3snqinenq-uc.a.run.app';
let json = {
  address_line1: 'Gorakhnath Mandir',
  address_line2: 'Gorakhnath Mandir',
  landmark: 'Gorakhnath Mandir',
  town: 'Gorakhpur',
  state: 'Uttar Pradesh',
  latitude: '26.7828471',
  longitude: '83.3612555',
  district: 'Gorakhpur',
  country: 'India',
  pincode: '273015',
};
let json2 = JSON.stringify(json);
class UserService {
  UserLocationApi() {
    return axios.post(
      API_BASE_URL + '/v1/api/userlocation',
      {
        address_line1: 'Gorakhnath Mandir',
        address_line2: 'Gorakhnath Mandir',
        landmark: 'Gorakhnath Mandir',
        town: 'Gorakhpur',
        state: 'Uttar Pradesh',
        latitude: '26.7828471',
        longitude: '83.3612555',
        district: 'Gorakhpur',
        country: 'India',
        pincode: '273015',
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
  UserLocationApi2() {
    return axios.post(
      API_BASE_URL + '/v1/api/userlocation',
      {
        place_id: 'ChIJV3xvVMdFkTkR0OIUYBUOrWc',
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
  popularServices() {
    return axios
      .get(API_BASE_URL + '/v1/api/popularServices', {
        headers: {
          authtoken: localStorage.getItem('authtoken'),
          'Content-Type': 'application/json',
        },
      })
      .then((res) => {
        console.log(res);
      });
  }
  popularSubServicesApi() {
    return axios.get(API_BASE_URL + '/v1/api/popularSubServices', {
      headers: {
        authtoken: localStorage.getItem('authtoken'),
        'Content-Type': 'application/json',
      },
    });
  }
  allservices2() {
    return axios.get(API_BASE_URL + '/v1/api/allpopularseller', {
      headers: {
        authtoken: localStorage.getItem('authtoken'),
        'Content-Type': 'application/json',
      },
    });
  }
  allpopularsellerdata(index) {
    return axios.post(API_BASE_URL + '/v1/api/AllPopularSellers_new',{service_id:index},
     {
      headers: {
        authtoken: localStorage.getItem('authtoken'),
        'Content-Type': 'application/json',
      },
    });
  }
  async allservices() {
    return axios.get(API_BASE_URL + '/v1/api/all_service_subservice', {
      headers: {
        authtoken: localStorage.getItem('authtoken'),
        'Content-Type': 'application/json',
      },
    });
  }
  LoginWithOtpMobile(mobile) {
    return axios.post(
      API_BASE_URL + '/v1/api/loginwithotp',
      { mobile },
      {
        headers: {
          authtoken: localStorage.getItem('authtoken'),
        },
      }
    );
  }
  LoginWithOtpUserName(username) {
    return axios.post(
      API_BASE_URL + '/v1/api/loginwithotp',
      { username },
      {
        headers: {
          authtoken: localStorage.getItem('authtoken'),
        },
      }
    );
  }
  ConfirmOtp(otp, authtoken) {
    return axios.post(API_BASE_URL + '/v1/api/confirmotp', { otp, authtoken });
  }
  LoginWithPassWordMobile(mobile, password) {
    return axios.post(
      API_BASE_URL + '/v1/api/LoginwithPassword_new',
      {
        mobile,
        password,
      },
      {
        headers: {
          authtoken: localStorage.getItem('authtoken'),
        },
      }
    );
  }
  LoginWithPassWordUserName(username, password) {
    return axios.post(API_BASE_URL + '/v1/api/LoginwithPassword_new', {
      username,
      password,
    }
    ,  { 
      headers: {
      authtoken: localStorage.getItem('authtoken'),
    }}
    );
  }
  ForgotPasswordMobile(mobile) {
    return axios.post(API_BASE_URL + '/v1/api/forgotpass', {
      mobile,
    });
  }
  ChangePassWordForgot(authtoken, otp, new_password) {
    return axios.post(API_BASE_URL + '/v1/api/forgotnewpass', {
      authtoken,
      otp,
      new_password,
    });
  }

  RegisterUSer(f_name, l_name, mobile, refferer_code, image, IMEI) {
    return axios.post(
      API_BASE_URL + '/v1/api/signup',
      {
        f_name,
        l_name,
        mobile,
        refferer_code,
        image,
        IMEI,
      },
      {
        headers: {
          authtoken: localStorage.getItem('authtoken'),
        },
      }
    );
  }
  LogOut() {
    return axios.get(API_BASE_URL + '/v1/api/logout', {
      headers: {
        authtoken: localStorage.getItem('authtoken'),
      },
    });
  }
  ConfirmRegister(authtoken_before_register, authtoken, otp) {
    return axios.post(API_BASE_URL + '/v1/api/registerconfirm', {
      authtoken_before_register,
      authtoken,
      otp,
    });
  }
  LoginWithSocialMedia(account, account_id, email, name) {
    return axios.post(
      API_BASE_URL + '/v1/api/o_login',
      {
        account,
        account_id,
        email,
        name,
        authtoken_before_register: localStorage.getItem('authtoken'),
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
  ProfileApi() {
    return axios.post(
      API_BASE_URL + '/v1/api/profile',
      {},
      {
        headers: {
          authtoken: localStorage.getItem('authtoken'),
          'Content-Type': 'application/json',
        },
      }
    );
  }
}

export default new UserService();
