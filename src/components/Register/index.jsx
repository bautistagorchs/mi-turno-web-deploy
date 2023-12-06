import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import Fullname from "../../commons/Form/Fullname";
import PasswordAndValidations from "../../commons/Form/PasswordAndValidations";
import s from "./style.module.scss";
import Popup from "../../commons/Popup";

export default function Register() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    fullname: "",
    DNI: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPswd, setConfirmPswd] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [focus, setFocus] = useState(false);
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
    buttonText: undefined,
    redirect: undefined,
  });
  const logicPopUp = (tag, option, className) => {
    document.querySelector(tag).classList[option](className);
  };

  const handleToggleFocus = () => {
    setFocus(!focus);
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
    document.querySelector(".strike-eye1").style.display = !showPassword
      ? "inherit"
      : "none";
  };

  const handleToggleConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
    document.querySelector(".strike-eye2").style.display = !showConfirmPassword
      ? "inherit"
      : "none";
  };

  const handleInputConfirmPswd = (e) => {
    const newValue = e.target.value;
    setConfirmPswd(newValue);
  };

  const handleInputPassword = (e) => {
    const newValue = e.target.value;
    setPassword(newValue);
    setData({ ...data, password: newValue });
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

  const returnLogin = () => {
    navigate("/login");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "DNI") {
      const nums = value.replace(/[^0-9]/g, "");
      setData({
        ...data,
        [name]: parseInt(nums),
      });
    } else {
      setData({
        ...data,
        [name]: value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!data.fullname || !data.DNI || !data.email || !data.password) {
      alert("Debes completar todos los campos");
    } else if (!checklist.validation) {
      alert("validation");
    } else if (data.password !== confirmPswd) {
      alert("Las contraseñas deben ser iguales");
    } else {
      axios

        .post("http://localhost:3001/api/users/register", data, {
          withCredentials: true,
          credentials: "include",
        })
        .then((resp) => {
          axios.post(
            `http://localhost:3001/api/nodeMailer/accountConfirmation/${resp.data.email}`,
            { withCredentials: true, credentials: "include" }
          );
        })
        .then(() => {
          setPopupInfo({
            title: `Usuario registrado exitosamente`,
            text: `Bienvenido! Revisa tu correo para confirmar tu cuenta`,
            img: true,
            buttonText: `Ir al login`,
            redirect: `/login`,
          });
          logicPopUp(".body", "add", "external-div-container-inactive");
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
        .catch((err) => {
          setError(err.response.data.error);
        });
    }
  };

  return (
    <>
      <div className={`${s.divs} body`}>
        <form className={s.f} onSubmit={handleSubmit}>
          <div className={s.head}>
            <h1 className={s.textTittle}>Crear cuenta</h1>
          </div>
          <div className={s.inputs}>
            <div className={s.rowForm}>
              <Fullname
                value={data.name}
                handleInputChange={handleInputChange}
              />
              <div>
                <label htmlFor="DNI" className={s.textInputs}>
                  DNI
                </label>
                <input
                  type="text"
                  id="DNI"
                  name="DNI"
                  maxLength="8"
                  pattern="[0-9]{7,8}"
                  placeholder="9999999"
                  value={data.DNI}
                  onChange={handleInputChange}
                  className={s.inputArea}
                />
              </div>
            </div>
            <div className={s.inputMail}>
              <label htmlFor="email" className={s.textInputs}>
                Mail
              </label>
              <input
                type="email"
                name="email"
                id="em"
                value={data.email}
                autoComplete="username"
                placeholder="ejemplo_nombre@ejemplo.com"
                onChange={handleInputChange}
              />
            </div>
            <PasswordAndValidations
              value={data.password}
              handleInputConfirmPswd={handleInputConfirmPswd}
              handleInputPassword={handleInputPassword}
              handleToggleFocus={handleToggleFocus}
              handleTogglePassword={handleTogglePassword}
              handleToggleConfirmPassword={handleToggleConfirmPassword}
              confirmPswd={confirmPswd}
              showPassword={showPassword}
              showConfirmPassword={showConfirmPassword}
              checklist={checklist}
              focus={focus}
            />
          </div>
          {error ? <p className={s.error}>{error}</p> : <></>}
          <button className={s.btnSingIn} type="submit">
            <h3>Registrarme</h3>
          </button>
          <div className={s.bBorder}></div>
          <button onClick={returnLogin} className={s.btnLog}>
            ¿Ya tenés cuenta? Iniciá sesión
          </button>
        </form>
      </div>
      <Popup popupInfo={popupInfo} />
    </>
  );
}
