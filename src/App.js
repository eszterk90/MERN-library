import React, { useContext } from 'react';
import {Route, Routes} from 'react-router-dom';
import Home from './components/main/Home';
import Authentication from './components/authentication/Authentication';
import Modal from './components/book/Book'
import Profile from './components/profile/Profile'
import UserContext from './context/userContext';
import NavBar from './components/navbar/NavBar';
import Verify from './components/authentication/Verify'



function App() {
  const { currentUser } = useContext(UserContext);
 

  return (
    <div className="App">
      <Routes>
      {currentUser !== null ? (
        <Route path='/' element={<Home/>} />
        )
        : (
        <Route path='/' element={<Authentication />} />
        )}
        <Route path='/profile' element={<Profile />} />
        <Route path='/verify?authId=authId&secretKey=secretKey' element={<Verify/>} />
        {/*<Route path='*' element={<Navigate to='/' />} />*/}
      </Routes>
      {currentUser && <NavBar/>}
    </div>
  );
}

export default App;
