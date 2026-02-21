import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { EmpleadoService } from './empleado.service';
import { EmpleadoForm } from '../../../models/empleado/empleadoForm';
import { ConstantsRoutes } from '../../../utils/constants/constantsRoutes';
import { ConstantsCatalogos } from '../../../utils/constants/constantsCatalogo';

import {
  Card, CardContent, Stack, TextField, MenuItem,
  Typography, Breadcrumbs, Link, Box
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import BusinessCenterOutlinedIcon from '@mui/icons-material/BusinessCenterOutlined';
import Switch from '@mui/material/Switch';
import toast from 'react-hot-toast';

function EmpleadoAgregarPage() {
  const [status, setStatus] = useState('');
  const [nombre, setNombre] = useState('');
  const [apellido_paterno, setApellidoPa] = useState('');
  const [apellido_materno, setApellidoMa] = useState('');
  const [area, setArea] = useState('');
  const [puesto, setPuesto] = useState('');
  const [is_coordinador, setIsCoordinador] = useState(false);
  const [usuario_id, setUsuarioId] = useState('');

  const navigate = useNavigate();
  const empleadoService = new EmpleadoService();

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus('cargando');
    try {
      const form = new EmpleadoForm(
        nombre, apellido_paterno, apellido_materno,
        area, puesto, is_coordinador, usuario_id
      );
      const res = await empleadoService.agregar(form);

      if (res.success) {
        toast.success("Empleado creado con éxito!");
        navigate(ConstantsRoutes.SPA_EMPLEADO_LISTAR);
      } else {
        toast.error(res.error || ConstantsCatalogos.ERROR_DEFAULT);
      }
      setStatus('ok');
    } catch (err) {
      setStatus('nok');
      toast.error(err.message || "Error inesperado");
    }
  }

  return (
    <Stack spacing={2}>
      <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" sx={{ display: 'flex', alignItems: 'center' }} color="inherit" href="/admin/empleado">
          <BusinessCenterOutlinedIcon sx={{ mr: 0.5 }} fontSize="inherit" />
          Empleados
        </Link>
        <Typography sx={{ color: 'text.primary', display: 'flex', alignItems: 'center' }}>
          <AddCircleOutlineOutlinedIcon sx={{ mr: 0.5 }} fontSize="inherit" />
          Agregar empleado
        </Typography>
      </Breadcrumbs>

      <Card variant="outlined">
        <form onSubmit={handleSubmit}>
          <div className='box-form-head'>
            <Stack direction="row" spacing={2} sx={{ justifyContent: "space-between", alignItems: "center"}}>
              <Box sx={{ textOverflow: 'ellipsis', p: 2 }} className='box-form-head-title'>
                <b>Nuevo empleado</b>
              </Box>
              <LoadingButton
                loading={status === 'cargando'}
                endIcon={<SaveOutlinedIcon />}
                type="submit"
                variant="contained"
                color="primary"
              >
                Guardar
              </LoadingButton>
            </Stack>
          </div>

          <CardContent className='box-form-body'>
            <Stack direction="column" spacing={2}>
              <TextField fullWidth label="Nombre(s)" value={nombre} onChange={e => setNombre(e.target.value)} required />
              <TextField fullWidth label="Apellido paterno" value={apellido_paterno} onChange={e => setApellidoPa(e.target.value)} required />
              <TextField fullWidth label="Apellido materno" value={apellido_materno} onChange={e => setApellidoMa(e.target.value)} required />
              <TextField fullWidth label="Área" value={area} onChange={e => setArea(e.target.value)} required />
              <TextField fullWidth label="Puesto" value={puesto} onChange={e => setPuesto(e.target.value)} required />
              <Stack direction="row" spacing={2} alignItems="center">
                <Typography>¿Es coordinador?</Typography>
                <Switch checked={is_coordinador} onChange={e => setIsCoordinador(e.target.checked)} />
              </Stack>
              <TextField fullWidth type="number" label="Usuario ID" value={usuario_id} onChange={e => setUsuarioId(e.target.value)} required />
            </Stack>
          </CardContent>
        </form>
      </Card>
    </Stack>
  );
}

export default EmpleadoAgregarPage;

