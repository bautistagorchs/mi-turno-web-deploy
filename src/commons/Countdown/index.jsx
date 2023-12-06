import React, { useEffect, useRef, useState } from "react";

//cuenta regresiva

export default function Countdown() {
  const [countdown, setCountdown] = useState(300);
  const timerId = useRef();

  const formatTime = (time) => {
    let minutes = Math.floor(countdown / 60);
    let seconds = Math.floor(countdown - minutes * 60);
    if (seconds < 10) seconds = "0" + seconds;
    return `QUEDAN 0${minutes}:${seconds}`;
  };

  useEffect(() => {
    timerId.current = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timerId.current);
  }, []);

  useEffect(() => {
    if (countdown <= 0) {
      clearInterval(timerId.current);
    }
  }, []);

  return <p>{countdown >= 0 ? formatTime(countdown) : "Tiempo agotado"}</p>;
}
