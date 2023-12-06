import axios from "axios";
import React, { useState } from "react";
import Check from "../../assets/Check";
import Failed from "../../assets/Failed";

const PopupInput = () => {
  const [inputValue, setInputValue] = useState();
  const [stepper, setStepper] = useState(1);
  const handleSendEmail = () => {
    setStepper(2);
    axios
      .post(
        `http://localhost:3001/api/nodeMailer/recoverEmailPassword/${inputValue}`
      )
      .then((resp) => {
        setStepper(3);
      })
      .catch((error) => {
        setStepper(4);
      });
  };
  return (
    <div className="div-popupI-container inactive-pi">
      <div className="div-popupI-content-container">
        <div
          className="div-popupI-content"
          id={stepper === 1 ? `show` : `hide`}
        >
          <h1>Ingrese su mail</h1>
          <p>
            Le enviaremos un correo con un link para recuperar su contraseña
          </p>
          <input
            type="text"
            placeholder="email@email.com"
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button className="button-send-email" onClick={handleSendEmail}>
            Enviar
          </button>
        </div>
        <div
          className="div-popupI-content"
          id={stepper === 2 ? `show` : `hide`}
          style={{ gap: "8vh" }}
        >
          <div className="title-loader">
            <h1>Enviando mail...</h1>
          </div>
          <div>
            <div class="loader"></div>
          </div>
        </div>
        <div
          className="div-popupI-content"
          id={stepper === 3 ? `show` : `hide`}
          style={{ gap: "3vh" }}
        >
          <div className="check-container">
            <Check />
          </div>
          <div>
            <h1>Email enviado</h1>
          </div>
          <button
            className="button-send-email"
            onClick={() => window.location.reload()}
          >
            Continuar
          </button>
        </div>
        <div
          className="div-popupI-content"
          id={stepper === 4 ? `show` : `hide`}
          style={{ gap: "3vh" }}
        >
          <div className="check-container">
            <Failed />
          </div>
          <div>
            <h1 style={{ marginTop: "-10px" }}>Ocurrio un error</h1>
            <p>Intenta nuevamente</p>
            <button className="button-send-email" onClick={() => setStepper(1)}>
              Reintentar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopupInput;
