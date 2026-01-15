import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import * as React from 'react';
import Button from '@mui/material/Button';
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import FormControl from '@mui/material/FormControl';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';

import '../authStyle.css'
import { LoginForm } from '../../../models/auth/loginForm';
import { AuthService } from '../auth.service';


function LoginPage(){
    const [name, setName] = React.useState('');
    const [pass, setPass] = React.useState('');
    const [status, setStatus] = React.useState('');
    const [error, setError] = React.useState(null);
    const [showPassword, setShowPassword] = React.useState(false);
    var ss = new LoginForm();
    ss.email = "123";
    console.log(ss);

    const aa = new AuthService();

    function handleInputName(e){
        console.log(e);
        setName(e.target.value);
    }

    function handleInputPass(e){
        setPass(e.target.value);
    }

    async function handleSubmit(e) {
        console.log("123");
        e.preventDefault();
        setStatus('cargando');
        try {
            //await submitForm(name);
            console.log("entrando");
            var res = await aa.login(ss);
            console.log(res);
            setStatus('ok');
        } catch (err) {
            setStatus('nok');
            setError(err);
        }
    }

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };

    return (
            <Grid container spacing={0}>
                <Grid size={{ xs: 0, md: 5 }}>
                    <div className='bg-login-img'></div>
                </Grid>
                <Grid container direction="row" size={{ xs: 12, md: 7 }} sx={{ 
                            justifyContent: "center",
                            alignItems: "center",
                        }}>
                    <div className='box-login'>
                        <img src={process.env.PUBLIC_URL+'/media/logo.png'} className="App-logo-login" alt="logo" />
                        <br />
                        <form onSubmit={handleSubmit}>
                            <Stack spacing={3}>
                                <TextField fullWidth
                                    variant="outlined" className='bg-white'
                                    id="input-user" required 
                                    label="Usuario" 
                                    value={name} onChange={handleInputName} 
                                    slotProps={{
                                    input: {
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <PersonOutlineOutlinedIcon/>                                    
                                            </InputAdornment>
                                        ),
                                        },
                                    }}
                                    // error={name === ""}
                                    // helperText={name === "" ? 'Empty field!' : ' '}
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
                                    >Ingresar
                                </Button>
                            </Stack>

                        </form>
                    </div>
                </Grid>
            </Grid>
    )
}

export default LoginPage
