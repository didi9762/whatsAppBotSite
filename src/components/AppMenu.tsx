import {Menu,MenuItem } from "@mui/material";


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
    <MenuItem onClick={handleClose}>Profile</MenuItem>
    <MenuItem onClick={handleClose}>My account</MenuItem>
    <MenuItem onClick={handleClose}>Logout</MenuItem>
  </Menu>
  )
};

export default AppMenu;
