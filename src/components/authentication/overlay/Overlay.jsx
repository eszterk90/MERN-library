import React from 'react'

function Overlay() {

  const toggle = () => {
    const container = document.getElementById('container');
    container.classList.toggle('right-panel-active');
  }

  return (
    <div className='overlay-container'>
      <div className='overlay'>
        <div className='overlay-panel overlay-left'>
            <h1>Welcome Back!</h1>
            <h3>Please login to enter our fantastic universe of facts and fiction</h3>
            <button class="btn" id="signIn" onClick={toggle}>Sign In</button>
        </div>

        <div className='overlay-panel overlay-right'>
            <h1>Hello, Fellow Book Lover!</h1>
            <h3>Enter your personal details and start reading</h3>
            <button class="btn" id="signUp" onClick={toggle}>Sign Up</button>
        </div>

      </div>
    </div>

  )
}

export default Overlay