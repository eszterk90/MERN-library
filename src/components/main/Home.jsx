import React, {useContext} from "react";
import userContext from '../../context/userContext'
import bookContext from '../../context/bookContext'
import {Link} from 'react-router-dom'
import './home.styles.scss'
import Header from "./header/Header";
function Home() {

    const {books, addBookItem, findBook} = useContext(bookContext)
    const {currentUser} = useContext(userContext);

    return(
        <>
        <Header/>
        {currentUser && 
            <div className='home-container'>
                <div className='books-container'>
                {books?.map((book, i) => 
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
                            <button className="btn card-btn" onClick={() => findBook(book)}>See this book</button>
                            {!book.rented_by ? 
                                <button className="btn card-btn" onClick={() => addBookItem(book)}>Borrow this book</button> : 
                                <span className="card-span">Not available</span>
                            }
                        </div>
                    </div>)}
                </div>
            </div>}
        </>
    )
}

export default Home;