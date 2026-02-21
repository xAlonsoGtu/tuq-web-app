//Rutas de react y API
export class ConstantsRoutes {
    /* ANGULAR ROUTES */
    static get SPA_LOGIN() { return "/auth/login"; };
    static get SPA_ALUMNO_HOME() { return "/alumno/home"; };
    static get SPA_EMPLEADO_HOME() { return "/empleado/home"; };
    static get SPA_MAESTRO_HOME() { return "/maestro/home"; };
    static get SPA_CHECADOR_HOME() { return "/checador/home"; };
    static get SPA_ADMIN_HOME() { return "/admin/panel"; };
    static get SPA_MAESTRO_LISTAR() { return "/admin/maestro"; };
    static get SPA_MAESTRO_AGREGAR() { return "/admin/maestro/agregar"; };
  static get SPA_EMPLEADO_LISTAR() { return "/admin/empleado"; };
    static get SPA_EMPLEADO_AGREGAR() { return "/admin/empleado/agregar"; };
    static get SPA_EMPLEADO_EDITAR() { return "/admin/empleado/editar"; };
    static get SPA_MAESTRO_EDITAR() { return "/admin/maestro/editar"; };
    static get SPA_MAESTRO_PERFIL() { return "/admin/maestro/perfil"; };

    /* API ROUTES */
    /* AUTH */
    static get LOGIN() { return "/api/auth/login"; };

    /* MAESTROS */
    static get MAESTRO_AGREGAR() { return "/api/maestro/agregar"; };
    static get MAESTRO_EDITAR() { return "/api/maestro/editar"; };
    static get MAESTRO_EDITAR_STATUS() { return "/api/maestro/status"; };
    static get MAESTRO_ELIMINAR() { return "/api/maestro/eliminar"; };
    static get MAESTRO_OBTENER() { return "/api/maestro"; };
    static get MAESTRO_BUSCAR() { return "/api/maestro/buscar"; };
        /* API ROUTES */
    static get EMPLEADO_AGREGAR() { return "/api/empleado/agregar"; };
    static get EMPLEADO_EDITAR() { return "/api/empleado/editar"; };
    static get EMPLEADO_EDITAR_STATUS() { return "/api/empleado/status"; };
    static get EMPLEADO_ELIMINAR() { return "/api/empleado/eliminar"; };
    static get EMPLEADO_OBTENER() { return "/api/empleado/obtener"; };
    static get EMPLEADO_BUSCAR() { return "/api/empleado/buscar"; };




    /* ALUMNO */
    static get ALUMNO_AGREGAR() { return "/api/alumno/agregar"; };
}
