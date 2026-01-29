//Rutas de react y API
export class ConstantsRoutes {
    /* ANGULAR ROUTES */
    static get SPA_LOGIN() { return "/auth/login"; };
    static get SPA_USER_HOME() { return "/"; };
    static get SPA_CHEK_HOME() { return "/check"; };
    static get SPA_ADMIN_HOME() { return "/admin/panel"; };
    static get SPA_MAESTRO_LISTAR() { return "/admin/maestro"; };
    static get SPA_MAESTRO_AGREGAR() { return "/admin/maestro/agregar"; };

    /* API ROUTES */
    /* AUTH */
    static get LOGIN() { return "/api/auth/login"; };

    /* MAESTROS */
    static get MAESTRO_BUSCAR() { return "/api/maestro/buscar"; };
    static get MAESTRO_AGREGAR() { return "/api/maestro/agregar"; };
}