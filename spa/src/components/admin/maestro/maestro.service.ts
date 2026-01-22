import { MaestroForm } from "../../../models/maestro/maestroForm";
import { ConstantsRoutes } from "../../../utils/constants/constantsRoutes";
import { post } from "../../../utils/services/api-client.service";


//Servicios o funciones que usar el modulo maestros
export class MaestroService {
  //Agregar 
  public agregar(form: MaestroForm) {
    return post<MaestroForm, string>(ConstantsRoutes.MAESTRO_AGREGAR, form, true);
  }
}
