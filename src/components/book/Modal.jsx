import React, {useContext, useState} from 'react'
import BookContext from '../../context/bookContext'
import Book from './Book'
import './modal.styles.scss'


function Modal() {

const [isOpen, setIsOpen] = useState(true);

const closeModal = () => {
    setIsOpen(false)
    setCurrentBook(null)
}

const {currentBook, setCurrentBook} = useContext(BookContext);
  return (
    <>
    {isOpen && <div className='modal' onClick={closeModal}>
        <Book book={currentBook} onClick={e => e.stopPropagation()}/>
    </div>}
    </>
  )
}

export default Modal