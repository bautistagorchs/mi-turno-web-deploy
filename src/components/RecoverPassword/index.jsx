import React, { useState } from "react";
import Eye from "../../assets/Eye";
import axios from "axios";
import s from "../Register/style.module.scss";
import Check from "../../assets/Check";
import Wrong from "../../assets/Wrong";
import { useParams } from "react-router";
import Popup from "../../commons/Popup";

const RecoverPassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [state, setState] = useState(true);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const [newPassword, setNewPassword] = useState();
  const [newPasswordConfirmation, setNewPasswordConfirmation] = useState();
  const [invalidInformation, setInvalidInformation] = useState("");
  const [checklist, setChecklist] = useState({
    uppercaseLetter: false,
    lowercaseLetter: false,
    oneNumber: false,
    large: false,
    validation: false,
  });
  const [popupInfo, setPopupInfo] = useState({
    title: undefined,
    text: undefined,
    img: undefined,
    redirect: undefined,
  });

  let { token } = useParams();

  const handleInputPassword = (e) => {
    const newValue = e.target.value;
    setPassword(newValue);
    setChecklist({
      uppercaseLetter: /[A-ZÑ]/.test(newValue),
      lowercaseLetter: /[a-zñ]/.test(newValue),
      oneNumber: /\d/.test(newValue),
      large: newValue.length >= 8,
      validation:
        /[A-ZÑ]/.test(newValue) &&
        /[a-zñ]/.test(newValue) &&
        /\d/.test(newValue) &&
        newValue.length >= 8,
    });
  };
  const [password, setPassword] = useState("");
  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
    // document.querySelector(".strike-eye1").style.display = !showPassword
    //   ? "inherit"
    //   : "none";
  };
  const handleTogglePasswordConfirm = () => {
    setShowPasswordConfirm(!showPasswordConfirm);
    // document.querySelector(".strike-eye2").style.display = !showPasswordConfirm
    //   ? "inherit"
    //   : "none";
  };
  const logicPopUp = (tag, option, className) => {
    document.querySelector(tag).classList[option](className);
  };
  const handleSubmit = () => {
    if (newPassword === undefined) {
      return setInvalidInformation("Debe ingresar una contraseña");
    } else if (newPasswordConfirmation !== newPassword) {
      return setInvalidInformation("Las contraseñas no coinciden");
    } else if (!checklist.validation) {
      return;
    } else setInvalidInformation("");
    axios
      .put(
        `http://localhost:3001/api/nodeMailer/recoverPassword/${token}`,
        { newPassword },
        { withCredentials: true }
      )
      .then(() => {
        setPopupInfo({
          title: `Contraseña modificada con exito`,
          text: `Haz click en continuar para iniciar sesion`,
          img: true,
          redirect: `/login`,
        });
        logicPopUp(
          ".recover-password-container",
          "add",
          "external-div-container-inactive"
        );
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
      })
      .catch(() => setState(false));
  };
  return (
    <div>
      <div className="recover-password-container">
        <div className="recover-password-content-container">
          <div className="recover-password-content">
            <h1 className="h1-recover-password">Recuperar contraseña</h1>
            <p className="p-recover-password">Nueva contraseña</p>
            <div className="input-container">
              <input
                className="inputLogin"
                type={showPassword ? "text" : "password"}
                onKeyUp={(e) => setNewPassword(e.target.value)}
                onChange={handleInputPassword}
              />
              <div className="eye-container" onClick={handleTogglePassword}>
                <Eye />
                <div
                  className="strike-eye1"
                  style={{
                    border: "1px solid",
                    position: "relative",
                    top: "-16px",
                    left: "2px",
                    width: "18px",
                    transform: "rotate(29deg)",
                    display: "none",
                  }}
                ></div>
              </div>
            </div>
            <p className="p-recover-password">Repetir contraseña</p>
            <div className="input-container">
              <input
                className="inputLogin"
                type={showPasswordConfirm ? "text" : "password"}
                onChange={(e) => setNewPasswordConfirmation(e.target.value)}
              />
              <div
                className="eye-container"
                onClick={handleTogglePasswordConfirm}
              >
                <Eye />
                <div
                  className="strike-eye2"
                  style={{
                    border: "1px solid",
                    position: "relative",
                    top: "-16px",
                    left: "2px",
                    width: "18px",
                    transform: "rotate(29deg)",
                    display: "none",
                  }}
                ></div>
              </div>
            </div>
            <div className={`${s.warning} verification-container-div`}>
              {password === "" ? (
                <p className={s.marg2}>La contraseña debe contener:</p>
              ) : (
                <p className={s.marg}>La contraseña debe contener:</p>
              )}

              <div className={s.bBorder}></div>
              <div className={s.container}>
                <div className={s.rowOne}>
                  {password === "" ? (
                    <>
                      <div className={s.row3}>
                        <p>ABC</p> <p>Una letra mayúscula</p>
                      </div>
                      <div className={s.row3}>
                        <p>abc</p> <p>Una letra minúscula</p>
                      </div>
                    </>
                  ) : (
                    <>
                      {checklist.uppercaseLetter ? (
                        <div className={s.row1}>
                          <Check /> <p>ABC</p> <p>Una letra mayúscula</p>
                        </div>
                      ) : (
                        <div className={s.row2}>
                          <Wrong /> <p>ABC</p> <p>Una letra mayúscula</p>
                        </div>
                      )}
                      {checklist.lowercaseLetter ? (
                        <div className={s.row1}>
                          <Check /> <p>abc</p> <p>Una letra minúscula</p>
                        </div>
                      ) : (
                        <div className={s.row2}>
                          <Wrong /> <p>abc</p> <p>Una letra minúscula</p>
                        </div>
                      )}
                    </>
                  )}
                </div>
                <div className={s.rowOne}>
                  {password === "" ? (
                    <>
                      <div className={s.row3}>
                        <p>123</p> <p>Un número</p>
                      </div>
                      <div className={s.row3}>
                        <p>***</p> <p>Mínimo 8 caracteres</p>
                      </div>
                    </>
                  ) : (
                    <>
                      {checklist.oneNumber ? (
                        <div className={s.row1}>
                          <Check /> <p>123</p> <p>Un número</p>
                        </div>
                      ) : (
                        <div className={s.row2}>
                          <Wrong /> <p>123</p> <p>Un número</p>
                        </div>
                      )}
                      {checklist.large ? (
                        <div className={s.row1}>
                          <Check /> <p>***</p> <p>Mínimo 8 caracteres</p>
                        </div>
                      ) : (
                        <div className={s.row2}>
                          <Wrong /> <p>***</p> <p>Mínimo 8 caracteres</p>
                        </div>
                      )}
                    </>
                  )}
                </div>
                <p className="h4-validation-error-recover">
                  {invalidInformation}
                </p>
              </div>
            </div>
            <button
              className="login-button recover-button"
              onClick={handleSubmit}
            >
              Cambiar contraseña
            </button>
          </div>
        </div>
      </div>
      <Popup popupInfo={popupInfo} />
    </div>
  );
};

export default RecoverPassword;
