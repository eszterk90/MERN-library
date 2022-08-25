import React, {useContext} from 'react';
import {AiOutlineCloseCircle} from 'react-icons/ai';
import bookContext from '../../../context/bookContext'

function Search({method}) {
   
const {findBooks} = useContext(bookContext);
    
    const toggleSearch = () => {
        method(false)
    }

  return (
    <form className="search-form invisible" id='search-form'>
        <input type="text" name="search" id="search" onChange={findBooks}/>
        <span id='close-btn'>
            <AiOutlineCloseCircle onClick={toggleSearch}/>
        </span>
    </form>
  )
}

export default Search