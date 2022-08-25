import axios from 'axios';
import React, {createContext, useContext, useEffect, useState} from 'react';
import userContext from './userContext'
import { useNavigate } from 'react-router-dom';

const BookContext = createContext();

export const BookProvider = ({children}) => {

const {currentUser} = useContext(userContext);
const [books, setBooks] = useState([]);
const [rentedBooks, setRentedBooks] = useState([]);

let navigate = useNavigate();

const getAllBooks = () => {
    axios.get('http://localhost:5001/books/all')
    .then(data => {
        setBooks(data.data)
    })
    .catch(err => console.error(err))
}
useEffect(() => {
    getAllBooks()
}, [currentUser])


const addBookItem = (bookToAdd) => {
  const filteredItem = books.find(item => item._id === bookToAdd._id);
  console.log('filtered Item', filteredItem)
  if(filteredItem) {
      filteredItem.rented_by = currentUser._id;
      axios.post('http://localhost:5001/books/checkout', filteredItem)
        .then(res => {
            getAllBooks()
            allYourBooks()
        })
    }
   else {
       return books
   }
}

const allYourBooks = () => {
    if(currentUser) {
        axios.get(`http://localhost:5001/books/${currentUser._id}/shelf`)
        .then(res => {
            setRentedBooks(res)
        })
    }
   
}

useEffect(() => {
    allYourBooks()
}, [currentUser])



const removeBookItem = (bookToRemove) => {
    const filteredItem = rentedBooks.data.find(item => item._id === bookToRemove._id);
    console.log('filteredItem', filteredItem)
    if(filteredItem) {
        axios.post('http://localhost:5001/books/checkin', filteredItem)
            .then(res => {
                allYourBooks()
                getAllBooks()
            })
        
    }
    
}
const findBooks = (e) => {
    e.preventDefault();
    let params = e.target.value;
    console.log(params);
    if(!params) {
        setBooks(books);
        getAllBooks()
    }
    else {
        const newSearchResult = books.filter(book => book.title.toLowerCase().includes(params))
        setBooks(newSearchResult);
        navigate('/')
    }
}


const value = {books, addBookItem, rentedBooks, removeBookItem, allYourBooks, findBooks}

return <BookContext.Provider value={value}>{children}</BookContext.Provider>

}
export default BookContext;