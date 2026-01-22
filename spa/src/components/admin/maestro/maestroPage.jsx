import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import BusinessCenterOutlinedIcon from '@mui/icons-material/BusinessCenterOutlined';
import InputSearch from '../../shared/inputSearch';
import { ConstantsRoutes } from '../../../utils/constants/constantsRoutes';

//Iniciamos componente
function MaestroPage(){
  const navigate = useNavigate(); //objeto de router-dom para redirigirnos a otras partes de la aplicación

  //Función de boton agregar
  function handleAgregar(e){
    //Navegamos a la ruta siguiente (agregar) remplazando posición actual
    navigate(ConstantsRoutes.SPA_MAESTRO_AGREGAR, { replace: true });
  }

  return (
    // Div con ancho total
    <Box sx={{ flexGrow: 1 }}>
      {/* Grid contenedor con espacio de 2 */}
      <Grid container spacing={2}>
        {/* Dentro del grid padre, comenzamos a crear grid hijos
        El primero tendra un tamaño de 12/12 por lo que ocupará todo el tamaño del grid padre  */}
        <Grid size={{ xs: 12, md: 12 }}>
          {/* Creamos el árbol de rutas actuales */}
          <Breadcrumbs aria-label="breadcrumb">
            {/* Material usa Typography, para poner etiquetas p */}
            <Typography sx={{ color: 'text.primary', display: 'flex', alignItems: 'center' }}>
              {/* Agregamos icono y texto */}
              <BusinessCenterOutlinedIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                Maestros
            </Typography>
          </Breadcrumbs>
        </Grid>

        {/* Siguientes grid van el la misma linea. Dependiendo el tamaño de la pantalla cambian su tamaño, si es xs(chica) son tamaño 6/12 */}
        <Grid size={{ xs: 6, md: 4 }}>
          {/* Ponemos el compoennte de busqueda que creamos */}
          <InputSearch/>
        </Grid>
        <Grid size={{ xs: 6, md: 8 }}>
          {/* Creamos un Box(div) y especificamos que su contenido debe ir alineado al final */}
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            {/* Boton de agregar */}
            <Button 
              startIcon={<AddOutlinedIcon />} 
              size='large'
              color="orange" className="bg-white" onClick={handleAgregar} >
              Agregar
            </Button>
          </Box>
        </Grid>

        {/* La sigueinte linea de grid es tamaño 12/12 */}
        <Grid size={{ xs: 12}}>
          {/* Agregamos un stack que sirve para colocar los elementos de forma horizontal o vertical distribuyendo su tamaño */}
          <Stack spacing={1}>
            {/* Skeleton sirve para indicar que aun no se cargan los elementos, es como un div que se muestra antes de que se carguen los verdaderos datos */}
            <Skeleton variant="rounded" height={150} />
            <Skeleton variant="rounded" height={150} />
            <Skeleton variant="rounded" height={150} />
            <Skeleton variant="rectangular"  height={50} />
          </Stack>
        </Grid>
      </Grid>
    </Box>
    );
}
export default MaestroPage;

