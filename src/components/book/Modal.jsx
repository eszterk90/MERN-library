import React from 'react'
import bookContext from '../../context/bookContext'
import { useContext, useRef } from 'react'
import { useEffect } from "react";
import Book from './Book';

function Modal() {
const {book} = useContext(bookContext);

   
        // useEffect(() => {

        //     const handleClickOutside = (e) => {
        //         if(ref.current && !ref.current.contains(e.target)){
        //             setCurrentBook(null)
        //             console.log(currentBook)
        //         }
        //     }
        // }, [ref])


  return (
    <div className='modal'>
        <Book content={book}/>
    </div>
  )
}

export default Modal