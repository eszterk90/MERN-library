import React, {useContext} from "react";
import userContext from '../../context/userContext'
import bookContext from '../../context/bookContext'
import {Link} from 'react-router-dom'
import './home.styles.scss'
import Header from "./header/Header";
function Home() {

    const {searchResult, books, addBookItem} = useContext(bookContext)
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
                            
                                <img src={book.smallThumbnail} alt="book cover"/>
                        
                            {/*<div className='title'>
                                <h3>{book.title[0].toUpperCase()+ book.title.slice(1)}</h3>
                    </div>*/}
                            
                            <div>
                                <Link to={`/${book._id}`}><button className="btn card-btn" onClick={() => {}}>See this book</button></Link>
                                {!book.rented_by ? 
                                    <button className="btn card-btn" onClick={() => addBookItem(book)}>Borrow this book</button> : 
                                    <span>Not available</span>
                                }
                            </div>
                        </div>)}
                </div>
            </div>}
        </>
    )
}

export default Home;