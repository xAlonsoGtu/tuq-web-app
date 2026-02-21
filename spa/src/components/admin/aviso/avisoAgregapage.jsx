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
import { AvisoService } from './aviso.service';
import { ConstantsRoutes } from '../../../utils/constants/constantsRoutes';
import { AvisoForm } from '../../../models/Avisos/avisoForm';
import { ConstantsCatalogos } from '../../../utils/constants/constantsCatalogo';



   
//Creamos componente
function AvisosAgregarPage(){
    //Creamos variables de estado que usará el formulario
  const [status, setStatus] = useState('');
      const [nombre, setNombre] = useState('usuario');
      const [descripcion, setDescripcion] = useState('');
      const [imagen_url, setimagen_url] = useState('');
      const [fecha_inicio, setfecha_inicio] = useState('');
   
    
    //Objeto de router-dom para redirigirnos a otras partes de la aplicación
    const navigate = useNavigate();

     //Servicios/funciones del modulo auth
    const AvisosService = new AvisoService();

    //Funcion asincrona del formulario que ejecuta el boton agregar
    async function handleSubmit(e) {
        //Previene comportamientos por default del form
        e.preventDefault();

        //Cambia el estado a cargando
        setStatus('cargando');
        try {
            //Creamos objeto con los datos del form
            var form = new AvisoForm( nombre, descripcion, imagen_url, fecha_inicio);

            //Ejecutamos agregar enviandole el form y esperamos respuesta
            var res = await AvisosService.agregar(form);
      
 //Si la respuesta es positiva
            if(res.success){
                //Mostramos mensaje success
                toast.success("AVISOS creado con éxito!");
                
                //Navegamos a la siguiente página
                navigate(ConstantsRoutes.SPA_Avisos_LISTAR);
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
            href="/admin/avisos"
            >
                <BusinessCenterOutlinedIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                Avisos
            </Link>
            {/* Ruta actual */}
            <Typography sx={{ color: 'text.primary', display: 'flex', alignItems: 'center' }}>
                <AddCircleOutlineOutlinedIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                Agregar aviso
            </Typography>
        </Breadcrumbs>

        {/* Componente material Carta, con borde delineado */}
        <Card variant="outlined">
            {/* Etiqueta form con el evento onSubmit */}
            <form onSubmit={handleSubmit}>
                {/* Encabezado */}
                <div className='box-form-head'>
                        <Stack direction="row" spacing={2} sx={{ justifyContent: "space-between", alignItems: "center"}}>
                            <Box sx={{ textOverflow: 'ellipsis', p: 2 }} className='box-form-head-title'>
                                <b>Nuevo aviso</b>
                            </Box>
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

                {/* Contenido */}
                <CardContent className='box-form-body'>
                    <Stack direction='column' spacing={2}>
                        <Stack direction={{ xs: 'column', md: 'row' }} spacing={{ xs: 2, sm: 2, md: 4 }}>
                            <div>
                                <Skeleton variant="circular" width={100} height={100} />
                            </div>

                            <Stack spacing={{ xs: 2, sm: 2, md: 1 }} sx={{ flexGrow: 1 }}>
                                <p className='box-form-body-subtitle'>Datos del aviso</p>

                                <Stack direction={{ xs: 'column', md: 'row' }} spacing={{ xs: 2, sm: 2, md: 1 }}>
                                    <TextField fullWidth
                                        variant="outlined" className='bg-white' size='small'
                                        label="Nombre"
                                        value={nombre} 
                                        onChange={e => setNombre(e.target.value)} 
                                    />

                                    <TextField fullWidth
                                        variant="outlined" className='bg-white' size='small'
                                        label="Fecha inicio"
                                        type="date"
                                        InputLabelProps={{ shrink: true }}
                                        value={fecha_inicio} 
                                        onChange={e => setfecha_inicio(e.target.value)} 
                                    />
                                </Stack>
                            </Stack>
                        </Stack>

                        <TextField fullWidth
                            variant="outlined" className='bg-white' size='small'
                            label="Descripción"
                            multiline
                            rows={3}
                            value={descripcion} 
                            onChange={e => setDescripcion(e.target.value)} 
                        />

                        <TextField fullWidth
                            variant="outlined" className='bg-white' size='small'
                            label="URL Imagen"
                            value={imagen_url} 
                            onChange={e => setimagen_url(e.target.value)} 
                        />

                    </Stack>                             
                </CardContent>
            </form>
        </Card>
    </Stack>
    );
}

export default AvisosAgregarPage;