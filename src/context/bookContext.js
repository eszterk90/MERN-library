import axios from 'axios';
import React, {createContext, useContext, useEffect, useState} from 'react';
import userContext from './userContext'
import { useNavigate } from 'react-router-dom';
import baseUrl from '../config';

const BookContext = createContext();

export const BookProvider = ({children}) => {

const API = axios.create({baseUrl: baseUrl});

// API.interceptors.request.use((req) => {
//     if(localStorage.getItem("token")) {
//         console.log("Token===>",localStorage.getItem("token"))
//         req.headers.authorization = localStorage.getItem("token");
//     }
//     return req;
// });



const {currentUser} = useContext(userContext);
const [books, setBooks] = useState([]);
const [rentedBooks, setRentedBooks] = useState([]);
const [currentBook, setCurrentBook] = useState(null);

let navigate = useNavigate();

const getAllBooks = () => {
    API.get(`${baseUrl}books/all`)
    .then(data => {
        console.log('data 32', data)
        setBooks(data.data)
    })
    .catch(err => console.error(err))
}

useEffect(() => {
    if(currentUser) {
        getAllBooks()
        console.log('.....')
    }
    
}, [currentUser])

console.log('test')

const addBookItem = (bookToAdd) => {
  const filteredItem = books.find(item => item._id === bookToAdd._id);
  console.log('filtered Item', filteredItem)
  if(filteredItem) {
      filteredItem.rented_by = currentUser._id;
      API.post(`${baseUrl}books/checkout`, filteredItem)
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
        API.get(`${baseUrl}books/${currentUser._id}/shelf`)
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
        API.post(`${baseUrl}books/checkin`, filteredItem)
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

const findBook = (book) => {
    const bookId = book._id;
    API.get(`${baseUrl}books/${bookId}`)
        .then(response => {
            console.log(response.data);
            setCurrentBook(response.data);
            navigate('/')
        })
        .catch(err => console.log(err))
}


const value = {books, addBookItem, rentedBooks, removeBookItem, allYourBooks, findBooks, findBook, currentBook, setCurrentBook}

return <BookContext.Provider value={value}>{children}</BookContext.Provider>

}
export default BookContext;