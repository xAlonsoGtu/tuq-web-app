import { AvisoForm } from "../../../models/Avisos/avisoForm";
import { Aviso } from "../../../models/Avisos/aviso";



import { ConstantsRoutes } from "../../../utils/constants/constantsRoutes";
import { del, get, getWithParams, post, put } from "../../../utils/services/api-client.service";
import { Public } from "@mui/icons-material";

//Servicios o funciones que usa el módulo Avisos
export class AvisoService {
  //Agregar
  public agregar(form: AvisoForm) {
    return post<AvisoForm, string>(ConstantsRoutes.AVISOS_AGREGAR, form, true);
  }

  //Editar
  public editar(form: Aviso) {
    return put<Aviso, string>(ConstantsRoutes.AVISOS_EDITAR, form, true);
  }

  //Editar status
  public editarStatus(form: { aviso_id: number; status: number }) {
    return put<{ aviso_id: number; status: number }, string>(
      ConstantsRoutes.AVISOS_EDITAR_STATUS,
      form,
      true
    );
  }

  //Eliminar
  public eliminar(id: number) {
    return del<string>(`${ConstantsRoutes.AVISOS_ELIMINAR}/${id}`, true);
  }

  //Obtener por ID
  public obtener(id: number) {
    return get<Aviso>(`${ConstantsRoutes.AVISOS_OBTENER}/${id}`, true);
  }

  //Buscar con filtros
  public buscar(params: any) {
    return getWithParams<Aviso[]>(ConstantsRoutes.AVISOS_BUSCAR, params, true);
    


  }
}
