import { EmpleadoForm } from "../../../models/empleado/empleadoForm";
import { EmpleadoList } from "../../../models/empleado/empleadoList";
import { ConstantsRoutes } from "../../../utils/constants/constantsRoutes";
import { del, get, getWithParams, post, put } from "../../../utils/services/api-client.service";

// Servicios o funciones que usa el módulo empleados
export class EmpleadoService {
    // Agregar
    public agregar(form: EmpleadoForm) {
        return post<EmpleadoForm, string>(ConstantsRoutes.EMPLEADO_AGREGAR, form, true);
    }

    // Listar / Buscar
    public listar(palabra: string, ordenBy: string, orden: string, pagina: number) {
        const params = new URLSearchParams();
        params.append("palabra", palabra);
        params.append("ordenBy", ordenBy);
        params.append("orden", orden);
        params.append("pagina", pagina.toString());

        return getWithParams<EmpleadoList[]>(ConstantsRoutes.EMPLEADO_BUSCAR, params, true);
    }
}
