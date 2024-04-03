import { useState, useEffect } from 'react'
import magnetoLogo from '/magneto-b2b-white.svg'
import './App.css'
import axios from "axios"

function App() {

  const [ImageURL, setImageURL] = useState('');
  const [prompt, setPrompt] = useState(''); // State to store user input

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
      const decodedImageData = atob(ImageData);
      const ImageURL = URL.createObjectURL(new Blob([decodedImageData]));
  
      // Actualizar el estado para incluir la URL de la imagen
      setPrompt('');
      setImageURL(ImageURL);
      
    } catch (error) {
      console.error('Error sending request:', error);
      // Mostrar mensaje de error al usuario
    }
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
        {ImageURL && <img src={ImageURL} alt='Imagen generada' className='image' />}
      </div>

      <div className="panel-input">
        <div className="text-input">
          <form onSubmit={HandleSubmit}> 
            <input type="text" id="nombre" name="nombre" placeholder="Describe la oferta de empleo"/>
          </form>
        </div>
        <div className='send-button'>
          <button type="submit">
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
