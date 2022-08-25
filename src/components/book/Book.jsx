import React, {useContext, useEffect, useState} from 'react'
import bookContext from '../../context/bookContext'
import userContext from '../../context/userContext'
import {useParams, useNavigate} from 'react-router-dom'
import baseUrl from '../../config'
import axios from 'axios'


function Book() {

const {bookId} = useParams()

const {books, addBookItem} = useContext(bookContext);
const {backToHome} = useContext(userContext);
const [book, setBook] = useState({})

const addToProfile = () => {
  addBookItem(book)
}

useEffect(() => {
  (()=> {
    axios.get(baseUrl + 'books/' + bookId)
      .then(response => setBook(response.data))
  }) ()
}, [])

  return (
    <div className='profile-container'>
      <div className='books'>
        {book && <> 
          <div className='book'>
          {!book.rented_by ? <button className='card-btn checkin' onClick={addToProfile}>Add to cart</button> : <span>Not available</span>}
          <button onClick={backToHome}>Go Home</button>
          <img src={book.imageUrl}/>
        </div>
        <div className='book-info'>
          {/*<h3>{book.title[0].toUpperCase()+ book.title.slice(1)}</h3>*/}
          <h4>{book.author}</h4>
          <p>pages: {book.pages}</p>
        </div>
        </>}
      </div>
    </div>
  )
}

export default Book