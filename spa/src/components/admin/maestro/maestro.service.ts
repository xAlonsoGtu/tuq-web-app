import { MaestroForm } from "../../../models/maestro/maestroForm";
import { MaestroFormEditar, MaestroFormEditarStatus } from "../../../models/maestro/maestroFormEditar";
import { MaestroList } from "../../../models/maestro/maestroList";
import { ConstantsRoutes } from "../../../utils/constants/constantsRoutes";
import { del, get, getWithParams, post, put } from "../../../utils/services/api-client.service";


//Servicios o funciones que usar el modulo maestros
export class MaestroService {
  //Agregar 
  public agregar(form: MaestroForm) {
    return post<MaestroForm, string>(ConstantsRoutes.MAESTRO_AGREGAR, form, true);
  }

  //Editar
  public editar(form: MaestroFormEditar) {
    return put<MaestroFormEditar, string>(ConstantsRoutes.MAESTRO_EDITAR, form, true);
  }

  //Editar status
  public editarStatus(form: MaestroFormEditarStatus) {
    return put<MaestroFormEditarStatus, string>(ConstantsRoutes.MAESTRO_EDITAR_STATUS, form, true);
  }

  //Eliminar
  public eliminar(id: string) {
    return del<string>(ConstantsRoutes.MAESTRO_ELIMINAR + `/${id}`);
  }

  //Get
  public obtener(id: string) {
    return get<MaestroFormEditar>(ConstantsRoutes.MAESTRO_OBTENER + `/${id}`, true);
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
