import React from "react";

const IndexPage = () => {
  return (
    <div className="div-index-page-container">
      <div className="div-index-page-content-container">
        <div className="div-index-page-content">
          <div className="div-text-index-page">
            <div className="div-header-index-page">
              <h2>Llego el futuro de los turnos</h2>
              <h1 id="scroll">Reserva - Administra - Gestiona</h1>
              <h3>todo en un mismo sitio</h3>
            </div>
            <div className="div-info-index-page">
              <div className="info-page-content">
                <h2>Que servicios ofrecemos?</h2>
                <ul>
                  <p>- Administrar todas tus citas en un mismo lugar</p>
                  <p>- Crear sucursales acorde a tus necesidades</p>
                  <p>- Designar operadores encargados de sucursales</p>
                  <p>- Gestionar altas y bajas de operadores</p>
                  <p>- Visualizacion metricas de reportes</p>
                </ul>
              </div>
            </div>
          </div>
          <div className="image-container">
            <img
              src="https://images.pexels.com/photos/4065892/pexels-photo-4065892.jpeg"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndexPage;
