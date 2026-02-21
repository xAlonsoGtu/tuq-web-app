import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import BusinessCenterOutlinedIcon from '@mui/icons-material/BusinessCenterOutlined';
import InputSearch from '../../shared/inputSearch';
import { ConstantsRoutes } from '../../../utils/constants/constantsRoutes';
import { MaestroService } from './maestro.service';
import { ConstantsCatalogos, getCarrera } from '../../../utils/constants/constantsCatalogo';
import { SkeletonTable } from '../../shared/skeletonTable';
import toast from 'react-hot-toast';
import Avatar from '@mui/material/Avatar';
import { deepOrange } from '@mui/material/colors';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { StatusTable } from '../../shared/statusTable';
import Pagination from '@mui/material/Pagination';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { MaestroTableMenu } from './maestroTableMenu';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Grow from '@mui/material/Grow';

//Iniciamos componente
function MaestroPage(){
  //objeto de router-dom para redirigirnos a otras partes de la aplicación
  const navigate = useNavigate();

  //Servicios/funciones del modulo auth
  const maestroService = new MaestroService();

  //ATRIBUTOS
  //Atributos de busqueda
  const [palabra, setPalabra] = useState("");
  const [ordenBy, setOrdenBy] = useState("nombre");
  const [orden, setOrden] = useState("desc");
  const [pagina, setPagina] = useState(0);

  //Atributos para mostrar la lista de maestros
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [paginator, setPaginator] = useState(null);
  const [loadingModal, setLoadingModal] = useState(false);

  //Encabezados que se mostrarán en la tabla, indicamos si tiene campos de ordenamiento
  const encabezados = [
    { id: 1, label: "", ordenBy: "", orden: "", showFilter: false, with: 150 },
    { id: 2, label: "Usuario", ordenBy: "username", orden: "desc", showFilter: true },
    { id: 3, label: "Nombre", ordenBy: "nombre", orden: "desc", showFilter: true },
    { id: 4, label: "Apellido paterno", ordenBy: "apellido_paterno", orden: "desc", showFilter: true },
    { id: 5, label: "Apellido materno", ordenBy: "apellido_materno", orden: "desc", showFilter: true },
    { id: 6, label: "Carrera", ordenBy: "carrera", orden: "desc", showFilter: true },
    { id: 7, label: "Coordinador", ordenBy: "coordinador", orden: "desc", showFilter: true },
    { id: 8, label: "Estado", ordenBy: "status", orden: "desc", showFilter: true },
    { id: 9, label: "", ordenBy: "", orden: "", showFilter: false },
  ];

  //HOOKS
  //Hook de react para ejecutar función después de ejecutar el cambio de estado de algún elemento
  useEffect(() => {
    //Al modificarse el estado del atributo pagina u orden, ejecutamos la busqueda
    buscar();

  }, [pagina, ordenBy, orden]);

  //BUSQUEDA
  //Busqueda por palabra
  function resetBusqueda(){
    //Ponemos lista sin elementos
    setList([]);

    //Si estamos en otra página, nos movemos a la primera
    if(pagina != 0)
      setPagina(0);
    //De lo contrario iniciamos busqueda
    else buscar();
  }

  //Busqueda
  async function buscar() {
    //Mostramos loading
    setLoading(true);
    try{
      //Ejecutamos busqueda
      var res = await maestroService.buscar(palabra, ordenBy, orden, pagina);

      //Si es correacta
      if(res.success){
        //Validamos que tenga resultado
        if(res.payload != null){
          //Lo asignamos a la lista
          setList(res.payload);

          //Modificamos valores de paginador
          if(res.paginator != null) setPaginator(res.paginator);
        }
      }else{
        //Si nos arrojo error lo mostramos
        if(res.error) toast.error(res.error);
        
        //De lo contrario arrojamos un error por defecto en el toast
        else toast.error(ConstantsCatalogos.ERROR_DEFAULT);
      }
    }catch(e){
      //Si hay error mostramos error por default
      toast.error(ConstantsCatalogos.ERROR_DEFAULT);
    }finally{
      //Cerramos loading
      setLoading(false);
    }
  }

  //MENJADORES DE EVENTOS - HANDLE
  //Función de boton agregar
  function handleAgregar(e){
    //Navegamos a la ruta siguiente (agregar) remplazando posición actual
    navigate(ConstantsRoutes.SPA_MAESTRO_AGREGAR, { replace: true });
  }

  //Función para cambiarnos de página
  function handlePaginator(event, page){
    //Asignamos nuevo valor
    setPagina(page - 1);
  }

  //Funcion para cambiar valores de order
  function handleChangeOrderBy(newOrdenBy){
    setOrdenBy(newOrdenBy);
    orden == "desc" ? setOrden("asc") : setOrden("desc");
  }

  //HTML
  return (
    <>
      {/* Componente loading */}
      <Backdrop sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })} open={loadingModal}>
        <CircularProgress color="inherit" />
      </Backdrop>
      {/* Stack en vertical */}
      <Stack spacing={2}>
        {/* Creamos el árbol de rutas actuales */}
        <Breadcrumbs aria-label="breadcrumb">
          {/* Material usa Typography, para poner etiquetas p */}
          <Typography sx={{ color: 'text.primary', display: 'flex', alignItems: 'center' }}>
            {/* Agregamos icono y texto */}
            <BusinessCenterOutlinedIcon sx={{ mr: 0.5 }} fontSize="inherit" />
              Maestros
          </Typography>
        </Breadcrumbs>

        {/* Stack en Horizontal */}
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ justifyContent: "space-between", alignItems: "center"}}>
          {/* Componente de busqueda */}
          <InputSearch handleBuscar={resetBusqueda} placeholder="Buscar por nombre o usuario" handleSetPalabra={setPalabra}/>
          {/* Boton de agregar */}
          <Button 
            variant="outlined"
            startIcon={<AddOutlinedIcon />} 
            size='large'
            color="orange" onClick={handleAgregar} >
              Maestro
          </Button>
        </Stack>

        {/* Si hay datos cargando mostramos componente skeleton, de lo contrario mostramos tabla */}
        {
          loading ? ( 
            <SkeletonTable/>
          ) :     
          (
            // Componente paper, funcinoa como div con fondo y sombra, asignamos clase scroll para que la tabla funcione en moviles
            <Paper className='div-table-scroll'>
                {/* Tabla material, indicamos que encabezado debe permanecer arriba */}
                <Table stickyHeader>                  
                  <TableHead>
                    <TableRow className='table-head-row'>
                      {/* Recorremos el objeto encabezados, para ir creando componentes por cada elemento */}
                      {encabezados.map((e) => (
                        <TableCell key={e.id} className='table-cell-sort'>
                          {/* Mostramos título del encabezado y si tiene ordenamiento mostramos iconos */}
                          { 
                            e.showFilter ? 
                            <span onClick={() => handleChangeOrderBy(e.ordenBy)}>
                              {e.label} 
                              {e.ordenBy == ordenBy && (
                                orden == "desc" ? <ArrowDownwardIcon sx={{ fontSize: 18 }} /> : <ArrowUpwardIcon sx={{ fontSize: 18 }} />
                              )}                  
                            </span> : <span>{e.label}</span> 
                          }
                        </TableCell>
                      ))
                      }
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {/* Iteramos sobre la lista de registros */}
                    {list.map((row, index) => (
                      // Efectos de animacion
                      <Grow in={!loading} timeout={(index*250) + 250}>
                        <TableRow key={row.maestro_id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }} hover>
                          <TableCell className='table-cell-img'><Avatar sx={{ bgcolor: deepOrange[500] }}>U</Avatar></TableCell>
                          <TableCell>{row.username}</TableCell>
                          <TableCell>{row.nombre}</TableCell>
                          <TableCell>{row.apellido_paterno}</TableCell>
                          <TableCell>{row.apellido_materno}</TableCell>
                          <TableCell>{getCarrera(row.carrera)}</TableCell>
                          <TableCell>{row.coordinador}</TableCell>
                          <TableCell>
                            {/* Componente de status */}
                            <StatusTable status={row.status}/>
                          </TableCell>
                          <TableCell>
                            {/* Componente de menu con opciones */}
                            <MaestroTableMenu maestro={row} setLoadingModal={setLoadingModal} onComplete={resetBusqueda}/>
                          </TableCell>
                        </TableRow>
                      </Grow>
                    ))}
                  </TableBody>
                </Table>
              </Paper>
            ) 
        }     
        
        {/* Si hay paginator, mostramos paginacion */}
        {
          paginator != null  && 
          <Stack direction="row" spacing={2} sx={{ justifyContent: "space-between", alignItems: "center"}}>
            <Box className="paginator-total">{paginator.pageIndex * paginator.pageSize + 1} - {paginator.pageIndex * paginator.pageSize + paginator.pageSize} de {paginator.total}</Box>
              <Pagination count={paginator.pages} page={pagina + 1} onChange={handlePaginator} showFirstButton showLastButton/>
          </Stack>
        }   
    </Stack>
    </>

    );
}
export default MaestroPage;

