//Librerias react y de terceros
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

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
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import Skeleton from '@mui/material/Skeleton';

//Librerias y componentes propios
import { AlumnoService } from './alumno.service';
import { ConstantsRoutes } from '../../../utils/constants/constantsRoutes';
import { AlumnoForm } from '../../../models/alumno/alumnoForm';
import { ConstantsCatalogos } from '../../../utils/constants/constantsCatalogo';

//Creamos componente
function AlumnoAgregarPage() {
  //Creamos variables de estado que usará el formulario
  const [status, setStatus] = useState('');
  // Datos del usuario
  const [username, setUsername] = useState('alumno_ejemplo@tuq.com');
  const [password, setPassword] = useState('qweqwe');
  // Datos del alumno
  const [nombre, setNombre] = useState('alumno');
  const [apellido_paterno, setApellidoPa] = useState('apellido p');
  const [apellido_materno, setApellidoMa] = useState('apellido m');
  const [tipo_estudio, setTipoEstudio] = useState(0);   // si no lo usas, lo puedes quitar
  const [carrera, setCarrera] = useState(1);
  const [cuatrimestre, setCuatrimestre] = useState(1);
  //Objeto de router-dom para redirigirnos a otras partes de la aplicación
  const navigate = useNavigate();
  //Servicios/funciones del modulo alumnos
  const alumnoService = new AlumnoService();
  //Funcion asincrona del formulario que ejecuta el boton guardar
  async function handleSubmit(e) {
    //Previene comportamientos por default del form
    e.preventDefault();

    //Cambia el estado a cargando
    setStatus('cargando');
    try {
      
      const usuario_id = Number(localStorage.getItem('usuario_id') || 0);

      //Creamos objeto con los datos del form
      const form = new AlumnoForm(
        username,
        password,
        nombre,
        apellido_paterno,
        apellido_materno,
        tipo_estudio,
        carrera,
        cuatrimestre,
        usuario_id
      );

      //Ejecutamos agregar enviandole el form y esperamos respuesta
      const res = await alumnoService.agregar(form);

      //Si la respuesta es positiva
      if (res.success) {
        toast.success("Alumno creado con éxito!");
        //Navegamos a la siguiente página
        navigate(ConstantsRoutes.SPA_ALUMNO_LISTAR);
      } else {
        if (res.error) toast.error(res.error);
        else toast.error(ConstantsCatalogos.ERROR_DEFAULT);
      }

      setStatus('ok');
    } catch (err) {
      setStatus('nok');
      toast.error(err);
    }
  }

  return (
    <Stack spacing={2}>
      {/* Creamos el árbol de rutas actuales */}
      <Breadcrumbs aria-label="breadcrumb">
        {/* Link pasado (padre) */}
        <Link
          underline="hover"
          sx={{ display: 'flex', alignItems: 'center' }}
          color="inherit"
          href="/admin/alumno"
        >
          <SchoolOutlinedIcon sx={{ mr: 0.5 }} fontSize="inherit" />
          Alumnos
        </Link>
        {/* Ruta actual */}
        <Typography sx={{ color: 'text.primary', display: 'flex', alignItems: 'center' }}>
          <AddCircleOutlineOutlinedIcon sx={{ mr: 0.5 }} fontSize="inherit" />
          Agregar alumno
        </Typography>
      </Breadcrumbs>

      {/* Componente material Carta, con borde delineado */}
      <Card variant="outlined">
        {/* Etiqueta form con el evento onSubmit */}
        <form onSubmit={handleSubmit}>
          {/* Encabezado de la carta */}
          <div className='box-form-head'>
            <Stack direction="row" spacing={2} sx={{ justifyContent: "space-between", alignItems: "center" }}>
              <Box sx={{ textOverflow: 'ellipsis', p: 2 }} className='box-form-head-title'>
                <b>Nuevo alumno</b>
              </Box>

              <Button
                variant="text"
                loading={status === 'cargando'}
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
            <Stack direction='column' spacing={2}>
              {/* Datos del usuario */}
              <Stack direction={{ xs: 'column', md: 'row' }} spacing={{ xs: 2, sm: 2, md: 4 }}>
                <div>
                  <Skeleton variant="circular" width={100} height={100} />
                </div>

                <Stack spacing={{ xs: 2, sm: 2, md: 1 }} sx={{ flexGrow: 1 }}>
                  <p className='box-form-body-subtitle'>Datos del usuario</p>

                  <Stack direction={{ xs: 'column', md: 'row' }} spacing={{ xs: 2, sm: 2, md: 1 }}>
                    <TextField
                      fullWidth
                      variant="outlined"
                      className='bg-white'
                      size='small'
                      id="input-user"
                      required
                      label="Usuario"
                      value={username}
                      onChange={e => setUsername(e.target.value)}
                    />
                    <TextField
                      fullWidth
                      variant="outlined"
                      className='bg-white'
                      size='small'
                      id="input-password"
                      required
                      label="Password"
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                    />
                  </Stack>
                </Stack>
              </Stack>

              {/* Datos del alumno */}
              <p className='box-form-body-subtitle'>Datos del alumno</p>

              <Stack direction={{ sm: 'column', md: 'row' }} spacing={{ xs: 2, sm: 2, md: 1 }}>
                <TextField
                  fullWidth
                  variant="outlined"
                  className='bg-white'
                  size='small'
                  id="input-nombre"
                  required
                  label="Nombre(s)"
                  value={nombre}
                  onChange={e => setNombre(e.target.value)}
                />
                <TextField
                  fullWidth
                  variant="outlined"
                  className='bg-white'
                  size='small'
                  id="input-ap"
                  required
                  label="Apellido paterno"
                  value={apellido_paterno}
                  onChange={e => setApellidoPa(e.target.value)}
                />
                <TextField
                  fullWidth
                  variant="outlined"
                  className='bg-white'
                  size='small'
                  id="input-am"
                  required
                  label="Apellido materno"
                  value={apellido_materno}
                  onChange={e => setApellidoMa(e.target.value)}
                />
              </Stack>

              <Stack direction={{ sm: 'column', md: 'row' }} spacing={{ xs: 2, sm: 2, md: 1 }}>
                {/* Tipo de estudio (si tienes catálogo) */}
                <TextField
                  fullWidth
                  select
                  variant="outlined"
                  className='bg-white'
                  size='small'
                  id="input-tipo-estudio"
                  required
                  label="Tipo de estudio"
                  value={tipo_estudio}
                  onChange={e => setTipoEstudio(e.target.value)}
                >
                  {/* Si no existe este catálogo, dime y lo ajusto al que sí tengan */}
                  {(ConstantsCatalogos.TIPO_ESTUDIO || []).map((option) => (
                    <MenuItem key={option.key} value={option.key}>
                      {option.value}
                    </MenuItem>
                  ))}
                </TextField>

                <TextField
                  fullWidth
                  select
                  variant="outlined"
                  className='bg-white'
                  size='small'
                  id="input-carrera"
                  required
                  label="Carrera"
                  value={carrera}
                  onChange={e => setCarrera(e.target.value)}
                >
                  {ConstantsCatalogos.CARRERA.map((option) => (
                    <MenuItem key={option.key} value={option.key}>
                      {option.value}
                    </MenuItem>
                  ))}
                </TextField>

                <TextField
                  fullWidth
                  variant="outlined"
                  className='bg-white'
                  size='small'
                  id="input-cuatrimestre"
                  required
                  label="Cuatrimestre"
                  value={cuatrimestre}
                  onChange={e => setCuatrimestre(e.target.value)}
                />
              </Stack>
            </Stack>
          </CardContent>
        </form>
      </Card>
    </Stack>
  );
}

export default AlumnoAgregarPage;

