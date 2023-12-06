import React from "react";
import { Route, Routes } from "react-router";
import { CancelReservation } from "../components/CancelReservation";
import ClientProfileEdit from "../components/ClientProfileEdition/ClientProfileEdit";
import ReservationPanel from "../components/ReservationPanel/ReservationPanel";
import UserReservationHistory from "../components/UserReservationHistory";
import ReservationConfirmed from "../components/reservationconfirmed";
import RouteNotFound from "../components/RouteNotFound";

const ClientRoutes = () => {
  return (
    <Routes>
      <Route path="/newReservation" element={<ReservationPanel />} />
      <Route path="/reservationConfirmed" element={<ReservationConfirmed />} />
      <Route
        path="/reservationConfirmed/:reservationId"
        element={<ReservationConfirmed />}
      />
      <Route path="/reservations" element={<UserReservationHistory />} />
      <Route
        path="/editReservation/:reservationId"
        element={<ReservationPanel />}
      />
      <Route
        path="/cancelReservation/:reservationId"
        element={<CancelReservation />}
      />
      <Route path="/myAccount" element={<ClientProfileEdit />} />
      <Route path="/*" element={<RouteNotFound />} />
    </Routes>
  );
};

export default ClientRoutes;
