import { useEffect, useState } from "react";
import s from "./style.module.scss";
import Fullname from "../../commons/Form/Fullname";
import axios from "axios";
import useInput from "../../hooks/useInput";
import { useNavigate, useParams } from "react-router";
import Popup from "../../commons/Popup";
import PasswordAndValidations from "../../commons/Form/PasswordAndValidations";

const CreateOperator = function () {
  const navigate = useNavigate();
  const { dni } = useParams();
  const fullname = useInput("");
  const [emailBlocked, setEmailBlocked] = useState("");
  const email = useInput("");
  const dni_ = useInput(0);
  const sucursal = useInput("");
  const [disabled, setDisabled] = useState(false);

  const sucursales = useInput([]);
  const [sinSuc, setSinSuc] = useState(false);
  const [data, setData] = useState({});
  const [popupInfo, setPopupInfo] = useState({
    title: undefined,
    text: undefined,
    img: undefined,
    redirect: undefined,
  });

  useEffect(() => {
    axios
      .get("https://mi-turno-web.onrender.com/api/users/admin/sucursalesList", {
        withCredentials: true,
        credentials: "include",
      })
      .then((res) => {
        sucursales.setValue(res.data);
      });
  }, []);

  useEffect(() => {
    if (dni) {
      setDisabled(true);
      axios
        .get(
          `https://mi-turno-web.onrender.com/api/users/operator/info/${dni}`,
          {
            withCredentials: true,
            credentials: "include",
          }
        )
        .then((res) => {
          fullname.setValue(res.data.operator.fullname);
          setEmailBlocked(res.data.operator.email);
          dni_.setValue(res.data.operator.DNI);
          if (res.data.name) {
            console.log(
              sucursales.value.filter((suc) => suc.name === res.data.name)
            );
            const obj = sucursales.value.filter(
              (suc) => suc.name === res.data.name
            )[0];
            sucursal.setValue(obj ? obj.id : null);
          } else if (!res.data.name) setSinSuc(true);
        });
    }
  }, [sucursales.value]);

  //====================PASSWORD=========================
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
    //setData({ ...data, password: newValue });
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
  //====================================================

  const logicPopUp = (tag, option, className) => {
    document.querySelector(tag).classList[option](className);
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(parseInt(sucursal.value));
    let data = {
      fullname: fullname.value,
      DNI: dni_.value,
      email: dni ? emailBlocked : email.value,
      branchId: parseInt(sucursal.value),
      isOperator: true,
      isConfirmed: true,
    };

    if (password != "" && confirmPswd == password)
      data = { ...data, password: password };

    axios
      .post("https://mi-turno-web.onrender.com/api/users/operator", data, {
        withCredentials: true,
        credentials: "include",
      })
      .then(() => {
        setPopupInfo({
          title: dni ? `Cambios guardados` : `Operador creado con exito`,
          text: `Gracias por confiar en nuestro servicio`,
          img: true,
          redirect: `/admin/operators`,
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
      .catch((err) => console.error(err));
  };

  return (
    <>
      <div className={`${s.parent} body`}>
        <form onSubmit={handleSubmit} className={s.f}>
          <h1>{dni ? "Editar Operador" : "Crear Operador"}</h1>
          <div className={s.inputMail}>
            <Fullname
              value={fullname.value}
              handleInputChange={fullname.onChange}
            />
          </div>
          <div className={s.inputMail}>
            <label htmlFor="email" className={s.textInputs}>
              Mail
            </label>
            {dni ? (
              <input
                style={{
                  backgroundColor: "#E3E3E3",
                  caretColor: "transparent",
                }}
                type="email"
                name="email"
                id="em"
                value={emailBlocked}
                disabled
                required
              />
            ) : (
              <input
                {...email}
                type="email"
                name="email"
                id="em"
                autoComplete="username"
                placeholder="ejemplo_nombre@ejemplo.com"
                required
              />
            )}
          </div>
          <div className={s.rowForm}>
            <div>
              <label htmlFor="dni" className={s.textInputs}>
                DNI
              </label>
              <input
                {...dni_}
                type="text"
                id="DNI"
                name="DNI"
                maxLength="8"
                pattern="[0-9]{1,8}"
                placeholder="9999999"
                className={s.inputArea}
              />
            </div>
            <div className={s.allInputs}>
              <label htmlFor="Branch">Sucursal</label>
              <select
                onChange={sucursal.onChange}
                name="branch"
                id="Branch"
                className={s.inputArea}
                value={data.branch}
                required
              >
                <option disabled value="" selected>
                  seleccione una sucursal
                </option>
                {sucursales.value.map((suc) => {
                  return (
                    <option value={suc.id} selected={sucursal.value === suc.id}>
                      {suc.name}
                      {suc.operator
                        ? " (Ocupado por: " + suc.operator.fullname + ")"
                        : " (Libre)"}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          {disabled ? (
            <div
              style={{
                width: "100%",
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
                  className={s.inputArea}
                  type="password"
                  defaultValue={"Default123"}
                  style={{ width: "100%" }}
                />
              </div>
              <h4
                className="h4-form-edit"
                onClick={(e) => {
                  e.preventDefault();
                  setDisabled(false);
                }}
              >
                Editar contraseña
              </h4>
            </div>
          ) : (
            <PasswordAndValidations
              value={password}
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
          )}
          <button
            type="submit"
            className={s.btnSingIn}
            style={{ marginTop: "3%" }}
          >
            <h3>{dni ? "Guardar Cambios" : "Registrar"}</h3>
          </button>
        </form>
      </div>
      <Popup popupInfo={popupInfo} />
    </>
  );
};

export default CreateOperator;
