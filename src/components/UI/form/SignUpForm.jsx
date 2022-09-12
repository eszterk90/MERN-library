import React, {useState} from "react";
import axios from 'axios';
import Message from './message/Message';
import baseUrl from '../../../config';
const {formatInput} = require('../../../context/userContext')

function SignUpForm () {
    const [message, setMessage] = useState(null);
    const [formData, setFormData] = useState({})
    const [submit, setSubmit] = useState(false);
    const [email, setEmail] = useState({value: '', error: false})

    
      const inputHandler = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
      }
      
      const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    
      const validEmail = (e) => {
        const value = e.target.value.trim().toLowerCase();
        const isValid = 
        setEmail({value})
        
      }
    
      const createUser = (e) => {
        e.preventDefault();
        axios.post(`${baseUrl}user/add`, formData)
      .then(response => {
        //console.log(response);
        if((typeof response.data) === 'string'){
          setMessage(response.data);
        }else {
          console.log(response)
          response.data.map(msg=>setMessage(msg))
        }
        setSubmit(true);
      })
      .catch(e => console.log(e));
      }
      
    return (
        <>
          <form onSubmit={createUser}>
          <Message content={message} className='signup-message'/>
            <h3>Create Account</h3>
            <label htmlFor="name">Name</label>
            <input type="text" name="name" id="name" onChange={inputHandler} spellcheck="false"/>
            <label htmlFor="email">Email</label>
            <input type="email" name="email" id="email" onChange={inputHandler} spellcheck="false"/>
            <label htmlFor="password">Password</label>
            <input type="password" name="password" id="password" onChange={inputHandler} spellcheck="false"/>
            <button className="btn form-btn" type="submit">sign up</button>
          </form>
          {submit && <span>{message}</span>}
        </>
        
    )
}

export default SignUpForm;