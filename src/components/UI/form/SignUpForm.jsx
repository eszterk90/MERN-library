import React, {useState} from "react";
import axios from 'axios';
import Message from './message/Message';
import baseUrl from '../../../config';

function SignUpForm () {
    const [message, setMessage] = useState(null);
    const [formData, setFormData] = useState({})
    const [submit, setSubmit] = useState(false);

    // const getMessageFromServer = () => {
    //     axios.get('http://localhost:5001/', {headers: {"Access-Control-Allow-Origin": true}} )
    //     .then(result => setMessage(result))
    //     .catch()
    //   }
    
      const inputHandler = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
      }
    
      const createUser = (e) => {
        e.preventDefault();
        axios.post(`${baseUrl}user/add`, formData)
      .then(response => {
        console.log(response.data);
        setMessage(response.data);
        setSubmit(true);
      })
      .catch(e => console.log(e));
      }
      
    return (
        <>
          <form onSubmit={createUser}>
          <Message content={message}/>
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