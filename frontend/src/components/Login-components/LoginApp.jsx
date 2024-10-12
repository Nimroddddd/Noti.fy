import React from "react";
import Login from "./Login/Login";
import Header from "../app-components/Header";

function LoginApp (props) {
  return (
    <div>
      <Header loggedIn={props.loggedIn} />
      <Login authentication={props.authentication} />
    </div>
  )
}

export default LoginApp;