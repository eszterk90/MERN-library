import React, { useContext } from 'react';
import {Route, Routes} from 'react-router-dom';
import Home from './components/main/Home';
import Authentication from './components/authentication/Authentication';
import Book from './components/book/Book'
import Profile from './components/profile/Profile'
import UserContext from './context/userContext';
import NavBar from './components/navbar/NavBar';



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
        <Route path='/:bookId' element={<Book />} /> 
        <Route path='/profile' element={<Profile />} />
        {/*<Route path='*' element={<Navigate to='/' />} />*/}
      </Routes>
      {currentUser && <NavBar/>}
    </div>
  );
}

export default App;
