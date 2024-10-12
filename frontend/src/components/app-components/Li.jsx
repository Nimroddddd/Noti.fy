import React from "react";
import Checkbox from '@mui/material/Checkbox';
import DoneAllIcon from '@mui/icons-material/DoneAll';

function Li(props) {


  return (
    <div>
      <li>{props.value}<Checkbox size="medium" onChange={props.handleComplete} icon={<DoneAllIcon />} checked={false}  /></li>
    </div>
  )
}

export default Li;