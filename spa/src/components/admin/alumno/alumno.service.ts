import { AlumnoForm } from "../../../models/alumno/alumnoForm";
import { ConstantsRoutes } from "../../../utils/constants/constantsRoutes";
import { post, getWithParams } from "../../../utils/services/api-client.service";
import { AlumnoList } from "../../../models/alumno/alumnoList";


export class AlumnoService {
  public agregar(form: AlumnoForm) {
    return post<AlumnoForm, string>(
      ConstantsRoutes.ALUMNO_AGREGAR,
      form,
      true
    );
  }

  public buscar(palabra: string, ordenBy: string, orden: string, pagina: number) {
    const params = new URLSearchParams();
    params.append("palabra", palabra);
    params.append("ordenBy", ordenBy);
    params.append("orden", orden);
    params.append("pagina", pagina.toString());

    return getWithParams<AlumnoList[]>(ConstantsRoutes.ALUMNO_BUSCAR, params, true);
  } 


}
