import Stack from '@mui/material/Stack';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import BusinessCenterOutlinedIcon from '@mui/icons-material/BusinessCenterOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import FeedOutlinedIcon from '@mui/icons-material/FeedOutlined';
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import { NavLink } from 'react-router-dom';
import '../appStyle.css';

//Crea el menu para desplazarnos por la aplicación
function AdminSideBar(){
    return(
        // Mostramos componentes de forma VerticalAlignBottom, indicamos una separacion(spacing) de 0
        <Stack spacing={0}>
            {/* Usamos componente de router-dom, funciona como etiqueta <a/>, indicamos a donde nos redirige, si la ruta es la actual(isActive) ponemos clase active */}
            <NavLink  to="/admin/panel" 
                className={({ isActive }) => (isActive ? 'item-menu active' : 'item-menu inactive')}>
                {/* Usamos componente icono de material */}
                <DashboardOutlinedIcon />
                {/* Indicamos texto a mostrar */}
                <p>Panel</p>
            </NavLink>
            <NavLink  to="/admin/empleado" 
                className={({ isActive }) => (isActive ? 'item-menu active' : 'item-menu inactive')}>
                <PersonOutlineOutlinedIcon />
                <p>Empleados</p>
            </NavLink>
            <NavLink  to="/admin/alumno" 
                className={({ isActive }) => (isActive ? 'item-menu active' : 'item-menu inactive')}>
                <SchoolOutlinedIcon />
                <p>Alumnos</p>
            </NavLink>
            <NavLink  to="/admin/maestro" 
                className={({ isActive }) => (isActive ? 'item-menu active' : 'item-menu inactive')}>
                <BusinessCenterOutlinedIcon />
                <p>Maestros</p>
            </NavLink>
            <NavLink  to="/admin/bitacora" 
                className={({ isActive }) => (isActive ? 'item-menu active' : 'item-menu inactive')}>
                <AccessTimeOutlinedIcon />
                <p>Bitácora</p>
            </NavLink>
            <NavLink  to="/admin/avisos" 
                className={({ isActive }) => (isActive ? 'item-menu active' : 'item-menu inactive')}>
                <FeedOutlinedIcon />
                <p>Avisos</p>
            </NavLink>
            <NavLink  to="/admin/bolsaTrabajo" 
                className={({ isActive }) => (isActive ? 'item-menu active' : 'item-menu inactive')}>
                <WorkOutlineOutlinedIcon />
                <p>Bolsa de trabajo</p>
            </NavLink>
            <NavLink  to="/admin/configuracion" 
                className={({ isActive }) => (isActive ? 'item-menu active' : 'item-menu inactive')}>
                <SettingsOutlinedIcon />
                <p>Configuración</p>
            </NavLink>
            <NavLink  to="/admin/errores" 
                className={({ isActive }) => (isActive ? 'item-menu active' : 'item-menu inactive')}>
                <ErrorOutlineOutlinedIcon />
                <p>Errores</p>
            </NavLink>
        </Stack>
    )
}
export default AdminSideBar;