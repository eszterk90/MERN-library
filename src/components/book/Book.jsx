import React, {useContext, useEffect, useState} from 'react'
import bookContext from '../../context/bookContext'
import userContext from '../../context/userContext'
import {useParams, useNavigate} from 'react-router-dom'
import baseUrl from '../../config'
import axios from 'axios'
import './book.styles.scss'


function Book() {

const {bookId} = useParams()

const {books, addBookItem, currentBook} = useContext(bookContext);
const {backToHome} = useContext(userContext);
// const [book, setBook] = useState({})

const addToProfile = () => {
  addBookItem(currentBook)
}

console.log('book', currentBook);

// useEffect(() => {
//   (()=> {
//     axios.get(baseUrl + 'books/' + bookId)
//       .then(response => setBook(response.data))
//   }) ()
// }, [])

  return (
      <div className='books-section'>
        {currentBook && <> 
          <div className='outer-container'>
            <div className='book-img'>
            <img src={currentBook.smallThumbnail}/>
          </div>
        </div>
        <div className='book-info'>
          <h3>{currentBook.title}</h3>
          <div className='book-description'>
            <p>{currentBook.description}</p>
           </div>
        <div>
          {!currentBook.rented_by ? <button className='card-btn checkin single-book-btn' onClick={addToProfile}>Borrow this book</button> : <button className='card-btn checkin single-book-btn'>Not available</button>}
        </div>
        </div>
        </>}
      </div>
  )
}

export default Book