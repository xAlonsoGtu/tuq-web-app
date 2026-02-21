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

     /* EMPLEADOS */
    static get EMPLEADOS_AGREGAR() { return "/api/empleados/agregar"; };
    static get EMPLEADOS_EDITAR() { return "/api/empleados/editar"; };
    static get EMPLEADOS_EDITAR_STATUS() { return "/api/empleados/status"; };
    static get EMPLEADOS_ELIMINAR() { return "/api/empleados/eliminar"; };
    static get EMPLEADOS_OBTENER() { return "/api/empleadosobtener"; };
    static get EMPLEADOS_BUSCAR() { return "/api/empleados/buscar"; };
}
