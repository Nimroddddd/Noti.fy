import React from "react";
import Checkbox from '@mui/material/Checkbox';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import { createTheme, ThemeProvider } from '@mui/material/styles';

function Li(props) {

  const custom = createTheme({
    palette: {
      cyan: {
        main: '#fff',
        light: 'yellow',
        dark: '#6699CC',
        contrastText: '#66fcf1',
      },
    },
  });

  return (
    <div>
      <ThemeProvider theme={custom}>
        <li>{props.value}<Checkbox  size="medium" onChange={props.handleComplete} icon={<DoneAllIcon color="cyan" />} checked={false} /></li>
      </ThemeProvider>
    </div>
  )
}

export default Li;