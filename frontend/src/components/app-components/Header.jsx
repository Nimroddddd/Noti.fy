import React from "react";
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import { SplitText } from "../Login-components/Login/Welcome/SplitText";

function Header(props) {

 
  return (
    <div className="header">
      <div>
        <AutoStoriesIcon fontSize="large"/>
        <h1>Noti.fy</h1>
      </div>
      {props.loggedIn && <h2>Welcome back, {props.user}!</h2>}
    </div>
  )
}

export default Header;