import React, { useEffect, useState } from "react";
import s from "./style.module.scss";
import useInput from "../../hooks/useInput";
import axios from "axios";
import Bag from "../../assets/Bag";

function Reports() {
  const sucursal = useInput("");
  const sucursales = useInput([]);
  const [reservationsList, setReservationsList] = useState([]);
  const [data, setData] = useState({});
  useEffect(() => {
    axios
      .get("http://localhost:3001/api/users/admin/sucursalesList", {
        withCredentials: true,
        credentials: "include",
      })
      .then((res) => {
        sucursales.setValue(res.data);
      });
  }, []);

  return (
    <div className={s.dad}>
      <div className={s.firstChild}>
        <label htmlFor="Branch">Filtro por sucursalllll</label>
        <select
          onChange={sucursal.onChange}
          name="branch"
          id="Branch"
          className={s.inputArea}
          value={data.branch}
        >
          <option disabled value="" selected>
            seleccione una sucursal
          </option>
          {sucursales.value.map((suc) => {
            return (
              <option value={suc.name} selected={sucursal.value === suc.name}>
                {suc.name}
              </option>
            );
          })}
        </select>
      </div>
      <div className={s.cont}>
        <div className={s.number}>
          <div className={s.pos}>
            <div>
              <p className={s.num}>100</p>
              <p className={s.text}>Total de reservas</p>
            </div>
            <Bag className={s.icon} />
          </div>
          <div className={s.borderBtn} />
        </div>
      </div>
    </div>
  );
}

export default Reports;
