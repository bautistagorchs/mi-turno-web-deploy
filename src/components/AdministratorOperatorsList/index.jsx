import React, { useEffect, useState } from "react";
import { TableList } from "../../commons/TableList";
import axios from "axios";
import s from "./style.module.scss";
import { Button, accordionActionsClasses } from "@mui/material";
import { useNavigate } from "react-router";

export const AdministratorOperatorsList = () => {
  const [allData, setAllData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get(`http://localhost:3001/api/users/admin/operatorsList`, {
        withCredentials: true,
        credentials: "include",
      })
      .then((res) => {
        setAllData(
          res.data.map((obj) => {
            const { fullname, email, DNI, id, branchInfo } = obj;
            const branchName = branchInfo ? branchInfo.name : "Sin asignar";
            return { fullname, email, branchName, DNI, id };
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
        <h1 style={{ margin: "20px" }}>No hay operadores</h1>

        <Button
          onClick={(e) => {
            navigate(`/admin/create/operador`);
          }}
          variant="contained"
          style={{
            backgroundColor: "#F5F5F5",
            color: "#A442F1",
            textTransform: "none",
            padding: "0 !important",
            margin: "0",
          }}
        >
          Crear operador
        </Button>
      </div>
    );
  return (
    <>
      <TableList datatype="Operadores" data={allData} />
    </>
  );
};
