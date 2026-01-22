
import { useState } from 'react';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Button from '@mui/material/Button';
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import toast from 'react-hot-toast';
import { useNavigate } from "react-router-dom";

import '../authStyle.css'
import { LoginForm } from '../../../models/auth/loginForm';
import { AuthService } from '../auth.service';
import { ConstantsCatalogos } from '../../../utils/constants/constantsCatalogo';
import { initSession } from '../../../utils/services/session.service';

//Componente react login
function LoginPage(){
    //Iniciamos estados de propiedades que usaremos en el componente
    const [user, setUser] = useState(''); //username del usuario
    const [pass, setPass] = useState(''); //password del usuario
    const [status, setStatus] = useState(''); //status de la peticion actual
    const [showPassword, setShowPassword] = useState(false); //indica si mostramos el password
    const navigate = useNavigate(); //objeto de router-dom para redirigirnos a otras partes de la aplicación
    const authService = new AuthService(); //Servicios/funciones del modulo auth

    //Funcion que modifica el estado del user
    function handleInputUser(e){
        setUser(e.target.value);
    }

    //Funcion que modifica el estado del password
    function handleInputPass(e){
        setPass(e.target.value);
    }

    //Funciones para mostrar/ocultar el password
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleMouseUpPassword = (event) => {
        event.preventDefault();
    };

    //Funcion asincrona del formulario que ejecuta el login
    async function handleSubmit(e) {
        //Previene comportamientos por default del form
        e.preventDefault();

        //Cambia el estado a cargando
        setStatus('cargando');
        try {
            //Creamos objeto con los datos del form
            var form = new LoginForm(user, pass);

            //Ejecutamos login enviandole el form y esperamos respuesta
            var res = await authService.login(form);

            //Si la respuesta es positiva
            if(res.success){
                //Iniciamos sesion con los datos obtenidos
                var nextPage = initSession(res.payload);

                //Navegamos a la sigueinte pagína
                navigate(nextPage);
            }else{
                //Si nos arrojo error lo mostramos
                if(res.error) toast.error(res.error);
                //De lo contrario arrojamos un error por defecto en el toast
                else toast.error(ConstantsCatalogos.ERROR_DEFAULT);
            }

            //Modificamos status a ok
            setStatus('ok');
        } catch (err) {
            //Si hay algun error lo monstramos
            setStatus('nok');
            toast.error(err)
        }
    }

    //Html que regresaremos
    return (
        // Div principal tipo contenedor con espacio entre componentes de 0
        <Grid container spacing={0}>
            {/* Div con tamñano de 5 */}
            <Grid size={{ xs: 0, md: 5 }}>
                <div className='bg-login-img'></div>
            </Grid>
            {/* Div con tamaño de 7, cuando es xs es tamaño 12 (full) */}
            <Grid container direction="row" size={{ xs: 12, md: 7 }} sx={{ 
                justifyContent: "center",
                alignItems: "center",
                }}>
                {/* Div del login */}
                <div className='box-login'>
                    <img src={process.env.PUBLIC_URL+'/media/logo.png'} className="App-logo-login" alt="logo" />
                    <br />
                    {/* Form submit */}
                    <form onSubmit={handleSubmit}>
                        {/* Div que mostrará los componentes en horizontal */}
                        <Stack spacing={3}>
                            <TextField fullWidth
                                variant="outlined" className='bg-white'
                                id="input-user" required 
                                label="Usuario" 
                                value={user} onChange={handleInputUser} 
                                slotProps={{
                                    input: {
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <PersonOutlineOutlinedIcon/>                                    
                                            </InputAdornment>
                                        ),
                                        },
                                    }}
                            />
                            <TextField fullWidth
                                variant="outlined" className='bg-white'
                                id="input-pass" required 
                                label="Contraseña" 
                                type={showPassword ? 'text' : 'password'}
                                value={pass} onChange={handleInputPass} 
                                slotProps={{
                                    input: {
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label={
                                                        showPassword ? 'hide the password' : 'display the password'
                                                    }
                                                    onClick={handleClickShowPassword}
                                                    onMouseDown={handleMouseDownPassword}
                                                    onMouseUp={handleMouseUpPassword}
                                                    edge="end"
                                                    >
                                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                                    </IconButton>                                
                                            </InputAdornment>
                                            ),
                                        },
                                }}
                            />
                            <Button 
                                fullWidth
                                loading = {status === 'cargando'} 
                                loadingPosition="start"
                                endIcon={<LoginOutlinedIcon />}
                                variant="contained"
                                size="large"
                                // disabled={status === 'cargando'} 
                                type="submit"
                                color="orange"
                                className="btn_big"
                            >
                                Ingresar
                            </Button>
                        </Stack>
                    </form>
                </div>
            </Grid>
        </Grid>
    )
}

export default LoginPage
