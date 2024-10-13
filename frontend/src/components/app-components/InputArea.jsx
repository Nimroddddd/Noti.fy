import React from "react";
import TextField from '@mui/material/TextField';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import InputAdornment from '@mui/material/InputAdornment';
import Zoom from '@mui/material/Zoom';
import { createTheme, ThemeProvider } from '@mui/material/styles';





function InputArea(props) {

  const custom = createTheme({
    palette: {
      cyan: {
        main: '#0b0c10',
        light: 'yellow',
        dark: '#6699CC',
        contrastText: '#66fcf1',
      },
    },
  });

  function handleEnter(event) {
    if (event.key === "Enter") {
      props.onAdd()
    }
  }


  return (  
    <div className="input-area">
      <ThemeProvider theme={custom} >
        <TextField 
            slotProps={{
                input: {
                  endAdornment: <InputAdornment position="end"><div className="add-icon"><Zoom in={true}><Fab size="small" color="cyan"><AddIcon onClick={props.onAdd} /></Fab></Zoom></div></InputAdornment>,
                },
            }}
            id="standard-basic" 
            label="Note"
            variant="outlined" 
            value={props.value} 
            onChange={props.handleInputChange} 
            autoFocus={true} 
            style={{backgroundColor: "#66fcf1",}}
            onKeyDown={handleEnter}
          />
        </ThemeProvider>
    </div>
  )
}

export default InputArea;