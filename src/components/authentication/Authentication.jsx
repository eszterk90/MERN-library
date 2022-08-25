import React from "react";
import Login from "./Login";
import Overlay from "./overlay/Overlay";
import Registration from './Registration';

function Authentication() {
    // axios.post('http:/localhost:5000/user/add', {username, email, password})

    return (
        <div className="authentication">
            {/* <h1>Welcome to the library</h1> */}
            <div className="container right-panel-active" id="container">
                <Overlay/>
                <Login/>
                <Registration/>
            </div>
        </div>
    )
}

export default Authentication;