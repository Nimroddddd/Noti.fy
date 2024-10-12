import React from "react";
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import { SplitText } from "../Login-components/Login/Welcome/SplitText";

function Header(props) {

 
  return (
    <div className="header">
      <AutoStoriesIcon fontSize="large"/>
      <h1>My To-Do List</h1>
      {props.loggedIn && <h2 className="welcome-back">Welcome back, {props.user}!</h2>}
    </div>
  )
}

export default Header;