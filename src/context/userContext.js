import React, {createContext, useState, useEffect, useContext} from 'react';
import useLocalStorage from "use-local-storage";
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import baseUrl from '../config';

const UserContext = createContext();


export const UserProvider = ({children}) => {
  
    const API = axios.create({baseUrl: baseUrl});

    API.interceptors.request.use(
      req => {
        req.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
        return req;
      },
      error => {
        return Promise.reject(error);
      }
    )

    // const API = axios.create({
    //   baseUrl: baseUrl,
    //   headers: {
    //     Authorization: `Bearer ${localStorage.getItem('token')}` 
    //   }
    // })

    const [formData, setFormData] = useState({});
    const [currentUser, setCurrentUser] = useLocalStorage('currentUser', null);
    const [userName, setUserName] = useLocalStorage('userName', null);
    const [submit, setSubmit] = useState(false);
    const [message, setMessage] = useState(null)

    let navigate = useNavigate();

    const inputHandler = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    }
    
    const signIn = (e) => {
    e.preventDefault();
    const email = formData.email;
    const password = formData.password;
    const user = {email, password};
    API.post(`${baseUrl}user/login`, user, {"Access-Control-Allow-Origin": baseUrl})
    .then(response => {
        console.log('response data', response.data)
        if(response.data.accessToken) {
          console.log(response.data.accessToken)
            localStorage.setItem('token', response.data.accessToken);
            console.log(localStorage.getItem('token'))
            setCurrentUser(response.data.accessToken);
            setUserName(response.data.result);
            console.log('response data', response.data);
        }
        setMessage(response.data.message);
        setSubmit(true)
    })
    .catch(e => console.log(e));
    }


    console.log('currentUser', currentUser);
    console.log('message', message)

    const signOut = () => {
      API.get(`${baseUrl}user/logout`, {"Access-Control-Allow-Origin": baseUrl})
      .then(() => {
        setCurrentUser(null);
        navigate('/')
      })
      localStorage.clear()
    }

    const backToHome = () => {
        navigate('/');
      }


    const value = {signIn, inputHandler, signOut, currentUser, backToHome, message, userName}

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}


export default UserContext;


