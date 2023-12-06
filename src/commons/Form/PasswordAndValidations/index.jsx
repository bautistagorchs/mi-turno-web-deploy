import React, { useState } from "react";
import Eye from "../../../assets/Eye";
import Check from "../../../assets/Check";
import Wrong from "../../../assets/Wrong";
import s from "../../../components/Register/style.module.scss";
import { useLocation } from "react-router";

function PasswordAndValidations({
  handleInputPassword,
  handleToggleFocus,
  handleTogglePassword,
  handleInputConfirmPswd,
  handleToggleConfirmPassword,
  value,
  confirmPswd,
  showPassword,
  showConfirmPassword,
  checklist,
  focus,
}) {
  const location = useLocation();
  const { pathname } = location;
  return (
    <div style={{width:"100%"}}>
      <div style={{width:"100%"}}>
        <div style={{width:"100%"}} 
          className={
            pathname === ("/admin/profile" || "/operator/profile")
              ? s.password
              : s.rowForm
          }
        >
          <div style={{width:"100%"}}
            className={
              pathname === ("/admin/profile" || "/operator/profile")
                ? s.password1
                : ""
            }
          >
            <label htmlFor="password" className={s.textInputs}>
              Contraseña
            </label>
            <div style={{width:"95%"}}
              className={
                pathname === ("/admin/profile" || "/operator/profile")
                  ? focus && value === confirmPswd
                    ? s.focusP
                    : value !== confirmPswd
                    ? s.errP
                    : s.inputAreaP
                  : focus && value === confirmPswd
                  ? s.focus
                  : value !== confirmPswd
                  ? s.err
                  : s.inputArea
              }
            >
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                placeholder="Contraseña"
                value={value}
                className={s.inputPassword}
                autoComplete="new-password"
                onChange={handleInputPassword}
                onFocus={handleToggleFocus}
                onBlur={handleToggleFocus}
              />
              <div onClick={handleTogglePassword}>
                <Eye />
              </div>
            </div>
          </div>
          <div className={s.password1}>
            <label htmlFor="password" className={s.textInputs}>
              Repetir Contraseña
            </label>
            <div style={{width:"95%"}}
              className={
                pathname === ("/admin/profile" || "/operator/profile")
                  ? focus && value === confirmPswd
                    ? s.focusP
                    : value !== confirmPswd
                    ? s.errP
                    : s.inputAreaP
                  : focus && value === confirmPswd
                  ? s.focus
                  : value !== confirmPswd
                  ? s.err
                  : s.inputArea
              }
            >
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="password"
                id="pswd"
                placeholder="Contraseña"
                value={confirmPswd}
                className={s.inputPassword}
                autoComplete="new-password"
                onChange={handleInputConfirmPswd}
                onFocus={handleToggleFocus}
                onBlur={handleToggleFocus}
              />
              <div onClick={handleToggleConfirmPassword}>
                <Eye />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div style={{width:"96%"}}
        className={
          pathname === ("/admin/profile" || "/operator/profile")
            ? s.warningP
            : s.warning
        }
      >
        {value === "" ? (
          <p className={s.marg2}>La contraseña debe contener:</p>
        ) : (
          <p className={s.marg}>La contraseña debe contener:</p>
        )}

        <div className={s.bBorder}></div>
        <div className={s.container}>
          <div className={s.rowOne}>
            {value === "" ? (
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
            {value === "" ? (
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
        </div>
      </div>
    </div>
  );
}

export default PasswordAndValidations;
