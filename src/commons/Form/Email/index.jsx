import React from "react";
import s from "../../../components/Register/style.module.scss";

export default function Email() {
  return (
    <div className={s.inputMail}>
      <label htmlFor="email" className={s.textInputs}>
        Mail
      </label>
      <input
        type="email"
        name="email"
        id="em"
        placeholder="ejemplo_nombre@ejemplo.com"
      />
    </div>
  );
}
