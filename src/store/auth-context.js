import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

const AuthContext = React.createContext({
  token: "",
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
  profile: {},
  profileHandler: () => {}
});


export const AuthContextProvider = (props) => {
  const initialToken = localStorage.getItem('token');
  const [token, setToken] = useState(initialToken);
  const initialProfile = localStorage.getItem('profile');
  const [profile, setProfile] = useState(initialProfile || {});

  const userIsLoggedIn = !!token;
  const history = useHistory();


  useEffect(() => {
    axios.get('https://itravel-yymm.herokuapp.com/auth/getProfile', {
      headers : {
        'Authorization': `bearer ${token}`
      }
    })
        .then (response => {
          setProfile(response.data);
        })
        .catch (err => {
          if (err.response.data.status == 401 || err.response.data.message === "jwt expired"){
            //history.push("/login");
            //navigate('/login');// react router 6 
           logoutHandler();
          }
        })
  }, []) 

  const logoutHandler = () => {
    setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('profile');
  };

  const loginHandler = (token, profile) => {
    setToken(token);
    localStorage.setItem('token', token);
    localStorage.setItem('profile', profile);
  };

  const profileHandler = (data) => {
    setProfile(data);
  }

  const contextValue = {
    token: token,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
    profile,
    profileHandler
  };
  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;





