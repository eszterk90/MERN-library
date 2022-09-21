import React, {createContext, useState, useEffect, useContext} from 'react';
import useLocalStorage from "use-local-storage";
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import baseUrl from '../config';

const UserContext = createContext();


export const UserProvider = ({children}) => {
  
    const API = axios.create({baseUrl: baseUrl});

    const [formData, setFormData] = useState({});
    const [currentUser, setCurrentUser] = useLocalStorage('currentUser', null);
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
    API.post(`${baseUrl}user/login`, user)
    .then(response => {
        console.log('response data', response.data)
        if(response.data.result) {
            setCurrentUser(response.data.result);
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
      API.get(`${baseUrl}user/logout`)
      .then(() => {
        setCurrentUser(null);
        navigate('/')
      })
    }

    const backToHome = () => {
        navigate('/');
      }


    const value = {signIn, inputHandler, signOut, currentUser, backToHome, message}

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}


export default UserContext;


