import React from "react";
import { Route, Routes } from "react-router";
import { AdministratorOperatorsList } from "../components/AdministratorOperatorsList";
import AdministratorProfile from "../components/AdministratorProfile";
import { AdministratorSucursalesList } from "../components/AdministratorSucursalesList";
import CreateBranches from "../components/CreateBranches";
import CreateOperator from "../components/CreateOperator";
import Reports from "../components/Reports";
import RouteNotFound from "../components/RouteNotFound";

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<AdministratorSucursalesList />} />
      <Route path="/profile" element={<AdministratorProfile />} />
      <Route path="/allBranches" element={<AdministratorSucursalesList />} />
      <Route path="/operators" element={<AdministratorOperatorsList />} />
      <Route path="/create/branch" element={<CreateBranches />} />
      <Route path="/create/operador" element={<CreateOperator />} />
      <Route path="/edit/branch/:id" element={<CreateBranches />} />
      <Route path="/edit/operador/:dni" element={<CreateOperator />} />
      <Route path="/reports" element={<Reports />} />
      <Route path="/*" element={<RouteNotFound />} />
    </Routes>
  );
};

export default AdminRoutes;
