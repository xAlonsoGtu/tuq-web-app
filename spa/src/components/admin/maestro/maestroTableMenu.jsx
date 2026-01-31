
import { useState } from 'react';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import QrCodeOutlinedIcon from '@mui/icons-material/QrCodeOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import ToggleOnOutlinedIcon from '@mui/icons-material/ToggleOnOutlined';
import { MaestroFormEditarStatus } from '../../../models/maestro/maestroFormEditar';
import { MaestroService } from './maestro.service';
import toast from 'react-hot-toast';
import { ConstantsCatalogos } from '../../../utils/constants/constantsCatalogo';
import ConfirmacionDialog from '../../shared/confirmacionDialog';
import ToggleOffOutlinedIcon from '@mui/icons-material/ToggleOffOutlined';

export function MaestroTableMenu({maestro, setLoadingModal, onComplete}){
  //Sevicio api
  const service = new MaestroService();
  const [showDialog, setShowDialog] = useState(false);

  //Const mensaje aviso para eliminar
  const titulo_dialog = "¿Seguro de eliminar el registro del maestro?";
  const descripcion_dialog = "El maestro " + maestro.apellido_paterno + " " + maestro.nombre + " parecerá en estado eliminado. Favor de confirmar la acción.";

  async function handleDialog(respuesta){
    setShowDialog(false);

    //Si es positiva la respuesa, procedemos a eliminar
    if(respuesta == true){
    setLoadingModal(true);
    try {
      //Ejecutamos eliminar enviandole el form y esperamos respuesta
      var res = await service.eliminar(maestro.maestro_id);

      //Si la respuesta es positiva
      if(res.success){
        //Mostramos mensaje success
        toast.success("Maestro eliminado con éxito!");

            }else{
                //Si nos arrojo error lo mostramos
                if(res.error) toast.error(res.error);
                //De lo contrario arrojamos un error por defecto en el toast
                else toast.error(ConstantsCatalogos.ERROR_DEFAULT);
            }

        } catch (err) {
            toast.error(err)
        } finally {
          setLoadingModal(false);
          setAnchorEl(null);
          onComplete();
        }
    }else{
      setAnchorEl(null);
    }
  };

  function handleEditar(){
      console.log(maestro);
      setAnchorEl(null);
  };

  function getItemActivarDesactivar(){
    if(maestro.status == 1){
      return (
        <MenuItem onClick={()=>handleEditarStatus()}>
          <ListItemIcon>
            <ToggleOffOutlinedIcon fontSize="small" />
          </ListItemIcon>
          Desactivar
        </MenuItem>
      )
    }else{
      return (
        <MenuItem onClick={()=>handleEditarStatus()}>
          <ListItemIcon>
            <ToggleOnOutlinedIcon fontSize="small" />
          </ListItemIcon>
          Activar
        </MenuItem>
      )
    }
  }

  async function handleEditarStatus(){    
    setLoadingModal(true);
    try {
      //Creamos objeto con los datos del form
      var form = new MaestroFormEditarStatus(maestro.maestro_id, maestro.status == 1 ? 2 : 1);

      //Ejecutamos agregar enviandole el form y esperamos respuesta
      var res = await service.editarStatus(form);

      //Si la respuesta es positiva
      if(res.success){
        //Mostramos mensaje success
        toast.success("Maestro editado con éxito!");

            }else{
                //Si nos arrojo error lo mostramos
                if(res.error) toast.error(res.error);
                //De lo contrario arrojamos un error por defecto en el toast
                else toast.error(ConstantsCatalogos.ERROR_DEFAULT);
            }

        } catch (err) {
            toast.error(err)
        } finally {
          setLoadingModal(false);
          setAnchorEl(null);
          onComplete();
        }

    };

    function handleQrcode(){
        console.log(maestro);

        setLoadingModal(true);
    //    setAnchorEl(null);
    };

    function handleEliminar(){
      setShowDialog(true);
    };
    
    //Codigo para mostar menu
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
                          <IconButton 
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}>
                            <MoreVertOutlinedIcon />
                          </IconButton>
                                <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={()=>handleEditar()}>
          <ListItemIcon>
            <EditOutlinedIcon fontSize="small" />
          </ListItemIcon>
          Editar
        </MenuItem>
        {getItemActivarDesactivar()}
        <MenuItem onClick={()=>handleQrcode()}>
          <ListItemIcon>
            <QrCodeOutlinedIcon fontSize="small" />
          </ListItemIcon>
          QR Code
        </MenuItem>
        <MenuItem onClick={()=>handleEliminar()}>
          <ListItemIcon>
            <DeleteOutlineOutlinedIcon fontSize="small" />
          </ListItemIcon>
          Eliminar
        </MenuItem>
      </Menu>
      <ConfirmacionDialog showDialog={showDialog} titulo={titulo_dialog} descripcion={descripcion_dialog} handleConfirmacion={handleDialog}/>
      </>
    )
}