import { useState, useEffect } from "react";
import magnetoLogo from "/magneto-b2b-white.svg";
import "./App.css";
import axios from "axios";
import loadingGif from "/Infinity-loading.gif"; // Import your loading GIF

function App() {
  const [ImageData, setImageData] = useState("");
  const [ImageData1, setImageData1] = useState("");

  // eslint-disable-next-line no-unused-vars
  const [prompt, setPrompt] = useState("");

  const [isInputEmpty, setIsInputEmpty] = useState(true);

  const [isLoading, setIsLoading] = useState(false);

  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    if (ImageData) {
      setIsLoading(false);
    }
  }, [ImageData]);

  const HandleSubmit = async (event) => {
    event.preventDefault();

    const prompt = event.target.elements.nombre.value;

    if (!prompt) {
      return alert("Please enter a description for the job offer."); // Normalmente no se mostraría este error
    }

    setIsLoading(true); // Set loading indicator to true before request

    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/ImageGenerator",
        {
          text: prompt,
        }
      );

      const ImageData = response.data.image;
      const ImageData1 = response.data.image1;

      setPrompt("");
      setImageData(ImageData);
      setImageData1(ImageData1);
    } catch (error) {
      console.error("Error sending request:", error);
      // Mostrar mensaje de error al usuario
    }
  };

  // Botón dinámico cuando hay cambios en el input
  const HandleInputChange = (event) => {
    const inputValue = event.target.value;
    setIsInputEmpty(inputValue.trim() === "");
  };

  const handleImageClick = (image) => {
    setSelectedImage(image); // Set clicked image data
  };

  useEffect(() => {
    if (selectedImage) {
      // Show modal with selected image
      const modal = document.getElementById("modal");
      modal.style.display = "block"; // Show modal
      // const modalImage = document.getElementById("modal-image");
      // modalImage.src = selectedImage; // Set image source for modal
    } else {
      // Hide modal if no image selected
      const modal = document.getElementById("modal");
      modal.style.display = "none";
    }
  }, [selectedImage]);

  const closeModal = () => {
    setSelectedImage(null); // Clear selected image
  };

  return (
    <>
      <div>
        <h1>Helios AI</h1>
        <a href="https://www.magneto365.com/es" target="_blank">
          <img src={magnetoLogo} className="logo" alt="Magneto logo" />
        </a>
      </div>

      <div className="resultado-prompt">
        <div className="Imagen-0">
          {ImageData && !isLoading && !selectedImage && (
            <img
              src={`data:image/png;base64,${ImageData}`}
              alt="Imagen generada"
              className="image"
              onClick={() => handleImageClick(ImageData)} // Add onClick handler
            />
          )}
        </div>

        <div className="Imagen-1">
          {ImageData1 && !isLoading && !selectedImage && (
            <img
              src={`data:image/png;base64,${ImageData1}`}
              alt="Imagen generada1"
              className="image"
              onClick={() => handleImageClick(ImageData1)} // Add onClick handler
            />
          )}
        </div>
      </div>
      {/* GIF DE CARGA */}
      {isLoading && (
        <img src={loadingGif} alt="Loading..." className="loading-gif" />
      )}

      {/* Modal (hidden by default) */}
      <div className="modal-content" id="modal" style={{ display: "none" }}>
        <div>
          <img
            id="modal-image"
            src={`data:image/png;base64,${selectedImage}`}
            alt="Selected Image"
          />
        </div>
        <div className="close-modal">
          <button onClick={closeModal}>X</button>
        </div>
      </div>

      <form onSubmit={HandleSubmit}>
        <div className="panel-input">
          <div className="text-input">
            <input
              type="text"
              id="nombre"
              name="nombre"
              onChange={HandleInputChange}
              placeholder="Describe la oferta de empleo"
            />
          </div>
          <div className="send-button">
            <button type="submit" disabled={isInputEmpty}>
              <svg
                style={{ stroke: isInputEmpty ? "grey" : "black" }}
                height="21"
                viewBox="0 0 21 21"
                width="21"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g
                  fill="none"
                  fillRule="evenodd"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  transform="translate(3 2)"
                >
                  <path d="m15.5.465-8 8.033" />
                  <path d="m10.5 16.5-3-8.002-7-2.998 15-5z" />
                </g>
              </svg>
            </button>
          </div>
        </div>
      </form>

      <div>
        <p>
          ¡Entre más especifica sea la instrucción mejor será el resultado!{" "}
          <br></br>
          Procura dar detalles especificos que quieras que salgan en la imagen.
        </p>
      </div>

      <div>
        <a
          href="https://dev.azure.com/jmmunozr/P2"
          target="_blank"
          className="link-azure"
        >
          Proyecto de azure donde estamos documentado todo nuestro proceso como
          equipo
        </a>
      </div>
    </>
  );
}

export default App;
