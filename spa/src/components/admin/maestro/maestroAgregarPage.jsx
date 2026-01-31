//Librerias react y de terceros
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

//Componentes material
import Link from '@mui/material/Link';
import { Box } from '@mui/material';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import TextField from '@mui/material/TextField';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import BusinessCenterOutlinedIcon from '@mui/icons-material/BusinessCenterOutlined';
import Skeleton from '@mui/material/Skeleton';

//Liobrerias y componentes propios
import { MaestroService } from './maestro.service';
import { ConstantsRoutes } from '../../../utils/constants/constantsRoutes';
import { MaestroForm } from '../../../models/maestro/maestroForm';
import { ConstantsCatalogos } from '../../../utils/constants/constantsCatalogo';

//Creamos componente
function MaestroAgregarPage(){
    //Creamos variables de estado que usará el formulario
    const [status, setStatus] = useState('');
    const [username, setUsername] = useState('usuario_ejemplo@tuq.com');
    const [password, setPassword] = useState('qweqwe');
    const [nombre, setNombre] = useState('usuario');
    const [apellido_paterno, setApellidoPa] = useState('apellido p');
    const [apellido_materno, setApellidoMa] = useState('apellido m');
    const [escolaridad, setEscolaridad] = useState(0);
    const [coordinador, setCoordinador] = useState('Coordinador 1');
    const [carrera, setCarrera] = useState(1);
    
    //Objeto de router-dom para redirigirnos a otras partes de la aplicación
    const navigate = useNavigate();

     //Servicios/funciones del modulo auth
    const maestroService = new MaestroService();

    //Funcion asincrona del formulario que ejecuta el boton agregar
    async function handleSubmit(e) {
        //Previene comportamientos por default del form
        e.preventDefault();

        //Cambia el estado a cargando
        setStatus('cargando');
        try {
            //Creamos objeto con los datos del form
            var form = new MaestroForm(username, password, nombre, apellido_paterno, apellido_materno, escolaridad, coordinador, carrera);

            //Ejecutamos agregar enviandole el form y esperamos respuesta
            var res = await maestroService.agregar(form);

            //Si la respuesta es positiva
            if(res.success){
                //Mostramos mensaje success
                toast.success("Maestro creado con éxito!");

                //Navegamos a la siguiente página
                navigate(ConstantsRoutes.SPA_MAESTRO_LISTAR);
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

    return (
        // Stack para mostrar elementos en vertical, con separacion de 2
        <Stack spacing={2}>
            {/* Creamos el árbol de rutas actuales */}
            <Breadcrumbs aria-label="breadcrumb">
                {/* Link pasado (padre) */}
                <Link
                underline="hover"
                sx={{ display: 'flex', alignItems: 'center' }}
                color="inherit"
                href="/admin/maestro"
                >
                    <BusinessCenterOutlinedIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                    Maestros
                </Link>
                {/* Ruta actual */}
                <Typography sx={{ color: 'text.primary', display: 'flex', alignItems: 'center' }}>
                    <AddCircleOutlineOutlinedIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                    Agregar maestro
                </Typography>
            </Breadcrumbs>

            {/* Compoentne material Carta, con borde delineado */}
            <Card variant="outlined">
                {/* Etiqueta form con el evento onSubmit */}
                <form onSubmit={handleSubmit}>
                    {/* Div del encabezado de la carta, para poner titulo y acciones */}
                    <div className='box-form-head'>
                            {/* Stack en formato horizontal con espacio entre los componentes */}
                            <Stack direction="row" spacing={2} sx={{ justifyContent: "space-between", alignItems: "center"}}>
                                {/* Div para poner texto sin que se corte */}
                                <Box sx={{ textOverflow: 'ellipsis', p: 2 }} className='box-form-head-title'>
                                    <b>Nuevo maestro</b>
                                </Box>
                                {/* Boton de guardar */}
                                <Button 
                                    variant="text"
                                    loading = {status === 'cargando'} 
                                    loadingPosition="start"
                                    endIcon={<SaveOutlinedIcon />}
                                    size="large"
                                    disabled={status === 'cargando'} 
                                    type="submit"
                                    color="orange"
                                    className="btn_big"
                                >
                                    Guardar
                                </Button>
                            </Stack>
                    </div>
                    {/* Contenido de la carta */}
                    <CardContent className='box-form-body'>
                        {/* Stack en direccion vertical */}
                        <Stack direction='column' spacing={2}>
                            {/* Stack en direccion horizontal */}
                            <Stack direction={{ xs: 'column', md: 'row' }} spacing={{ xs: 2, sm: 2, md: 4 }}>
                                {/* Espacio para agregar la imágen */}
                                    <div>
                                        {/* Contenido por defecto mientras se cargan los datos */}
                                        <Skeleton variant="circular" width={100} height={100} />
                                    </div>
                                    {/* Stack en direccion horizontal */}
                                    <Stack spacing={{ xs: 2, sm: 2, md: 1 }} sx={{ flexGrow: 1 }}>
                                        {/* Subtitulo del formulario */}
                                        <p className='box-form-body-subtitle'>Datos del usuario</p>
                                        {/* Stack para los inputs, en tamaño pequeño se ponen en vertical, en tamaño grand en horizontal */}
                                        <Stack direction={{ xs: 'column', md: 'row' }} spacing={{ xs: 2, sm: 2, md: 1 }}>
                                            {/* Inputs */}
                                            <TextField fullWidth
                                                variant="outlined" className='bg-white' size='small'
                                                id="input-user" required 
                                                label="Usuario" 
                                                value={username} onChange={e => setUsername(e.target.value)} 
                                            />
                                            <TextField fullWidth
                                                variant="outlined" className='bg-white' size='small'
                                                id="input-password" required 
                                                label="Password" 
                                                value={password} onChange={e => setPassword(e.target.value)} 
                                                />
                                            </Stack>
                                    </Stack>
                            </Stack>
                            {/* Subtitulo del formulario */}
                            <p className='box-form-body-subtitle'>Datos del maestro</p>
                            {/* Stack para los inputs, en tamaño pequeño se ponen en vertical, en tamaño grand en horizontal */}
                            <Stack direction={{ sm: 'column', md: 'row' }} spacing={{ xs: 2, sm: 2, md: 1 }}>
                                    <TextField fullWidth
                                        variant="outlined" className='bg-white' size='small'
                                        id="input-nombre" required 
                                        label="Nombre(s)" 
                                        value={nombre} onChange={e => setNombre(e.target.value)} 
                                    />
                                    <TextField fullWidth
                                        variant="outlined" className='bg-white' size='small'
                                        id="input-ap" required 
                                        label="Apellido paterno" 
                                        value={apellido_paterno} onChange={e => setApellidoPa(e.target.value)} 
                                    />
                                    <TextField fullWidth
                                        variant="outlined" className='bg-white' size='small'
                                        id="input-ap" required 
                                        label="Apellido materno" 
                                        value={apellido_materno} onChange={e => setApellidoMa(e.target.value)} 
                                    />
                            </Stack>
                            {/* Stack para los inputs, en tamaño pequeño se ponen en vertical, en tamaño grand en horizontal */}
                            <Stack direction={{ sm: 'column', md: 'row' }} spacing={{ xs: 2, sm: 2, md: 1 }}>
                                    <TextField fullWidth select
                                        variant="outlined" className='bg-white' size='small'
                                        id="input-nombre" required 
                                        label="Escolaridad" 
                                        value={escolaridad} onChange={e => setEscolaridad(e.target.value)} 
                                    >
                                        {/* Cuando es input tipo select, creamos sus elementos obteniendo del catalogo el arreglo de valoress(key, value)
                                        Usamos map para iterear en los elementos e ir devolviendo un componente MenuItem con sus propiedades */}
                                        {ConstantsCatalogos.ESCOLARIDAD.map((option) => (
                                            <MenuItem key={option.key} value={option.key}>
                                                {option.value}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                    <TextField fullWidth
                                        variant="outlined" className='bg-white' size='small'
                                        id="input-ap" required select
                                        label="Carrera" 
                                        value={carrera} onChange={e => setCarrera(e.target.value)} 
                                    >
                                        {ConstantsCatalogos.CARRERA.map((option) => (
                                            <MenuItem key={option.key} value={option.key}>
                                                {option.value}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                    <TextField fullWidth
                                        variant="outlined" className='bg-white' size='small'
                                        id="input-ap" required 
                                        label="Coordinador" 
                                        value={coordinador} onChange={e => setCoordinador(e.target.value)} 
                                    />
                            </Stack>
                        </Stack>                             
                    </CardContent>
                </form>
            </Card>
        </Stack>
    );
}
export default MaestroAgregarPage;


