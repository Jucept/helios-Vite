import { useState, useEffect } from "react";
import magnetoLogo from "/magneto-b2b-white.svg";
import "./App.css";
import axios from "axios";
import loadingGif from "/Infinity-loading.gif";
import FilerobotImageEditor, {
  TABS,
  TOOLS,
} from "react-filerobot-image-editor";
// eslint-disable-next-line no-unused-vars
import esfinge from "/Esfinge.jpg";

function App() {
  const [ImageData, setImageData] = useState("");
  const [ImageData1, setImageData1] = useState("");

  // eslint-disable-next-line no-unused-vars
  const [prompt, setPrompt] = useState("");

  const [isInputEmpty, setIsInputEmpty] = useState(true);

  const [isLoading, setIsLoading] = useState(false);

  const [selectedImage, setSelectedImage] = useState(null);

  const [isImgEditorShown, setIsImgEditorShown] = useState(false);

  useEffect(() => {
    if (ImageData) {
      setIsLoading(false);
    }
  }, [ImageData]);

  const HandleSubmit = async (event) => {
    event.preventDefault();

    const prompt = event.target.elements.nombre.value;

    if (!prompt) {
      return alert("Porfavor ingresa una oferta de empleo."); // Normalmente no se mostraría este error
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

  const openImgEditor = () => {
    setIsImgEditorShown(true);
  };

  const closeImgEditor = () => {
    setIsImgEditorShown(false);
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
        {/* 
        // Imagen para pruebas
        <div className="Imagen-01">
          <img
            src={esfinge}
            alt="Imagen generada"
            className="image"
            onClick={() => handleImageClick(esfinge)} // Add onClick handler
          />
        </div> */}

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
        <div className="tools">
          <div className="close-modal">
            <button onClick={closeModal}>X</button>
          </div>
          <div className="edit-image">
            <button onClick={openImgEditor}>Editar</button>
          </div>
        </div>

        <div className="editor">
          {isImgEditorShown && (
            <FilerobotImageEditor
              source={`data:image/png;base64,${selectedImage}`}
              onSave={(editedImageObject, designState) =>
                console.log("saved", editedImageObject, designState)
              }
              defaultSavedImageName={prompt}
              onClose={closeImgEditor}
              annotationsCommon={{
                fill: "#ff0000",
              }}
              Text={{ text: "Magento..." }}
              Rotate={{ angle: 90, componentType: "slider" }}
              Crop={{
                presetsItems: [
                  {
                    titleKey: "classicTv",
                    descriptionKey: "4:3",
                    ratio: 4 / 3,
                    // icon: CropClassicTv, // optional, CropClassicTv is a React Function component. Possible (React Function component, string or HTML Element)
                  },
                  {
                    titleKey: "cinemascope",
                    descriptionKey: "21:9",
                    ratio: 21 / 9,
                    // icon: CropCinemaScope, // optional, CropCinemaScope is a React Function component.  Possible (React Function component, string or HTML Element)
                  },
                ],
                presetsFolders: [
                  {
                    titleKey: "socialMedia", // will be translated into Social Media as backend contains this translation key
                    // icon: Social, // optional, Social is a React Function component. Possible (React Function component, string or HTML Element)
                    groups: [
                      // MARK: Facebook
                      {
                        titleKey: "Facebook",
                        items: [
                          {
                            titleKey: "Foto de perfil",
                            width: 170,
                            height: 170,
                            descriptionKey: "170x170px",
                          },
                          {
                            titleKey: "Foto de portada",
                            width: 815,
                            height: 315,
                            descriptionKey: "815x315px",
                          },
                          {
                            titleKey: "Retrato",
                            width: 1080,
                            height: 1350,
                            descriptionKey: "1080x1350px",
                          },
                          {
                            titleKey: "Paisaje",
                            width: 1200,
                            height: 630,
                            descriptionKey: "1200x630px",
                          },
                          {
                            titleKey: "Cuadrado",
                            width: 1200,
                            height: 1200,
                            descriptionKey: "1200x1200px",
                          },
                          {
                            titleKey: "Historia/Reels",
                            width: 1080,
                            height: 1920,
                            descriptionKey: "1080x1920px",
                          },
                        ],
                      },
                      // MARK: Instagram
                      {
                        titleKey: "Instagram",
                        items: [
                          {
                            titleKey: "Foto de Perfil",
                            width: 320,
                            height: 320,
                            descriptionKey: "320x320px",
                          },
                          {
                            titleKey: "Retrato",
                            width: 1080,
                            height: 1350,
                            descriptionKey: "1080x1350px",
                          },
                          {
                            titleKey: "Paisaje (Feed, Anuncio)",
                            width: 1080,
                            height: 1350,
                            descriptionKey: "1080x1350px",
                          },
                          {
                            titleKey: "Cuadrado",
                            width: 1080,
                            height: 1080,
                            descriptionKey: "1080x1080px",
                          },
                          {
                            titleKey: "Historia/Reels",
                            width: 1080,
                            height: 1920,
                            descriptionKey: "1080x1920px",
                          },
                        ],
                      },
                      // MARK: Twitter
                      {
                        titleKey: "Twitter",
                        items: [
                          {
                            titleKey: "Foto de Perfil",
                            width: 400,
                            height: 400,
                            descriptionKey: "400x400px",
                          },
                          {
                            titleKey: "Foto de Portada",
                            width: 1500,
                            height: 500,
                            descriptionKey: "1500x500px",
                          },
                          {
                            titleKey: "Retrato",
                            width: 1080,
                            height: 1350,
                            descriptionKey: "1080x1350px",
                          },
                          {
                            titleKey: "Paisaje",
                            width: 1600,
                            height: 900,
                            descriptionKey: "1600x900px",
                          },
                          {
                            titleKey: "Cuadrado",
                            width: 1080,
                            height: 1080,
                            descriptionKey: "1080x1080px",
                          },
                        ],
                      },
                      // MARK: LinkedIn
                      {
                        titleKey: "LinkedIn",
                        items: [
                          {
                            titleKey: "Foto de Perfil",
                            width: 400,
                            height: 400,
                            descriptionKey: "400x400px",
                          },
                          {
                            titleKey: "Foto de Portada",
                            width: 1128,
                            height: 191,
                            descriptionKey: "1128x191px",
                          },
                          {
                            titleKey: "Retrato",
                            width: 627,
                            height: 1200,
                            descriptionKey: "627x1200px",
                          },
                          {
                            titleKey: "Paisaje",
                            width: 1200,
                            height: 627,
                            descriptionKey: "1200x627px",
                          },
                          {
                            titleKey: "Cuadrado",
                            width: 1080,
                            height: 1080,
                            descriptionKey: "1080x1080px",
                          },
                        ],
                      },
                      // MARK: TikTok
                      {
                        titleKey: "TikTok",
                        items: [
                          {
                            titleKey: "Foto de Perfil",
                            width: 200,
                            height: 200,
                            descriptionKey: "200x200px",
                          },
                          {
                            titleKey: "Retrato",
                            width: 1080,
                            height: 1920,
                            descriptionKey: "1080x1920px",
                          },
                          {
                            titleKey: "Paisaje",
                            width: 1920,
                            height: 1080,
                            descriptionKey: "1920x1080px",
                          },
                          {
                            titleKey: "Cuadrado",
                            width: 1080,
                            height: 1080,
                            descriptionKey: "1080x1080px",
                          },
                          {
                            titleKey: "Historias",
                            width: 1080,
                            height: 1920,
                            descriptionKey: "1080x1920px",
                          },
                        ],
                      },
                    ],
                  },
                ],
              }}
              Watermark={{
                gallery: [magnetoLogo],
              }}
              tabsIds={[
                TABS.ADJUST,
                TABS.ANNOTATE,
                TABS.WATERMARK,
                TABS.FILTERS,
                TABS.FINETUNE,
                TABS.RESIZE,
              ]} // or {['Adjust', 'Annotate', 'Watermark']}
              defaultTabId={TABS.ANNOTATE} // or 'Annotate'
              defaultToolId={TOOLS.TEXT} // or 'Text'
            />
          )}
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
