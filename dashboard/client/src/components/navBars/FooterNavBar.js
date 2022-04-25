import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';

export default function BottomAppBar() {
  return (
    <React.Fragment>
      <CssBaseline />

      <AppBar position="fixed" sx={{ top: 'auto', bottom: 0 }}>
        <Toolbar className="main-color"></Toolbar>
      </AppBar>
    </React.Fragment>
  );
}
