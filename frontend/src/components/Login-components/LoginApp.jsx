import React from "react";
import Login from "./Login/Login";
import Header from "../app-components/Header";
import Footer from "../app-components/Footer";

function LoginApp (props) {

  
  return (
    <div>
      <Header loggedIn={props.loggedIn} />
      <Login authentication={props.authentication} />
      <Footer />
    </div>
  )
}

export default LoginApp;