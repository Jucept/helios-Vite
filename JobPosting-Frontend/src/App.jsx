import { useState, useEffect } from 'react'
import magnetoLogo from '/magnetoLogoNobg.png'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://www.magneto365.com/es" target="_blank">
          <img src={magnetoLogo} className="logo" alt="Magneto logo" />
        </a>
      </div>

      <h1>Helios AI</h1>

      {/* <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div> */}

      <a href="https://dev.azure.com/jmmunozr/P2" target="_blank" className='link-azure'>
        Proyecto de azure estamos documentado todo nuestro proceso como equipo
      </a>
    </>
  )
}

export default App
