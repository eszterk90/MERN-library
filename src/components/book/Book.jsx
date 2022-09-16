import React, {useContext, useEffect, useState} from 'react'
import bookContext from '../../context/bookContext'
import userContext from '../../context/userContext'
import {useParams, useNavigate} from 'react-router-dom'
import baseUrl from '../../config'
import axios from 'axios'
import './book.styles.scss'


function Book() {

const {bookId} = useParams()

const {books, addBookItem} = useContext(bookContext);
const {backToHome} = useContext(userContext);
const [book, setBook] = useState({})

const addToProfile = () => {
  addBookItem(book)
}

console.log('book', book);

useEffect(() => {
  (()=> {
    axios.get(baseUrl + 'books/' + bookId)
      .then(response => setBook(response.data))
  }) ()
}, [])

  return (
      <div className='books-section'>
        {book && <> 
          <div className='outer-container'>
            <div className='book-img'>
            <img src={book.smallThumbnail}/>
          </div>
        </div>
        <div className='book-info'>
          <div>
          <h3>{book.title}</h3>
          <p>{book.description}</p>
        </div>
        <div>
          {!book.rented_by ? <button className='card-btn checkin single-book-btn' onClick={addToProfile}>Borrow this book</button> : <button className='card-btn checkin single-book-btn'>Not available</button>}
        </div>
        </div>
        </>}
      </div>
  )
}

export default Book