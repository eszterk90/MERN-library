import React, {useContext} from 'react'
import bookContext from '../../context/bookContext'
import userContext from '../../context/userContext'
import './profile.styles.scss'

function Profile() {

  const {rentedBooks, removeBookItem} = useContext(bookContext)
  const {currentUser, backToHome} = useContext(userContext)

//   <div className='title'>
//   <h3>{book.title[0].toUpperCase()+ book.title.slice(1)}</h3>
// </div>

 console.log('rented Books', rentedBooks);

  return (
    <div className='profile-container'>
        <h1>Hi {currentUser.name}!</h1>
        <p>Your bookshelf</p>
      <div className='books'>
      {rentedBooks.data ? rentedBooks.data.map((book, i) => 
        <div className='book'>
        <img src={book.smallThumbnail} alt="book cover"/>
          {book.rented_by && <button className='card-btn checkin' onClick={() => removeBookItem(book)}>Check back</button>}
        </div>) : 
        <div>
          <p>Your bookshelf is empty</p>
        </div>}
      </div>
    </div>
  )
}

export default Profile