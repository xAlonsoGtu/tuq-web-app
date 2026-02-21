//Rutas de react y API
export class ConstantsRoutes {
    /* ANGULAR ROUTES */
    static get SPA_LOGIN() { return "/auth/login"; };
    static get SPA_USER_HOME() { return "/"; };
    static get SPA_CHEK_HOME() { return "/check"; };
    static get SPA_ADMIN_HOME() { return "/admin/panel"; };
    static get SPA_MAESTRO_LISTAR() { return "/admin/maestro"; };
    static get SPA_EMPLEADOS_AGREGAR() { return "/admin/empleados/agregar" }; 
    static get SPA_EMPLEADOS_LISTAR() { return "/admin/empleados"; };

    /* API ROUTES */
    /* AUTH */
    static get LOGIN() { return "/api/auth/login"; };

    /* MAESTROS */
    static get MAESTRO_AGREGAR() { return "/api/maestro/agregar"; };
    static get MAESTRO_EDITAR() { return "/api/maestro/editar"; };
    static get MAESTRO_EDITAR_STATUS() { return "/api/maestro/status"; };
    static get MAESTRO_ELIMINAR() { return "/api/maestro/eliminar"; };
    static get MAESTRO_OBTENER() { return "/api/maestro/obtener"; };
    static get MAESTRO_BUSCAR() { return "/api/maestro/buscar"; };

     /* EMPLEADOS */
    static get EMPLEADOS_AGREGAR() { return "/api/empleados/agregar"; };
    static get EMPLEADOS_EDITAR() { return "/api/empleados/editar"; };
    static get EMPLEADOS_EDITAR_STATUS() { return "/api/empleados/status"; };
    static get EMPLEADOS_ELIMINAR() { return "/api/empleados/eliminar"; };
    static get EMPLEADOS_OBTENER() { return "/api/empleadosobtener"; };
    static get EMPLEADOS_BUSCAR() { return "/api/empleados/buscar"; };
}