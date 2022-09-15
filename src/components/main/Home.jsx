import React, {useContext} from "react";
import userContext from '../../context/userContext'
import bookContext from '../../context/bookContext'
import {Link} from 'react-router-dom'
import './home.styles.scss'
import Header from "./header/Header";
import Modal from "../book/Modal";

function Home() {

    const {books, addBookItem, currentBook, setCurrentBook} = useContext(bookContext)
    const {currentUser} = useContext(userContext);
    
  

    return(
        <>
        <Header/>
        {currentUser && 
            <div className='home-container'>
                {/* <h1>All books</h1> */}
                {/* <Search/> */}
                <div className='books-container'>
                    {books.map((book, i) => 
                        <div className='book-container' key={book.id}>
                            <div className="book-card-content">
                                <img src={book.smallThumbnail} alt="book cover"/>
                                <div className="book-card-info">
                                    <div className='title'>
                                        <h3>{book.title[0].toUpperCase()+ book.title.slice(1)}</h3>
                                    </div>
                                    <div className="subtitle">
                                        <h4>{book.subtitle}</h4>
                                    </div>
                                    <div className="author">
                                        <p>by {book.authors.map((name, i) => i > 0 && i < book.authors.length ? name + ", " : name)}</p>
                                    </div>
                                </div>   
                            </div>
                            
                            <div>
                                <Link to={`/`} onClick={() => {setCurrentBook(book)}}><button className="btn card-btn">See this book</button></Link>
                                {!book.rented_by ? 
                                    <button className="btn card-btn" onClick={() => addBookItem(book)}>Borrow this book</button> : 
                                    <span className="card-span">Not available</span>
                                }
                            </div>
                         
                        </div>)}
                </div>
            </div>}
            {currentBook && <Modal/>}
        </>
    )
}

export default Home;