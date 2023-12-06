import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { TableList } from "../../commons/TableList";
import s from "./style.module.scss";

export const OperatorReservationsList = () => {
  const user = useSelector((state) => state.user);
  const [reservationsList, setReservationsList] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axios
      .get(
        `http://localhost:3001/api/users/operator/reservationsList/${user.DNI}`
      )
      .then((res) => {
        console.log("reservas traidas del back =>", res.data);
        setReservationsList(
          res.data.map((obj) => {
            //usernamew/reserva n/sucursal/date
            const {
              createdBy,
              reservationId,
              branch,
              date,
              schedule,
              attended,
            } = obj;
            const username = createdBy.fullname;
            const branchname = branch.name;
            return {
              username,
              reservationId,
              date,
              branchname,
              schedule,
              attended,
            };
          })
        );
      })
      .then(() => {
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.error(error);
      });
  }, []);
  const reservationsListSort = reservationsList.slice().sort((a, b) => {
    if (a.attended && !b.attended) {
      return 1;
    }
    if (!a.attended && b.attended) {
      return -1;
    }
    return 0;
  });
  if (loading) return <>Loading...</>;
  else if (reservationsList.length == 0)
    return (
      <div className={s.container}>
        <h1>No hay Reservas por confirmar</h1>
      </div>
    );
  else
    return (
      <TableList datatype="OperatorReservas" data={reservationsListSort} />
    );
};
