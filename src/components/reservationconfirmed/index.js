import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { cancelIcon, check, editIcon } from "../../assets/icons";
import "./index.scss";
const ReservationConfirmed = function () {
  const navigate = useNavigate();
  let { reservationId } = useParams();
  const [reservation, setReservation] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://mi-turno-web.onrender.com/api/users/appointment/${reservationId}`,
          { withCredentials: true, credentials: "include" }
        );
        setReservation(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="bodyComponent">
      <div className="contentMessaje">
        <i>{check}</i>
        <h1>¡Gracias por tu reserva!</h1>
        <p className="messaje">
          En hasta 5 minutos, recibirás un correo electrónico en{" "}
          {reservation.createdBy ? reservation.createdBy.email : ""} con todos
          los detalles de tu reservación. Recordá revisar tu buzón de correo no
          deseado o promociones.
        </p>

        <button
          className="impresion"
          id="dont-print-me"
          onClick={() => {
            window.print();
          }}
        >
          {" "}
          ¿Quéres imprimir tu comprobante?
        </button>
      </div>

      <div className="contentReservation">
        <section className="contentPedido">
          <div className="itemPedido">
            <div className="subitemPedido">
              <h2>RESERVA</h2>{" "}
              <p className="numeroR">
                {" "}
                {reservation.createdBy ? "#" + reservation.reservationId : ""}
              </p>
            </div>

            <p>
              Para el{" "}
              {reservation.createdBy ? reservation.date.slice(0, 10) : ""} a las{" "}
              {reservation.createdBy ? reservation.schedule.slice(0, 5) : ""}hs
            </p>
          </div>

          <div className="itemPedidoButton" id="dont-print-me">
            <button
              className="editReservationBtn"
              onClick={() =>
                navigate(`/client/editReservation/${reservationId}`)
              }
            >
              {editIcon}editar reserva
            </button>
            <button
              className="cancelReservationBtn"
              onClick={() =>
                navigate(`/client/cancelReservation/${reservationId}`)
              }
            >
              {" "}
              {cancelIcon} cancelar reserva
            </button>
          </div>
        </section>

        <section className="contentInfo">
          <div className="item1">
            <h2>
              {reservation.createdBy ? reservation.createdBy.fullname : ""}
            </h2>
            <p>
              Email: {reservation.createdBy ? reservation.createdBy.email : ""}
            </p>

            <p>
              Telefono:
              {reservation.createdBy ? reservation.createdBy.telephone : ""}
            </p>
          </div>

          <div className="item2">
            <h2>Reserva</h2>
            <p>
              Sucursal:{reservation.createdBy ? reservation.branch.name : ""}
            </p>

            <p>
              Horario:{" "}
              {reservation.createdBy ? reservation.schedule.slice(0, 5) : ""} hs
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ReservationConfirmed;
