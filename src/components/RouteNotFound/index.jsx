import { useNavigate } from "react-router";
import "./index.scss";
const RouteNotFound = function (){

const navigate = useNavigate()

const handleNavigateHome =()=>{
navigate("/")
}
return(
  <div className="bodyRouteNotFound" >
    <div className="contentNotFound">

       <h1 data-text="404"  className="title404">404</h1>

       <h4 className="textError">Opps! Página no encontrada</h4>
       <p className="textInfo">verifica que hayas ingresado a la ruta correcta o que tengas la autorizacion necesaria para ingresar </p>
       <div onClick={handleNavigateHome} className="btn-returnHome"><a> home </a></div>
    </div>
  </div>
)



}

export default RouteNotFound;