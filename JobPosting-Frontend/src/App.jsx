import { useState, useEffect } from 'react'
import magnetoLogo from '/magneto-b2b-white.svg'
import './App.css'
import axios from "axios"

function App() {

  const [ImageData, setImageData] = useState('');

  const [prompt, setPrompt] = useState(''); 

  const [isInputEmpty, setIsInputEmpty] = useState(true);


  const HandleSubmit = async (event) => {
    event.preventDefault();

    const prompt = event.target.elements.nombre.value;
  
    if (!prompt) {
      return alert('Please enter a description for the job offer.');
    }
  
    try {
      const response = await axios.post('http://127.0.0.1:5000/ImageGenerator', {
        text: prompt,
      });
  
      const ImageData = response.data.image;

      setPrompt('');
      setImageData(ImageData);

    } catch (error) {
      console.error('Error sending request:', error);
      // Mostrar mensaje de error al usuario
    }
  };

  const HandleInputChange = (event) => {
    const inputValue = event.target.value;
    setIsInputEmpty(inputValue.trim() === '');
  };



  return (
    <>
      <div>
        <h1>Helios AI</h1>
        <a href="https://www.magneto365.com/es" target="_blank">
          <img src={magnetoLogo} className="logo" alt="Magneto logo" />
        </a>
      </div>

      <div className='resultado-prompt'>
        {ImageData && <img src={`data:image/png;base64,${ImageData}`} alt='Imagen generada' className='image' />}
      </div>

      
          <form onSubmit={HandleSubmit}> 
            <div className="panel-input">
              <div className="text-input">
                <input type="text" id="nombre" name="nombre" onChange={HandleInputChange} placeholder="Describe la oferta de empleo"/>
              </div>
              <div className='send-button'>
                <button type="submit" disabled={isInputEmpty}>
                  <svg style={{ stroke: isInputEmpty ? 'grey' : 'black' }} height="21" viewBox="0 0 21 21" width="21" xmlns="http://www.w3.org/2000/svg"><g fill="none" fillRule="evenodd" strokeLinecap="round" strokeLinejoin="round" transform="translate(3 2)"><path d="m15.5.465-8 8.033"/><path d="m10.5 16.5-3-8.002-7-2.998 15-5z"/></g></svg>
                </button>
              </div>  
            </div>
          </form>
      

      <div>
        <a href="https://dev.azure.com/jmmunozr/P2" target="_blank" className='link-azure'>
          Proyecto de azure donde estamos documentado todo nuestro proceso como equipo
        </a>
      </div>
    </>
  )
}

export default App