import axios from 'axios';
import React, {createContext, useContext, useEffect, useState} from 'react';
import userContext from './userContext'
import { useNavigate } from 'react-router-dom';
import baseUrl from '../config';

const BookContext = createContext();

export const BookProvider = ({children}) => {

 
const API = axios.create({baseUrl: baseUrl});

    API.interceptors.request.use(
      req => {
        req.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
        return req;
      },
      error => {
        return Promise.reject(error);
      }
    )


const {currentUser} = useContext(userContext);
const [books, setBooks] = useState([]);
const [rentedBooks, setRentedBooks] = useState([]);
const [currentBook, setCurrentBook] = useState(null);

let navigate = useNavigate();

const getAllBooks = () => {
    API.get(`${baseUrl}books/all`, {"Access-Control-Allow-Origin": baseUrl})
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
    //   filteredItem.rented_by = currentUser._id;
      API.post(`${baseUrl}books/checkout`, filteredItem, {"Access-Control-Allow-Origin": baseUrl})
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
        API.get(`${baseUrl}books/${currentUser}/shelf`, {"Access-Control-Allow-Origin": baseUrl})
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
        API.post(`${baseUrl}books/checkin`, filteredItem, {"Access-Control-Allow-Origin": baseUrl})
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
    API.get(`${baseUrl}books/${bookId}`, {"Access-Control-Allow-Origin": baseUrl})
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