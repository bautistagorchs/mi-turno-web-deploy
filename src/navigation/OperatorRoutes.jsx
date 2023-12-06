import React from "react";
import { Route, Routes } from "react-router";
import OperatorProfile from "../components/OperatorProfile";
import { OperatorReservationsList } from "../components/OperatorReservationsList";
import RouteNotFound from "../components/RouteNotFound";

const OperatorRoutes = () => {
  return (
    <Routes>
      <Route path="/reservationsList" element={<OperatorReservationsList />} />
      <Route path="/profile" element={<OperatorProfile />} />
      <Route
          path="/*"
          element={<RouteNotFound />}
        />
    </Routes>
  );
};

export default OperatorRoutes;
