import React from 'react'
import magnetoLogo from "/magneto-b2b-white.svg";
import "./App.css";

function Header() {
  return (
    <>
        <h1>Helios AI</h1>
        <a href="https://www.magneto365.com/es" target="_blank">
          <img src={magnetoLogo} className="logo" alt="Magneto logo" />
        </a>
      </>
  )
}

export default Header