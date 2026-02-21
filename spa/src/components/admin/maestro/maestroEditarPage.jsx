//Librerias react y de terceros
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

//Componentes material
import Link from '@mui/material/Link';
import { Box } from '@mui/material';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import TextField from '@mui/material/TextField';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import BusinessCenterOutlinedIcon from '@mui/icons-material/BusinessCenterOutlined';
import Skeleton from '@mui/material/Skeleton';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

//Liobrerias y componentes propios
import { MaestroService } from './maestro.service';
import { ConstantsRoutes } from '../../../utils/constants/constantsRoutes';
import { ConstantsCatalogos } from '../../../utils/constants/constantsCatalogo';
import { MaestroFormEditar } from '../../../models/maestro/maestroFormEditar';

//Creamos componente
function MaestroEditarPage(){
    //Creamos variables de estado que usará el formulario
    const [status, setStatus] = useState('');
    const [username, setUsername] = useState('');
    const [nombre, setNombre] = useState('');
    const [apellido_paterno, setApellidoPa] = useState('');
    const [apellido_materno, setApellidoMa] = useState('');
    const [escolaridad, setEscolaridad] = useState(0);
    const [coordinador, setCoordinador] = useState('');
    const [carrera, setCarrera] = useState(1);
    
    //Objeto de router-dom para redirigirnos a otras partes de la aplicación
    const navigate = useNavigate();
    const { id } = useParams();

     //Servicios/funciones del modulo auth
    const maestroService = new MaestroService();


    //HOOKS
    //Hook de react para ejecutar función después de ejecutar el cambio de estado de algún elemento
    useEffect(() => {
        //Al modificarse el estado del id, ejecutamos la busqueda sólo si es un valor válido
        if(id != null && id != 0)
            getMaestro();
    
    }, [id]);

    async function getMaestro() {
        try {
            //Cambia el estado a cargando
            setStatus('cargando');

            //Ejecutamos agregar enviandole el form y esperamos respuesta
            var res = await maestroService.obtener(id);

            //Si la respuesta es positiva
            if(res.success){
                //Si hay datos
                if(res.payload){
                    //Set datos del back en el formulario
                    setDatosMaestro(res.payload);
                }
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
        finally {
            setStatus('ok');
        }
    }

    function setDatosMaestro(maestro){
        setUsername(maestro.username);
        setNombre(maestro.nombre);
        setApellidoPa(maestro.apellido_paterno);
        setApellidoMa(maestro.apellido_materno);
        setEscolaridad(maestro.escolaridad);
        setCoordinador(maestro.coordinador);
        setCarrera(maestro.carrera);
    }

    //Funcion asincrona del formulario que ejecuta el boton agregar
    async function handleSubmit(e) {
        //Previene comportamientos por default del form
        e.preventDefault();

        //Cambia el estado a cargando
        setStatus('cargando');
        try {
            //Creamos objeto con los datos del form
            var form = new MaestroFormEditar(id, nombre, apellido_paterno, apellido_materno, escolaridad, coordinador, carrera);

            //Ejecutamos agregar enviandole el form y esperamos respuesta
            var res = await maestroService.editar(form);

            //Si la respuesta es positiva
            if(res.success){
                //Mostramos mensaje success
                toast.success("Maestro editado con éxito!");

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
                    <EditOutlinedIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                    Editar maestro
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
                                    <b>Editar maestro</b>
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
export default MaestroEditarPage;


