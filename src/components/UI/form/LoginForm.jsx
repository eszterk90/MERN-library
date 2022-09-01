import React, {useContext} from 'react'
import userContext from '../../../context/userContext';
import Message from './message/Message';


function LoginForm() {
    const {signIn, inputHandler, message} = useContext(userContext);

   return (
        <>
            <form onSubmit={signIn}>
            <Message content={message} className="login-message"/>
                <h3>Login here</h3>
                <label htmlFor="email">Email</label>
                <input type="email" name="email" id="email" onChange={inputHandler} spellcheck="false"/>
                <label htmlFor="password">Password</label>
                <input type="password" name="password" id="password" onChange={inputHandler} spellcheck="false"/>
                <button className='btn form-btn' type="submit">Sign in</button>
            </form>
        </>
        
    )
}

export default LoginForm