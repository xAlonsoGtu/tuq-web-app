//Rutas de react y API
export class ConstantsRoutes {
    /* ANGULAR ROUTES */
    static get SPA_LOGIN() { return "/auth/login"; };
    static get SPA_USER_HOME() { return "/"; };
    static get SPA_CHEK_HOME() { return "/check"; };
    static get SPA_ADMIN_HOME() { return "/admin/panel"; };
    static get SPA_MAESTRO_LISTAR() { return "/admin/maestro"; };
    static get SPA_MAESTRO_AGREGAR() { return "/admin/maestro/agregar"; };
    static get SPA_ALUMNO_LISTAR() { return "/admin/alumno"; };
    static get SPA_ALUMNO_AGREGAR() { return "/admin/alumno/agregar"; };
    static get SPA_ALUMNO_BUSCAR() { return "/admin/alumno/buscar"; };

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

    /* ALUMNOS */
static get ALUMNO_AGREGAR() { return "/api/alumno/agregar"; };
static get ALUMNO_BUSCAR() { return "/api/alumno/buscar"; };


}
