import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { useState } from 'react';
import { User } from '../types/types';
import AppMenu from './AppMenu';

interface params{
    userData:User
}

export default function ButtonAppBar({userData}:params) {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };


  return (
    <Box sx={{ flexGrow: 1,width:'100%'}}>
      <AppBar  position="static">
        <Toolbar sx={{width:'100%',display:'flex',justifyContent:'space-around'}}>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={handleClick}
           > 
            <MenuIcon />
          </IconButton>
          <AppMenu handleClose={handleClose} anchorEl={anchorEl}/>
          <Typography  component="div" sx={{ flexGrow: 1 }}>
            ניהול בוטים
          </Typography>
          {userData&&< Typography component="div" sx={{ flexGrow: 0,mr:1}}>
           {userData.userName}
          </Typography>}
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
             <AccountCircle />
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
