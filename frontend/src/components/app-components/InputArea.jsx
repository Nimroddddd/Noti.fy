import React from "react";
import TextField from '@mui/material/TextField';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import InputAdornment from '@mui/material/InputAdornment';
import Zoom from '@mui/material/Zoom';



function InputArea(props) {

  function handleEnter(event) {
    if (event.key === "Enter") {
      props.onAdd()
    }
  }


  return (
    <div className="input-area">
      <TextField 
          slotProps={{
              input: {
                endAdornment: <InputAdornment position="end"><div className="add-icon"><Zoom in={true}><Fab size="small" color="info"><AddIcon onClick={props.onAdd} /></Fab></Zoom></div></InputAdornment>,
              },
          }}
          id="standard-basic" 
          label="Note" 
          variant="standard" 
          value={props.value} 
          onChange={props.handleInputChange} 
          autoFocus={true} 
          style={{backgroundColor: "#66fcf1"}}
          onKeyDown={handleEnter}
        />
      
    </div>
  )
}

export default InputArea;