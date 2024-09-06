import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const Header =()=>{

    const [user,setUser]=useState(null)

    useEffect(()=>{

      const auth = getAuth();
      const unsbscribe = onAuthStateChanged(auth,(currentUser)=>{
        setUser(currentUser)
      })

      return()=>unsbscribe()

    },[])

    return(
        <header>
        <div className="header-content">
          <div className="logo-container">
          <img src="/images/logo.png" className="logo" alt="Nautica Mirissa Logo" />
          <h1>NAUTICA MIRISSA</h1>
          </div>
        </div>
        <nav>
        <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/menu">Menu</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            {user?(
              <li><Link to="/admin" className="user-link">{user.displayName || "Admin"}</Link></li>
            ):(
                <li><Link to="/login" className="login-button">Login</Link></li>
              )}
          </ul>
        </nav>
      </header>
    )
}
export default Header