//Librerias react y route
import * as React from 'react';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

//Librerias material
import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import Toolbar from '@mui/material/Toolbar';
import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import { deepOrange } from '@mui/material/colors';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import Logout from '@mui/icons-material/Logout';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import QrCodeOutlinedIcon from '@mui/icons-material/QrCodeOutlined';

//Componentes y servicios propios
import { UsuarioAuthContext } from './usuarioLayout';
import { removeSession } from '../utils/services/session.service';
import { getTipoUsuario } from '../utils/constants/constantsCatalogo';
import '../appStyle.css';

//Estilo material para el componente avatar
const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: '#44b700',
    color: '#44b700',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
  }
}));

//Componente AppBar, recibe props del padre
function UsuarioAppBar(){
  //Usamos hook de react para usar la función contexto
  const usuarioAuth = useContext(UsuarioAuthContext);
  
  //Creamos objeto de router-dom para redirigirnos a otras partes de la aplicación
  const navigate = useNavigate();

  //Propiedades para mostrar/ocultar menu del perfil
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  //Función de logout
  function handleLogout(e){
    //Remueve valores de sessión y obtiene la siguiente ruta a dirigirnos
    var urlLogout = removeSession();
    //Navegamos a la ruta siguiente (login) remplazando posición actual
    navigate(urlLogout, { replace: true });
  }

  return (
    // Componente Bar de material
    <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }} className='app-bar'>
      {/* Espacio del toolbar */}
      <Toolbar>
        {/* Box div que ocupa todo el espacio sobrante */}
        <Box sx={{ flexGrow: 1 }}>
          {/* Div que pone los elementos de forma horizontal(row) */}
          <Stack direction="row" spacing={2}>
            {/* Logo */}
            <a href="./">
              <img src={process.env.PUBLIC_URL+'/media/logo.png'} className="app-bar-logo" alt="logo" />
            </a>
          </Stack>                      
        </Box>

        {/* Box div que ocupa el espacio del final, sólo lo necesario */}
        <Box sx={{ flexGrow: 0 }}>
          {/* Div que pone los elementos de forma horizontal(row) */}
          <Stack direction="row" spacing={2}>
          {/* Div donde ponemos los datos del usuario, se oculta en tamaño xs */}
            <Box className='app-bar-datos' sx={{ display: { xs: 'none', sm: 'block' } }}>
              {/* Si hay datos, mostramos el usuario */}
              <p>{usuarioAuth ? usuarioAuth.user : ""}</p>
              {/* Obtenemos el tipo de usuario */}
              <span>{getTipoUsuario(usuarioAuth.tipo)}</span>
            </Box>
            {/* Componente tooltip de material */}
            <Tooltip title="Perfil del usuario">
              {/* Icono boton */}
              <IconButton
                onClick={handleClick}
                size="small" style={{width:"59px", height:"59px"}}
                sx={{ ml: 2 }}
                aria-controls={open ? 'account-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
              >
                {/* Estilo ciruclo verde */}
                <StyledBadge
                  overlap="circular"
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                  variant="dot">
                    {/* Componente avatar */}
                  <Avatar sx={{ bgcolor: deepOrange[500] }} className='app-bar-avatar'>U</Avatar>
                </StyledBadge>   
              </IconButton>
            </Tooltip> 
          </Stack>
        </Box>

        {/* Menu del perfil */}
        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          onClose={handleClose}
          slotProps={{
            paper: {
              elevation: 0,
              sx: {
                overflow: 'visible',
                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                mt: 1.5,
                '& .MuiAvatar-root': {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                '&::before': {
                  content: '""',
                  display: 'block',
                  position: 'absolute',
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: 'background.paper',
                  transform: 'translateY(-50%) rotate(45deg)',
                  zIndex: 0,
                },
              },
            },
          }}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          {/* Div de datos del usuario */}
          <Box className='app-bar-datos' style={{textAlign: "left"}}>
              <p>{usuarioAuth ? usuarioAuth.user : ""}</p>
              <span>{getTipoUsuario(usuarioAuth.tipo)}</span>
          </Box>
          <Divider />
          {/* Lista de acciones */}
          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <AccountCircleOutlinedIcon fontSize="small" />
            </ListItemIcon>
            Perfil
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <QrCodeOutlinedIcon fontSize="small" />
            </ListItemIcon>
            Código QR
          </MenuItem>
          <MenuItem onClick={handleLogout}>
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            Cerrar sesión
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}

export default UsuarioAppBar;