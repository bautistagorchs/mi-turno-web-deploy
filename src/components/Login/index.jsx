import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { login } from "../../state/user";
import Popup from "../../commons/Popup";
import PopupInput from "../../commons/PopupInput";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [userInputValue, setUserInputValue] = useState();
  const [passwordInputValue, setPasswordInputValue] = useState();
  const [invalidInformation, setInvalidInformation] = useState();
  const [popupInfo, setPopupInfo] = useState({
    title: undefined,
    text: undefined,
    img: undefined,
    buttonText: undefined,
    redirect: undefined,
  });
  const logicPopUp = (tag, option, className) => {
    document.querySelector(tag).classList[option](className);
  };
  const handleSubmit = (e) => {
    axios
      .post(
        "http://localhost:3001/api/users/login",
        {
          email: userInputValue,
          password: passwordInputValue,
        },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        dispatch(login(res.data));
        res.data.isAdmin
          ? navigate("/admin/allBranches")
          : res.data.isOperator
          ? navigate("/operator/reservationsList")
          : !res.data.isAdmin &&
            !res.data.isOperator &&
            res.data.email &&
            navigate("/client/newReservation");
      })
      .catch((err) => {
        if (err.response.data === "Usuario no confirmado") {
          setPopupInfo({
            title: `El usuario no esta confirmado`,
            text: `Revisa tu correo para confirmar tu cuenta`,
            img: false,
            buttonText: `Continuar`,
            redirect: true,
          });
          logicPopUp(".login-page", "add", "external-div-container-inactive");
          logicPopUp(
            ".fake-container-popup",
            "remove",
            "fake-container-popup-inactive"
          );
          logicPopUp(
            ".fake-container-popup",
            "add",
            "fake-container-popup-active"
          );
          return console.error(err);
        }
        setInvalidInformation("¡Email o contraseña incorrectos!");
        console.error(err);
      });
  };
  const handleRecoverPasswordButton = () => {
    logicPopUp(".login-page", "add", "blur-page");
    logicPopUp(".div-popupI-container", "remove", "inactive-pi");
    logicPopUp(".div-popupI-container", "add", "active-pi");
  };
  return (
    <>
      <div>
        <div className="login-page">
          <div className="login-container">
            <div className="login-form">
              <h1 className="h1-form-login">Iniciar sesion</h1>
              <p className="p-form-login">Usuario</p>
              <input
                className="inputLogin"
                type="text"
                onChange={(e) => setUserInputValue(e.target.value)}
                autoComplete="username"
              />
              <p className="p-form-login">Contraseña</p>
              <input
                className="inputLogin input-password-focus"
                type="password"
                onChange={(e) => setPasswordInputValue(e.target.value)}
                onKeyDown={(e) => e.code === "Enter" && handleSubmit()}
              />
              <p className="p-validation-error-login">{invalidInformation}</p>
              <h4
                className="h4-form-login"
                onClick={handleRecoverPasswordButton}
              >
                ¿Olvidaste tu contraseña?
              </h4>
              <button className="login-button" onClick={() => handleSubmit()}>
                Ingresar
              </button>
              <div className="login-form-line"></div>
              <button
                className="go-to-register-button"
                onClick={() => navigate("/register")}
              >
                ¿No tenés cuenta? Registrate
              </button>
            </div>
          </div>
        </div>
      </div>
      <Popup popupInfo={popupInfo} />
      <PopupInput />
    </>
  );
};

export default Login;
