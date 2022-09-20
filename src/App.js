import React, { useContext } from 'react';
import {Route, Routes} from 'react-router-dom';
import Home from './components/main/Home';
import Authentication from './components/authentication/Authentication';
import Book from './components/book/Book'
import Profile from './components/profile/Profile'
import UserContext from './context/userContext';
import BookContext from './context/bookContext';
import NavBar from './components/navbar/NavBar';
import Verify from './components/authentication/Verify'
import Modal from './components/book/Modal'



function App() {
  const { currentUser } = useContext(UserContext);
  const {currentBook} = useContext(BookContext);
 

  return (
    <div className="App">
      <Routes>
      {currentUser !== null ? (
        <Route path='/' element={<Home/>} />
        )
        : (
        <Route path='/' element={<Authentication />} />
        )}
        {/*<Route path='/:bookId' element={<Book />} /> */}
        <Route path='/profile' element={<Profile />} />
        <Route path='/verify?authId=authId&secretKey=secretKey' element={<Verify/>} />
        {/*<Route path='*' element={<Navigate to='/' />} />*/}
      </Routes>
      {currentUser && <NavBar/>}
      {currentBook && <Modal/>}
    </div>
  );
}

export default App;
