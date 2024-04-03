import { useState, useEffect } from 'react'
import magnetoLogo from '/magneto-b2b-white.svg'
import esfinge from '/Esfinge.jpg'
import './App.css'
import axios from "axios"

function App() {
  const [count, setCount] = useState(0)

  const fetchAPI= async () => {
    const response = await axios.get("LINK DEL SERVER BACKEND")
  }

  const PromptInput = {}

  return (
    <>
      <div>
        <h1>Helios AI</h1>
        <a href="https://www.magneto365.com/es" target="_blank">
          <img src={magnetoLogo} className="logo" alt="Magneto logo" />
        </a>
      </div>

      <div className='resultado-prompt'>
        <img src={esfinge} alt='Imagen generada' className='image'/>
      </div>

      <div className="panel-input">
        <div className="text-input">
          <input type="text" id="nombre" name="nombre" placeholder="Describe la oferta de empleo"  />
        </div>
        <div className='send-button'>
          <button>
            <svg height="21" viewBox="0 0 21 21" width="21" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd" stroke="black" stroke-linecap="round" stroke-linejoin="round" transform="translate(3 2)"><path d="m15.5.465-8 8.033"/><path d="m10.5 16.5-3-8.002-7-2.998 15-5z"/></g></svg>
          </button>
        </div>
      </div>

      <div>
        <a href="https://dev.azure.com/jmmunozr/P2" target="_blank" className='link-azure'>
          Proyecto de azure donde estamos documentado todo nuestro proceso como equipo
        </a>
      </div>
    </>
  )
}

export default App
