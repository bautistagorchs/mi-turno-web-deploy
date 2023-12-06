import React, { useEffect, useState } from "react";
import { TableList } from "../../commons/TableList";
import axios from "axios";
import { Button } from "@mui/material";
import s from "./style.module.scss";
import { useNavigate } from "react-router";

export const AdministratorSucursalesList = () => {
  const [allData, setAllData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get(`http://localhost:3001/api/users/admin/sucursalesList`, {
        withCredentials: true,
        credentials: "include",
      })
      .then((res) => {
        setAllData(
          res.data.map((obj) => {
            const { name, email, capacity, openingTime, closingTime, id } = obj;
            const operator = obj.operator;
            const horario =
              openingTime.slice(0, 5) +
              "hs to " +
              closingTime.slice(0, 5) +
              "hs";
            return { name, email, capacity, horario, id, operator };
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
  // const operators = allData;

  if (loading) return <>Loading...</>;
  else if (allData.length == 0)
    return (
      <div className={s.container}>
        <h1 style={{ margin: "20px" }}>No hay sucursales</h1>
        <Button
          onClick={(e) => {
            navigate(`/admin/create/branch`);
          }}
          variant="contained"
          style={{
            backgroundColor: "#F5F5F5",
            color: "#A442F1",
            textTransform: "none",
            padding: "0 !important",
          }}
        >
          Crear Sucursal
        </Button>
      </div>
    );
  return (
    <>
      <TableList datatype="Sucursales" data={allData} />
    </>
  );
};
