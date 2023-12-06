import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { toast } from "react-toastify";
import Popup from "../../commons/Popup";
import useInput from "../../hooks/useInput";
import "./index.scss";

const CreateBranches = function () {
  const { id } = useParams();
  const nombre = useInput("");
  const [correoBlocked, setCorreoBlocked] = useState("");
  const correo = useInput("");
  const telefono = useInput(0);
  const maxCap = useInput(0);
  const opTime = useInput("");
  const clTime = useInput("");
  const [message, setMesagge] = useState("Created Successfully");
  const [popupInfo, setPopupInfo] = useState({
    title: undefined,
    text: undefined,
    img: undefined,
    redirect: undefined,
  });
  const logicPopUp = (tag, option, className) => {
    document.querySelector(tag).classList[option](className);
  };
  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:3001/api/branches/info/${id}`)
        .then((res) => {
          nombre.setValue(res.data.name);
          setCorreoBlocked(res.data.email);
          telefono.setValue(res.data.telephone);
          maxCap.setValue(res.data.capacity);
          opTime.setValue(res.data.openingTime);
          clTime.setValue(res.data.closingTime);
          setMesagge("Updated Successfully");
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  }, []);

  const errorMessage = () => {
    toast.error("error creating branch!", {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };
  const handleCreateBranch = function (e) {
    e.preventDefault();
    const info = {
      name: nombre.value,
      email: id ? correoBlocked : correo.value,
      telephone: telefono.value,
      openingTime: opTime.value,
      closingTime: clTime.value,
      capacity: maxCap.value,
    };
    axios
      .post("http://localhost:3001/api/branches/", info, {
        withCredentials: true,
      })
      .then(() => {
        setPopupInfo({
          title: id ? `Cambios guardados` : `Sucursal creada con exito`,
          text: id
            ? `Gracias por confiar en nuestro servicio`
            : `No olvide asignarle un operador`,
          img: true,
          redirect: `/admin/allBranches`,
        });
        logicPopUp(".bodyContent", "add", "external-div-container-inactive");
        logicPopUp(
          ".fake-container-popup",
          "remove",
          "fake-container-popup-inactive"
        );
        logicPopUp(
          ".fake-container-popup",
          "add",
          "fake-container-popup-active"
        );
      })
      .catch((error) => {
        errorMessage();
        return error;
      });
  };
  // console.log(document.cookie);
  return (
    <>
      <div className="bodyContent">
        <form
          action=""
          className="contentCreateBranches"
          onSubmit={handleCreateBranch}
        >
          <div>
            <h1>{id ? "Editar Sucursal" : "Crear una nueva sucursal"}</h1>
          </div>

          <div className="bloqueUno">
            <label htmlFor="nombre">Nombre</label>
            <input
              className="inputLogin"
              {...nombre}
              type="text"
              name="name"
              id="nombre"
              placeholder="Ingrese su nombre"
              required
            />
          </div>
          <div className="bloqueUno">
            <label htmlFor="email">Correo electrónico</label>
            {id ? (
              <input
                style={{
                  backgroundColor: "#E3E3E3",
                  caretColor: "transparent",
                }}
                value={correoBlocked}
                type="email"
                name="email"
                id="email"
                className="inputLogin"
                placeholder="Ingrese su Email"
                readOnly
              />
            ) : (
              <input
                {...correo}
                type="email"
                name="email"
                id="email"
                placeholder="Ingrese su Email"
                required
              />
            )}
          </div>

          <div className="fila">
            <div className="itemFila">
              <label htmlFor="telefono">Teléfono</label>
              <input
                className="inputLogin"
                {...telefono}
                type="text"
                name="number"
                id="telefono"
                placeholder="ingrese su numero de Teléfono"
                required
              />
            </div>

            <div className="itemFila itemcierre">
              <label htmlFor="capacidadMaxima">Capacidad máxima</label>
              <input
                {...maxCap}
                type="number"
                name="cupos"
                id="capacidadMaxima"
                className="inputLogin"
                required
              />
            </div>
          </div>

          <div className="horario">
            <div className="itemHorario">
              <label htmlFor="H-inicio">Horario de Inicio</label>
              <select
                //value={opTime.value}
                onChange={opTime.onChange}
                name="horarioDeInicio"
                id="inicio"
                className="select-style inputLogin"
                placeholder="6:00"
                required
              >
                <option disabled selected>
                  seleccione un horario de inicio
                </option>
                <option value="6:00AM" selected={opTime.value === "6:00AM"}>
                  6:00 hs
                </option>
                <option value="7:00AM" selected={opTime.value === "7:00AM"}>
                  7:00 hs
                </option>
                <option value="8:00AM" selected={opTime.value === "8:00AM"}>
                  8:00 hs
                </option>
                <option value="9:00AM" selected={opTime.value === "9:00AM"}>
                  9:00 hs
                </option>
                <option value="10:00AM" selected={opTime.value === "10:00AM"}>
                  10:00 hs
                </option>
                <option value="11:00AM" selected={opTime.value === "11:00AM"}>
                  11:00 hs
                </option>
                <option value="12:00PM" selected={opTime.value === "12:00PM"}>
                  12:00 hs
                </option>
              </select>
            </div>

            <div className="itemHorario  itemcierre">
              <label htmlFor="H-Cierre"> Horario de Cierre</label>
              <select
                //value={clTime.value}
                onChange={clTime.onChange}
                name="horarioDeCierre"
                id="H-Cierre"
                className="select-style inputLogin"
                placeholder="16:00"
                required
              >
                <option disabled selected>
                  seleccione un horario de cierre
                </option>
                <option value="15:00" selected={clTime.value === "15:00"}>
                  15:00 hs
                </option>
                <option value="16:00" selected={clTime.value === "16:00"}>
                  16:00 hs
                </option>
                <option value="17:00" selected={clTime.value === "17:00"}>
                  17:00 hs
                </option>
                <option value="18:00" selected={clTime.value === "18:00"}>
                  18:00 hs
                </option>
                <option value="19:00" selected={clTime.value === "19:00"}>
                  19:00 hs
                </option>
                <option value="20:00" selected={clTime.value === "20:00"}>
                  20:00 hs
                </option>
                <option value="21:00" selected={clTime.value === "21:00"}>
                  21:00 hs
                </option>
              </select>
            </div>
          </div>
          <div>
            <button type="submit" className="sumitBtn">
              {id ? "Guardar cambios" : "Crear"}
            </button>
          </div>
        </form>
        {/* <ToastContainer /> */}
      </div>
      <Popup popupInfo={popupInfo} />
    </>
  );
};

export default CreateBranches;
