import { AlumnoForm } from "../../../models/alumno/alumnoForm";
import { ConstantsRoutes } from "../../../utils/constants/constantsRoutes";
import { post } from "../../../utils/services/api-client.service";

export class AlumnoService {
  public agregar(form: AlumnoForm) {
    return post<AlumnoForm, string>(
      ConstantsRoutes.ALUMNO_AGREGAR,
      form,
      true
    );
  }
}
