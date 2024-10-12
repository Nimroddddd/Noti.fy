import React from "react";
import TextField from '@mui/material/TextField';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import InputAdornment from '@mui/material/InputAdornment';
import { PropaneSharp } from "@mui/icons-material";

function InputArea(props) {


  return (
    <div className="input-area">
      <TextField slotProps={{
            input: {
              endAdornment: <InputAdornment position="end"><div className="add-icon"><Fab size="small" color="secondary"><AddIcon onClick={props.onAdd} /></Fab></div></InputAdornment>,
            },
          }}
      id="standard-basic" label="Note" variant="standard" value={props.value} onChange={props.handleInputChange} />
      
    </div>
  )
}

export default InputArea;