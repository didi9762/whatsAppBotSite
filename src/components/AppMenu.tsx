import {Menu,MenuItem } from "@mui/material";
import { Link } from "react-router-dom";

const linkStyle = {textDecoration: 'none',
color: 'inherit',}

 interface params {
    anchorEl:null | HTMLElement,
    handleClose:()=>void
 }

const AppMenu = ({anchorEl,handleClose}:params) => {
    const open = Boolean(anchorEl);
  


  return (
    <Menu
    id="basic-menu"
    anchorEl={anchorEl}
    open={open}
    onClose={handleClose}
    MenuListProps={{
      'aria-labelledby': 'basic-button',
    }}
  >
    <MenuItem onClick={handleClose}><Link style={linkStyle} to={'whatsAppBotSite'}> ניהול בוטים</Link></MenuItem>
    <MenuItem onClick={handleClose}><Link style={linkStyle} to={'whatsAppBotSite/NewBot'}> New Bot</Link></MenuItem>
    <MenuItem onClick={handleClose}>Logout</MenuItem>
  </Menu>
  )
};

export default AppMenu;
