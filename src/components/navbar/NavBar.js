import React, {useContext, useState} from 'react'
import userContext from '../../context/userContext'
import './navbar.styles.scss';
import Search from '../main/search/Search';
import {FiSearch} from 'react-icons/fi';
import {GrLogout} from 'react-icons/gr';
import {CgHome} from 'react-icons/cg'
import {VscLibrary} from 'react-icons/vsc';
import {Link, useLocation} from 'react-router-dom';

function NavBar() {
    const [displaySearch, setDisplaySearch] = useState(false);
    const {signOut} = useContext(userContext);
    const toggleSearch = () => {
      setDisplaySearch(!displaySearch)
    }
    let location = useLocation();
    // console.log(location.pathname)
    
  return (
    <div className="nav">
        {displaySearch && <Search method={setDisplaySearch}/>}
        <div className='navbar-border'>
        </div>
        <div className='navbar-border-center'></div>
        <nav className="navbar-container">
          <div class="nav-links" id="search-btn" onClick={toggleSearch}>
              <FiSearch/>
            </div>
            {location.pathname === '/' ? (
              <div class="nav-links">
              <Link to='/profile'><VscLibrary/></Link>
            </div>
            ) : (
              <div class="nav-links">
              <Link to='/'><CgHome/></Link>
            </div>
            )}
            <div class="nav-links"onClick={signOut}>
              <GrLogout/>
          </div>
        </nav>
    </div>
  )
}

export default NavBar