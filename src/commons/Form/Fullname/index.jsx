import React from "react";
import s from "../../../components/Register/style.module.scss";
import { useLocation } from "react-router";

export default function Fullname({ value, handleInputChange }) {
  const location = useLocation();
  const { pathname } = location;
  return (
    <div className={pathname === "/admin/create/operador" ? s.inputMail : ""}>
      <label htmlFor="name" className={s.textInputs}>
        Nombre y Apellido
      </label>
      <input
        type="text"
        name="fullname"
        id="fn"
        value={value}
        placeholder="Nombre Apellido"
        className={s.inputArea}
        onChange={handleInputChange}
      />
    </div>
  );
}
