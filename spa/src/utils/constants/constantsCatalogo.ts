import { WrapCatalogo, WrapCatalogoNumber } from "../../models/shared/wrapCatalog";

//Catalogos globales
export class ConstantsCatalogos {

  //Mensaje de error por default
  public static get ERROR_DEFAULT(): string {
    return "Error al procesar la solicitud.";
  };

  public static get CURRENCY_TYPE(): WrapCatalogo[] {
    var a = new Array();
    a.push({ key: 'USD', value: 'USD'});
    a.push({ key: 'MXN', value: 'MXN'});
    a.push({ key: 'EUR', value: 'EUR'});
    return a;
  }

  public static get EVENT_STATE(): WrapCatalogoNumber[] {
    var a = new Array();
    a.push({ key: 0, value: 'All states'});
    a.push({ key: 1, value: 'Active'});
    a.push({ key: 2, value: 'Inactive'});
    a.push({ key: 99, value: 'Not approved'});
    a.push({ key: 5, value: 'Live'});
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