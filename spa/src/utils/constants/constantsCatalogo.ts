import { WrapCatalogo, WrapCatalogoNumber } from "../../models/shared/wrapCatalog";

//Catalogos globales
export class ConstantsCatalogos {

  //Mensaje de error por default
  public static get ERROR_DEFAULT(): string {
    return "Error al procesar la solicitud.";
  };

  public static get MAESTRO_FILTRO(): WrapCatalogo[] {
    var a = new Array();
    a.push({ key: 'nombre', value: 'Nombre'});
    a.push({ key: 'apellido_paterno', value: 'Apellido paterno'});
    a.push({ key: 'apellido_materno', value: 'Apellido materno'});
    a.push({ key: 'carrera', value: 'Carrera'});
    a.push({ key: 'coordinador', value: 'Coordinador'});
    return a;
  }

  public static get ESCOLARIDAD(): WrapCatalogoNumber[] {
    var a = new Array();
    a.push({ key: 0, value: 'NA'});
    a.push({ key: 1, value: 'Licenciatura'});
    a.push({ key: 2, value: 'Especialidad'});
    a.push({ key: 3, value: 'Maestría'});
    a.push({ key: 4, value: 'Doctorado'});
    return a;
   }

  public static get CARRERA(): WrapCatalogoNumber[] {
    var a = new Array();
    a.push({ key: 0, value: 'NA'});
    a.push({ key: 1, value: 'Ing. Sistemas'});
    a.push({ key: 2, value: 'Ing. Industrial'});
    a.push({ key: 3, value: 'Psicología'});
    a.push({ key: 4, value: 'Arquitectura'});
    return a;
   }
}

//Funciones constantes para obtener valores de catalogo
export function getTipoUsuario(tipo: number) {
  switch(tipo){
    case 0: return "Alumno";
    case 1: return "Administrador";
    case 2: return "Empleado";
    case 3: return "Maestro";
    case 4: return "Checador";
    default: return "";
  }
}

export function getCarrera(key: number) {
  var fValue = ConstantsCatalogos.CARRERA.find(c => c.key == key);
  if(fValue != null) return fValue.value;
  return "";
}