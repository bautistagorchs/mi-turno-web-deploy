import React, { useEffect, useState } from "react";
import "./index.scss";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { check, alertIcon } from "../../assets/icons";
const ConfirmAccount = function () {
  const [confirmed, setConfirmed] = useState(
    "Confirme su registro haciendo click en el boton!"
  );
  const navigate = useNavigate();
  const { token } = useParams();
  const confirmedRegister = (e) => {
    axios
      .put(`http://localhost:3001/api/nodeMailer/confirmation/${token}`)
      .then((response) => {
        setConfirmed(true);
      })
      .catch((error) => {
        console.error(error);
        setConfirmed("TOKEN INVALIDO O EXPIRADO!");
      });
  };

  const handleNewToken = (e) => {
    e.preventDefault();
    const email = e.target.email.value;

    axios
      .post(`http://localhost:3001/api/nodeMailer/accountConfirmation/${email}`)
      .then((resp) =>
        alert(
          "revise su casilla de correo para confirmar su registro de cuenta"
        )
      )
      .catch((error) =>
        setConfirmed(
          "el email ingresado no se encuentra Pre registrado o ya se encuentra confirmado!"
        )
      );
  };

  const handleBtnNewToken = () => {
    setConfirmed("Obtener Nuevo Token");
  };
  const handleBtnRedireccion = () => {
    navigate("/");
  };
  return (
    <div className="bodyConfirmedRegister">
      <div className="body-content-container">
        <h1>
          {confirmed === true ||
          confirmed ===
            "Revise su casilla de correo para obtener el nuevo vinculo de confirmación!"
            ? check
            : ""}{" "}
        </h1>
        <h1 style={{ marginBottom: "4%" }}>
          {confirmed !== true &&
          confirmed !== "Confirme su registro haciendo click en el boton!" &&
          confirmed !== "Obtener Nuevo Token"
            ? alertIcon
            : ""}{" "}
        </h1>
        <h1>{confirmed === true ? "Registro confirmado " : confirmed}</h1>
        {confirmed === "TOKEN INVALIDO O EXPIRADO!" ? (
          <button className="btn-New-Token" onClick={handleBtnNewToken}>
            Obtener Nuevo Token
          </button>
        ) : (
          ""
        )}
        {confirmed === "Obtener Nuevo Token" ? (
          <form action="" onSubmit={handleNewToken} className="formNewToken">
            <p>
              "ingrese su email para obtener un nuevo token de confirmación"
            </p>
            <label htmlFor="email">Email : </label>
            <input
              id="email"
              type="email"
              placeholder="ingrese su email para obtener un nuevo token de confirmación"
              required
            />
            <button type="submit">Obtener</button>
          </form>
        ) : (
          ""
        )}
        {confirmed === "Confirme su registro haciendo click en el boton!" ? (
          <button onClick={confirmedRegister} className="btn-confirmedRegister">
            Confirmar Registro
          </button>
        ) : (
          ""
        )}
        {confirmed ===
          "el email ingresado no se encuentra Pre registrado o ya se encuentra confirmado!" ||
        confirmed === true ? (
          <button onClick={handleBtnRedireccion} className="btn-redireccion">
            Ir al login
          </button>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default ConfirmAccount;
