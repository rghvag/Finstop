import axios from 'axios';


class AccountService {
  UserSignUp(name, password, phone_no, email) {
    return axios.post(
      '/users',
      {
        email,
        name,
        password,
        phone_no,
      },
      {
        headers: {
          'content-type': 'application/json',
        },
      }
    );
  }

  UserLogin(email,password) {
    return axios.post(
      '/users/login',
      {
        email,
        password,
      },
      {
        headers: {
          'content-type': 'application/json',
        },
      }
    );
  }
  LogOut()
  {
    return axios.post('/users/logout',{},{headers:{
      Authorization : `Bearer ${localStorage.getItem('authtoken')}`
    }});
  }
  SubmitScore(score)
  {
    return axios.patch(
      '/users/updateScore',
      { score },
      {
        headers: {
          authorization: `Bearer ${localStorage.getItem('authtoken')}`,
        },
      }
    );
  }
  SendSchemePara(gender)
  {
    return axios.post(
      '/users/scheme',
      {gender},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authtoken')}`,
        },
      }
    );
  }
  MakeTrans(amount)
  {
    return axios.post(
      '/transaction/add-transaction',
      { amount },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authtoken')}`,
        },
      }
    );
  }
  GetCIBIL()
  {
     return axios.post(
       '/users/user-transactions',
       { },
       {
         headers: {
           Authorization: `Bearer ${localStorage.getItem('authtoken')}`,
         },
       }
     );
  }
}
export default new AccountService();
