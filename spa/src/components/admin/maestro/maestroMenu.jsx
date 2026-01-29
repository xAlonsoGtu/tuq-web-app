
import { useState } from 'react';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import QrCodeOutlinedIcon from '@mui/icons-material/QrCodeOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import ToggleOnOutlinedIcon from '@mui/icons-material/ToggleOnOutlined';

export function MaestroMenu({maestro}){
    function handleEditar(){
        console.log(maestro)
        setAnchorEl(null);
    };

    function handleQrcode(){
        console.log(maestro)
        setAnchorEl(null);
    };

    function handleEliminar(){
        console.log(maestro)
        setAnchorEl(null);
    };
    
    //Codigo para mostar menu
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
                          <IconButton 
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}>
                            <MoreVertOutlinedIcon />
                          </IconButton>
                                <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={()=>handleEditar()}>
          <ListItemIcon>
            <EditOutlinedIcon fontSize="small" />
          </ListItemIcon>
          Editar
        </MenuItem>
        <MenuItem onClick={()=>handleEditar()}>
          <ListItemIcon>
            <ToggleOnOutlinedIcon fontSize="small" />
          </ListItemIcon>
          Desactivar
        </MenuItem>
        <MenuItem onClick={()=>handleQrcode()}>
          <ListItemIcon>
            <QrCodeOutlinedIcon fontSize="small" />
          </ListItemIcon>
          QR Code
        </MenuItem>
        <MenuItem onClick={()=>handleEliminar()}>
          <ListItemIcon>
            <DeleteOutlineOutlinedIcon fontSize="small" />
          </ListItemIcon>
          Eliminar
        </MenuItem>
      </Menu>        
        </>
    )
}