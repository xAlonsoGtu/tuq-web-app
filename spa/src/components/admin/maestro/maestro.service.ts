import { MaestroForm } from "../../../models/maestro/maestroForm";
import { MaestroList } from "../../../models/maestro/maestroList";
import { ConstantsRoutes } from "../../../utils/constants/constantsRoutes";
import { getWithParams, post } from "../../../utils/services/api-client.service";


//Servicios o funciones que usar el modulo maestros
export class MaestroService {
  //Agregar 
  public agregar(form: MaestroForm) {
    return post<MaestroForm, string>(ConstantsRoutes.MAESTRO_AGREGAR, form, true);
  }

  //Buscar
  public buscar(palabra: string, ordenBy: string, orden: string, pagina: number) {
    const params = new URLSearchParams();
    params.append("palabra", palabra);
    params.append("ordenBy", ordenBy);
    params.append("orden", orden);
    params.append("pagina", pagina.toString());

    return getWithParams<MaestroList[]>(ConstantsRoutes.MAESTRO_BUSCAR, params, true);
  }
}
