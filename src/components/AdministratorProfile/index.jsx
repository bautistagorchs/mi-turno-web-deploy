import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PasswordAndValidations from "../../commons/Form/PasswordAndValidations";
import { login } from "../../state/user";
import s from "../Register/style.module.scss";
import "./index.scss";
const AdministratorProfile = function () {
  const navigate = useNavigate();
  const [data, setData] = useState({
    fullname: "",
    DNI: "",
    email: "",
    password: "",
  });
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

  const handleToggleFocus = () => {
    setFocus(!focus);
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleToggleConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
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
  function handleChanges(e) {
    e.preventDefault();
    const { name } = e.target;

    setData((prevState) => {
      return { ...prevState, [name]: e.target.value };
    });
  }

  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [disabled, setDisabled] = useState(true);
  const { DNI, email, fullname } = user;
  function handleEditPasswordClick(e) {
    e.preventDefault();
    setDisabled(false);
  }
  const handleUpdateProfile = (e) => {
    e.preventDefault();

    if (confirmPswd !== password) {
      return toast.error("LAS CONTRASEÑAS NO COINCIDEN", {
        position: toast.POSITION.TOP_CENTER,
      });
      return;
    }
    if (confirmPswd && password && !checklist.validation) {
      toast.error("PASSWORD ERROR", {
        position: toast.POSITION.TOP_CENTER,
      });
      return;
    }

    const info = {
      fullname: data.fullname,
      DNI: data.DNI,
      password: data.password,
    };
    const toPut = { email: user.email, ...info };

    for (const key in info) {
      if (info[key] !== "" && info[key] !== user[key]) {
        toPut[key] = info[key];
      } else {
        toPut[key] = user[key];
      }
    }

    axios
      .put("http://localhost:3001/api/users/edit/profile", toPut, {
        withCredentials: true,
        credentials: "include",
      })
      .then((resp) => {
        const payload = {
          fullname: resp.data.fullname,
          email: resp.data.email,
          DNI: resp.data.DNI,
          telephone: null,
          isAdmin: resp.data.isAdmin,
        };
        dispatch(login(payload));
        navigate("/admin/allBranches");
      })
      .catch((error) => console.error(error));
  };
  return (
    <div className="bodyContent">
      <form action="" className="contentPerfilAdm">
        <div>
          {" "}
          <h1> MIS DATOS</h1>{" "}
        </div>

        <div className="itemPerfilAdm">
          <label htmlFor="nombre">Nombre</label>

          <input
            type="text"
            name="fullname"
            id="nombre"
            defaultValue={fullname}
            onChange={handleChanges}
          />
        </div>

        <div className="itemPerfilAdm">
          <label htmlFor="email">Correo electrónico</label>
          <input
            className="inputLogin"
            type="email"
            name="email"
            id="email"
            defaultValue={email}
            readOnly
          />
        </div>

        <div className="itemPerfilAdm">
          <label htmlFor="DNI">DNI</label>

          <input
            type="text"
            name="DNI"
            id="DNI"
            defaultValue={DNI}
            onChange={handleChanges}
          />
        </div>
        {disabled ? (
          <div
            style={{
              width: "92%",
              display: "flex",
              justifyContent: "space-between",
            }}
            className="inputs-div-container"
          >
            <div className="single-input-container special-password">
              <p className="p-form-client">Contraseña</p>
              <input
                disabled={true}
                name="password"
                readOnly
                className={s.inputAreaPV}
                type="password"
                defaultValue={"Default123"}
              />
            </div>
            <h4 className="h4-form-edit" onClick={handleEditPasswordClick}>
              Editar contraseña
            </h4>
          </div>
        ) : (
          <div style={{ width: "91%" }}>
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
        )}
        <div>
          <button className="perfilBtn" onClick={handleUpdateProfile}>
            Aceptar
          </button>
          <ToastContainer />
        </div>
      </form>
    </div>
  );
};

export default AdministratorProfile;
