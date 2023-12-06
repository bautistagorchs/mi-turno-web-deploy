import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import axios from "axios";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Countdown from "../../commons/Countdown";
import { login } from "../../state/user";
import "../ReservationPanel/ReservationPanel.scss";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Grid,
  Step,
  StepLabel,
  Stepper,
  Stack,
} from "@mui/material";

import { useState } from "react";
import Popup from "../../commons/Popup";

export default function ReservationPanel() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [appointment, setAppointment] = React.useState({
    reservationId: "",
    branchId: "",
    branchName: "",
    date: "",
    schedule: "",
    fullname: "",
    telephone: "",
    email: "",
  });
  const [date, setDate] = React.useState(null);
  const [enabled, setEnabled] = React.useState(false);
  const [branches, setBranches] = React.useState([]);
  const [capacity, setCapacity] = React.useState(0);
  const [editing, setEditing] = React.useState(false);
  const [reservationIdParams, setReservationIdParams] = React.useState();
  const [reservations, setReservations] = React.useState([]);
  const { reservationId } = useParams();
  const [schedules, setSchedules] = React.useState([]);
  const [notAvailableSchedule, setNotAvilableSchedule] = React.useState("");
  const [reservedDay, setReservedDay] = React.useState([]);
  const [openingTime, setOpeningTime] = React.useState("");
  const [popupInfo, setPopupInfo] = useState({
    title: undefined,
    text: undefined,
    img: undefined,
    redirect: undefined,
  });

  function handleNext() {
    setActiveStep((prev) => prev + 1);
  }
  //TRAIGO DATOS DE LA RESERVA PARA EDITAR y SUCURSALES DEL BACK--------------------------
  React.useEffect(() => {
    if (reservationId) {
      axios
        .get(`http://localhost:3001/api/users/appointment/${reservationId}`)
        .then((result) => {
          const data = {
            reservationId: reservationId,
            branchId: result.data.branchId,
            branchName: result.data.branch.name,
            date: result.data.date,
            schedule: result.data.schedule,
            fullname: result.data.createdBy.fullname,
            telephone: result.data.createdBy.telephone,
            email: result.data.createdBy.email,
          };

          setAppointment(data);
        })
        .catch(() => console.error("ERROR AXIOS RESERVATION"));
    } else {
      setEditing(false);
    }

    axios
      .get(`http://localhost:3001/api/branches/allBranches`)
      .then((result) => {
        setBranches(result.data);
      })
      .catch(() => console.error("NO BRANCHES AVAILABLE"));
  }, [reservationId]);
  // const selectedDate = reservationId ? new Date(appointment.date) : null;
  //---------------------------------------------
  const [branchName, setBranchName] = React.useState("");
  //-------------------------------------------------------------
  const [branchId, setBranchId] = React.useState(0);
  const [schedule, setSchedule] = React.useState("");

  //---------------------------------------
  const steps = [
    "Elegí tu sucursal",
    "Seleccioná el día",
    "Completá el formulario",
  ];
  //----------------------------------------------------------

  const [activeStep, setActiveStep] = React.useState(
    reservationId ? steps.length : 0
  );
  //--------------------------------------------------------

  function handleSelection(e) {
    e.preventDefault();
    if (reservationId) setActiveStep(0);
    const [id, name, capacity, openingTime, closingTime] =
      e.target.value.split("-");
    setOpeningTime(openingTime);
    setBranchName(name);
    setBranchId(id);
    setCapacity(capacity);
    const timeSlots = calculateTimeSlots(openingTime, closingTime, capacity);
    setSchedules(timeSlots);
    const daysWithAppointments = [];
    const allAppointmentsOnBranch = [];
    axios
      .get(`http://localhost:3001/api/appointments/confirmed/${id}`)
      .then((result) => {
        result.data.forEach((appointment) => {
          allAppointmentsOnBranch.push(appointment);
          daysWithAppointments.push(appointment.date);
        });
        let appointmentsByDay = {};
        let notAvailableDate = [];
        OcurrencyChecker(daysWithAppointments, appointmentsByDay);
        for (const day in appointmentsByDay) {
          if (timeSlots.length * capacity <= appointmentsByDay[day]) {
            notAvailableDate.push(day);
          }
        }
        setReservations(allAppointmentsOnBranch);
        setReservedDay(notAvailableDate);
      });

    handleNext();
    setEnabled(true);
  }
  function handleDaySelector(e) {
    setDate(e.$d);

    const today = dateConversor(todayGetter()).toString().slice(0, 5);
    const todayCalendar = dateConversor(e.$d).toString().slice(0, 5);

    let fulfilledSlots = [];
    reservations.forEach((appointment) => {
      if (dateComparator(e.$d, appointment.date))
        fulfilledSlots.push(appointment.schedule.slice(0, 5));
    });
    let schedulesCounter = {};
    OcurrencyChecker(fulfilledSlots, schedulesCounter);

    const filteredSchedules = schedules.filter((schedule) => {
      if (today === todayCalendar) {
        return (
          fulfilledSlots.indexOf(schedule) === -1 && hourGetter() < schedule
        );
      } else {
        return fulfilledSlots.indexOf(schedule) === -1;
      }
    });

    for (const schedule in schedulesCounter) {
      if (schedulesCounter[schedule] === capacity - 1) {
        filteredSchedules.push(
          schedule + "   Último turno disponible en este horario!!"
        );
      } else if (schedulesCounter[schedule] === capacity - 2) {
        filteredSchedules.push(
          schedule + "   Últimos 2 turnos disponibles en este horario!!"
        );
      } else if (schedulesCounter[schedule] < capacity - 1) {
        filteredSchedules.push(schedule);
      }
    }
    if (filteredSchedules.length < 1) {
      setPopupInfo({
        title: `Error en la reserva`,
        text: `Ocurrio un error, intente nuevamente.`,
        img: false,
        bottonText: `Aceptar`,
        redirect: true,
      });
      logicPopUp(".body", "add", "external-div-container-inactive");
      logicPopUp(
        ".fake-container-popup",
        "remove",
        "fake-container-popup-inactive"
      );
      logicPopUp(".fake-container-popup", "add", "fake-container-popup-active");
    }
    setSchedules(filteredSchedules.sort());
    handleNext();
  }

  function handleScheduleSelection(e) {
    e.preventDefault();
    let selectedSchedule;
    if (e.target.value.match(/([A-Za-z¡!])/g)) {
      selectedSchedule = e.target.value.slice(0, 8);
    } else {
      selectedSchedule = e.target.value;
    }
    setSchedule(selectedSchedule);
  }

  const [data, setData] = React.useState({
    telephone: appointment.telephone,
  });

  function handleChanges(e) {
    e.preventDefault();
    const { name } = e.target;

    setData((prevState) => {
      return { ...prevState, [name]: e.target.value };
    });
    setEnabled(true);
  }

  const inputs = {
    branchId,
    branchName,
    schedule,
    date,
    fullname: user.fullname,
    email: user.email,
    ...data,
  };
  const logicPopUp = (tag, option, className) => {
    document.querySelector(tag).classList[option](className);
  };

  //FUNCION HANDLE-SUBMIT--------------------------------------------------------
  function handleSubmit(e) {
    e.preventDefault();
    if (!data.telephone) {
      toast.error("DEBE INGRESAR UN TELÉFONO", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
    axios
      .post("http://localhost:3001/api/users/newAppointment", { ...inputs })
      .then((res) => {
        setReservationIdParams(res.data.reservationId);
        sendConfirmationEmail(
          inputs.email,
          inputs.branchName,
          res.data.date,
          res.data.schedule
        );
        dispatch(login({ ...user, telephone: data.telephone }));
        return res.data.reservationId;
      })
      .then((response) => {
        setPopupInfo({
          title: `Turno reservado con exito`,
          text: `Gracias por confiar en nuestro servicio`,
          img: true,
          redirect: `/client/reservationConfirmed/${response}`,
        });
        logicPopUp(".body", "add", "external-div-container-inactive");
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
      .catch(() =>
        toast.error("ERROR EN EL INGRESO DE DATOS", {
          position: toast.POSITION.TOP_CENTER,
        })
      );
  }

  //HANDLE-EDITION------------------------------------------
  function handleEdition(e) {
    e.preventDefault();
    const toPut = { reservationId: reservationId, email: appointment.email };
    for (const key in inputs) {
      if (inputs[key] && inputs[key] !== appointment[key]) {
        toPut[key] = inputs[key];
      }
    }
    axios
      .put("http://localhost:3001/api/users/newAppointment", {
        ...toPut,
      })
      .then((resp) => {
        axios.post("http://localhost:3001/api/nodeMailer/appointment/EditConfirmation",{
          email:user.email,
          reservationId:toPut.reservationId,
          date:resp.data[1][0].date.split("T")[0],
          time:resp.data[1][0].schedule.split(':').slice(0, 2).join(':')
        }).then((res)=>console.log("email enviado"))
        .catch((error)=>console.log(error))
        
        setPopupInfo({
          title: `Turno modificado con exito`,
          text: `Gracias por confiar en nuestro servicio`,
          img: true,
          redirect: `/client/reservationConfirmed/${reservationId}`,
        });
        logicPopUp(".body", "add", "external-div-container-inactive");
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
        dispatch(login({ ...user, telephone: data.telephone }));
      })
      .catch(() =>
        toast.error("VERIFIQUE QUE LOS DATOS SEAN CORRECTOS", {
          position: toast.POSITION.TOP_CENTER,
        })
      );
  }
  if (Countdown().props.children === "Tiempo agotado") {
    if (!popupInfo.title) {
      setPopupInfo({
        title: `Se acabo el tiempo`,
        text: `Haga click en el boton continuar para empezar nuevamente`,
        img: false,
        redirect: true,
      });
    }
    logicPopUp(".body", "add", "external-div-container-inactive");
    logicPopUp(
      ".fake-container-popup",
      "remove",
      "fake-container-popup-inactive"
    );
    logicPopUp(".fake-container-popup", "add", "fake-container-popup-active");
  }
  const sendConfirmationEmail = (email, branch, date, time) => {
    date = date.slice(0, 10);
    time = time.slice(0, 5);
    axios
      .post(
        "http://localhost:3001/api/nodeMailer/appointment/confirmation",
        { email, branch, date, time },
        {
          withCredentials: true,
        }
      )
      .then(() => {})
      .catch((err) => console.error(err));
  };
  return (
    <div>
      <Box
        className="body"
        sx={{
          height: "85vh",
          width: "fixed",
          paddingTop: "2.5%",
          paddingLeft: "10%",
          backgroundColor: " #f1ebeb",
          overflow: "hidden",
          margin: "auto",
        }}
      >
        {" "}
        <h1
          className="title"
          style={{ display: "flex", alignItems: "flex-start" }}
        >
          Hacer una reserva
        </h1>
        <Grid
          container
          sx={{
            width: "fixed",
            height: "auto",
          }}
          rowSpacing={1}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        >
          <Grid
            item
            xs={5}
            sx={{
              backgroundColor: "white",
              padding: "32px 40px 32px 40px",
            }}
          >
            <Stack
              direction="row"
              useFlexGap
              flexWrap="wrap"
              marginTop={"5px"}
              spacing={{ xs: 1, sm: 2, md: 4 }}
              justifyContent={"space-between"}
            >
              {" "}
              <div
                className="title-panel"
                style={{ fontWeight: "bold", paddingBottom: "10px" }}
              >
                Reserva
              </div>{" "}
              {activeStep > 0 && (
                <Button
                  variant="contained"
                  sx={{
                    color: "white",
                    background: "#a442f1",
                    transition: "all 0.7s ease",
                    "&:hover": {
                      background: "#7412be ",
                      transform: "scale(1.05)",
                    },
                  }}
                  onClick={() =>
                    activeStep === 1
                      ? window.location.reload()
                      : setActiveStep(1)
                  }
                >
                  Volver
                </Button>
              )}
            </Stack>
            {activeStep === 0 ? (
              <div className="tx-panel">Selecciona tu sucursal</div>
            ) : (
              ""
            )}
            {activeStep === 1 ? (
              <div className="tx-panel">Selecciona el día en el calendario</div>
            ) : (
              ""
            )}
            {activeStep > 1 ? (
              <div className="tx-panel">Completá el formulario</div>
            ) : (
              ""
            )}
            <Stepper
              activeStep={activeStep}
              alternativeLabel
              sx={{
                marginTop: "10%",
                marginBottom: "5px",
                marginRight: "5%",
                marginLeft: "5%",
              }}
            >
              {steps.map((label) => (
                <Step
                  key={label}
                  sx={{
                    "& .MuiStepLabel-root .Mui-completed": {
                      color: "green",
                    },
                    "& .MuiStepLabel-root .Mui-active": {
                      color: "secondary.main",
                    },
                  }}
                >
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            <FormControl
              xs={12}
              sx={{
                display: "flex",

                width: "100%",
                padding: "12px 12px 8px 12px",
              }}
            >
              <FormLabel
                xs={12}
                sx={{
                  fontWeight: "bolder",
                }}
              >
                Sucursal
              </FormLabel>

              {activeStep >= 0 ? (
                <select
                  xs={12}
                  style={{
                    width: "100",
                    height: "30px",

                    padding: "5px",
                  }}
                  onChange={handleSelection}
                  disabled={enabled}
                  className="inputLogin"
                >
                  <option value="" style={{ display: "none" }}>
                    {reservationId
                      ? `${appointment.branchName} es tu sucursal elegida. Confirmala o elegí una nueva:`
                      : "Elegí una sucursal:"}
                  </option>
                  {branches.map((branch) => (
                    <option
                      key={branch.id}
                      value={`${branch.id}-${branch.name}-${branch.capacity}-${branch.openingTime}-${branch.closingTime}`}
                    >
                      {branch.name}
                    </option>
                  ))}
                </select>
              ) : (
                ""
              )}
              <br />
              {activeStep >= 2 && (
                <div
                  xs={12}
                  sx={{
                    width: "100%",
                    height: "auto",
                    fontWeight: "bolder",
                    marginBottom: "10px",
                    padding: "5px",
                  }}
                >
                  <FormLabel
                    xs={12}
                    id="filled-full-width"
                    sx={{
                      width: "100%",
                      fontWeight: "bolder",
                      marginBottom: "20px",
                      padding: "5px",
                    }}
                  >
                    Horario
                    <br />
                    <select
                      style={{ width: "100%", height: "35px" }}
                      onChange={handleScheduleSelection}
                      className="inputLogin"
                    >
                      <option value="" style={{ display: "none" }}>
                        {!enabled
                          ? ` ${appointment.schedule} `
                          : "Elegí un horario"}
                      </option>
                      {schedules.map((schedule) => (
                        <option key={schedule} value={schedule}>
                          {schedule}
                        </option>
                      ))}
                    </select>
                  </FormLabel>
                  <br />
                  <Grid
                    container
                    sx={{
                      width: "100%",
                      display: "flex",
                      alignItems: "baseline",
                      marginTop: "15px",
                    }}
                  >
                    <Grid item xs={6}>
                      <FormLabel
                        sx={{
                          marginTop: "15px",
                          fontWeight: "bolder",
                        }}
                      >
                        Nombre y Apellido
                      </FormLabel>

                      <br />

                      <input
                        style={{ width: "90%", height: "30px" }}
                        name="fullname"
                        defaultValue={
                          reservationId ? appointment.fullname : user.fullname
                        }
                        type="text"
                        className="form-control inputLogin"
                        readOnly
                        onChange={handleChanges}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <FormLabel
                        style={{
                          marginTop: "15px",

                          fontWeight: "bolder",
                        }}
                      >
                        Telefono
                      </FormLabel>
                      <br />
                      <input
                        style={{ width: "100%", height: "30px" }}
                        name="telephone"
                        defaultValue={
                          reservationId ? appointment.telephone : ""
                        }
                        readOnly={reservationId ? true : false}
                        type="text"
                        className="inputLogin"
                        onChange={handleChanges}
                      />{" "}
                    </Grid>
                  </Grid>
                  <br />

                  <FormLabel sx={{ marginTop: "10px", fontWeight: "bolder" }}>
                    Mail
                  </FormLabel>
                  <br />
                  <input
                    style={{ width: "100%", height: "30px" }}
                    name="email"
                    defaultValue={
                      reservationId ? appointment.email : user.email
                    }
                    type="text"
                    className="form-control inputLogin"
                    readOnly
                    onChange={handleChanges}
                  />
                  {reservationId ? (
                    <Button
                      variant="contained"
                      enabled
                      onClick={handleEdition}
                      className="button-confirm-reservation-panel"
                      sx={{
                        marginTop: "5%",
                        marginBottom: "5%",
                        background: "#a442f1",
                        transition: "all 0.7s ease",
                        "&:hover": {
                          background: "#7412be ",
                          transform: "scale(1.05)",
                        },
                      }}
                    >
                      Confirmar edición
                    </Button>
                  ) : (
                    <Button
                      variant="contained"
                      disabled={activeStep < 2 || !enabled}
                      onClick={handleSubmit}
                      className="button-confirm-reservation-panel"
                      sx={{
                        marginTop: "5%",
                        marginBottom: "5%",
                        background: "#a442f1",
                        transition: "all 0.7s ease",
                        "&:hover": {
                          background: "#7412be ",
                          transform: "scale(1.05)",
                        },
                      }}
                    >
                      Confirmar reserva
                    </Button>
                  )}
                </div>
              )}
            </FormControl>
          </Grid>
          <Grid xs={1}></Grid>

          <Grid
            item
            xs={5}
            sx={{
              backgroundColor: "white",
              display: "flex",
              alignItems: "center",
              alignContent: "center",
              height: "400px",
              width: "fixed",
            }}
          >
            {activeStep === 1 || editing ? (
              <LocalizationProvider dateAdapter={AdapterDayjs} id="calendar">
                <DateCalendar
                  sx={{
                    "& .css-jgls56-MuiButtonBase-root-MuiPickersDay-root.Mui-selected":
                      {
                        color: "#fff",
                        backgroundColor: "#a442f1",
                        fontWeight: 500,
                      },
                    "& .css-1u23akw-MuiButtonBase-root-MuiPickersDay-root.Mui-selected":
                      {
                        backgroundColor: "#a442f1",
                      },
                  }}
                  disablePast
                  onChange={handleDaySelector}
                  shouldDisableDate={(day) =>
                    reservedDay.some((date) => dateComparator(day.$d, date)) ||
                    day.$d.getDay() === 0
                  }
                  // defaultValue={selectedDate}
                />
              </LocalizationProvider>
            ) : (
              <LocalizationProvider dateAdapter={AdapterDayjs} id="calendar">
                <DateCalendar
                  sx={{
                    "& .css-jgls56-MuiButtonBase-root-MuiPickersDay-root.Mui-selected":
                      {
                        backgroundColor: "#a442f1",
                      },
                    "& .css-1u23akw-MuiButtonBase-root-MuiPickersDay-root.Mui-selected":
                      {
                        backgroundColor: "#a442f1",
                      },
                  }}
                  disabled
                />
              </LocalizationProvider>
            )}
          </Grid>
        </Grid>
        <Grid
          container
          sx={{
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Button
            sx={{
              position: "fixed",
              bottom: "6%",
              right: "8%",
              backgroundColor: "#a442f1",
              color: "white",
              borderRadius: "12px",
              transition: "all 0.7s ease",
              transition: "transform 1.2s ease",
              "&:hover": {
                backgroundColor: "#8631c7",
                transform: "rotate(360deg) scale(1.3)",
              },
            }}
          >
            <Countdown />
          </Button>
        </Grid>
      </Box>
      <Popup popupInfo={popupInfo} />
      <ToastContainer />
    </div>
  );
}
//FUNCIONES AUXILIARES----------------------------------
function dateComparator(frontDate, backDate) {
  const newFrontDate = dateConversor(frontDate);
  const newBackDate = dateConversor(backDate);
  return dateConversor(frontDate) === dateConversor(backDate);
}
function dateConversor(date) {
  const materialUidate = new Date(date);
  const materialUiTime = materialUidate.getTime();
  return materialUiTime;
}
function hourGetter() {
  const now = new Date();
  const currentHour = now.getHours().toString().padStart(2, "0");
  const currentMinutes = now.getMinutes().toString().padStart(2, "0");
  return `${currentHour}:${currentMinutes}`;
}
function todayGetter() {
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth() + 1;
  const currentDay = today.getDate();
  return `${currentYear}-${currentMonth}-${currentDay}`;
}

function calculateTimeSlots(openingTime, closingTime, capacity) {
  let startTime;
  openingTime[0] === "0"
    ? (startTime = openingTime.slice(1, 2))
    : (startTime = openingTime.slice(0, 2));
  const endTime = closingTime.slice(0, 2);
  const availableSlotsForCapacityOfOne = Math.abs(
    parseInt(openingTime) - parseInt(closingTime)
  );

  const totalSlots = Math.floor(60 / 15) * availableSlotsForCapacityOfOne;
  const timeSlots = [];

  for (let i = 0; i < totalSlots; i++) {
    const hour = Math.floor((i * 15) / 60) + parseInt(startTime);
    const minute = (i * 15) % 60;

    const formattedHour = hour.toString().padStart(2, "0");
    const formattedMinute = minute.toString().padStart(2, "0");

    timeSlots.push(`${formattedHour}:${formattedMinute}`);
  }

  return timeSlots;
}

function OcurrencyChecker(array, object) {
  return array.forEach((x) => {
    object[x] = (object[x] || 0) + 1;
  });
}
