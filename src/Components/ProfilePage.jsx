import React, { useContext } from "react";
import { UserContext } from "../providers/UserProvider";
import { auth } from "../firebase";
import { Router, Link } from "@reach/router";
import 'bootswatch/dist/lumen/bootstrap.min.css';

import Info from "./Home/Info"
import Contacto from "./Home/Contacto"
import Help from "./Home/Help"
import User from "./Home/User"
import Empleado from "./Home/Empleado"
import EmpleadoForm from "./Home/EmpleadoForm"

const ProfilePage = () => {

  // Asigna un user para leer el contexto del tema actual.
  // React encontrará el Provider superior más cercano y usará su valor.
  const user = useContext(UserContext);

  const { photoURL, displayName, email } = user;
  console.log(" Usuario ProfilePage : " + displayName + " - " + email);

  const signOut = () => {
    auth.signOut();  
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <div className="navbar-header">
            <a className="navbar-brand" href="/">Business</a>
          </div>
          <ul className="nav navbar-nav">
            <li className="navbar-brand"><Link to="/">Inicio</Link></li>
            <li className="navbar-brand"><Link to="info">Info</Link></li>
            <li className="navbar-brand"><Link to="contacto">Contacto</Link></li>
            <li className="navbar-brand"><Link to="user">Usuario</Link></li>
            <li className="navbar-brand"><Link to="help">Ayuda</Link></li>
            <li className="navbar-brand"><Link to="empleado">Empleado</Link></li>
            <button className="btn btn-danger" onClick={() => { signOut() }}>
              Sign out</button>
          </ul>
        </div>
      </nav>
      <Router>
        <Info exact path="info" />
        <Contacto exact path="contacto" />
        <Help exact path="help" />
        <User exact path="user" />
        <Empleado exact path="empleado" />
      </Router>

      <div className="container">
        
      </div>
          </div>
  )
};

export default ProfilePage;