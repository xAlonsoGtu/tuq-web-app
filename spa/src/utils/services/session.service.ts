import { jwtDecode } from "jwt-decode";
import { ConstantsRoutes } from "../constants/constantsRoutes";
import { UsuarioAuth } from "../../models/auth/loginForm";

//Guarda el token y devuelve que ruta seguir
export function initSession(token: string, callBack: string): string{
  //Ruta por defecto
    var url_callback = ConstantsRoutes.SPA_LOGIN;
    try {
        //Guarda en localStorage el token del usuario
        window.localStorage.setItem("token", token);

        //Obtiene la información del token
        var tokenDecode = getTokenDecode(token);

        //Valida si es correcto el token
        if (validateTokenDecode(tokenDecode)) {          
          //Obtenemos ruta siguiente
          url_callback = getUrlRedirect(tokenDecode);
        }     
        //Si no es valido el token removemos token de session 
        else url_callback = removeSession();  
    } catch (err) {
      console.log(err);
    }
    return url_callback;
}

  //Log-out, removemos token de localStorage
  export function removeSession(): string {
    localStorage.removeItem('token');
    //Devolvemos ruta a seguir desúés remover la sessión
    return (ConstantsRoutes.SPA_LOGIN);
  }

  //Devuelve ruta dependiendo del tipo de usuario
  export function getUrlRedirect(usuario: UsuarioAuth): string {
    var url_return = "";
    switch (usuario.tipo) {
      case 0: url_return = ConstantsRoutes.SPA_USER_HOME;
        break;
      case 1: url_return = ConstantsRoutes.SPA_ADMIN_HOME;
        break;
      case 2: url_return = ConstantsRoutes.SPA_USER_HOME;
        break;
      case 3: url_return = ConstantsRoutes.SPA_USER_HOME;
        break;
      case 4: url_return = ConstantsRoutes.SPA_CHEK_HOME;
        break;
    }
    return url_return;
  }
 
//Obtiene el usuario del token
export function getUsuarioAuth(){
  //Obtiene token
  var token = getTokenLocalStorage();
  if(token == "") return null;
  //Obtiene la información del token
  return getTokenDecode(token);
}
 
//Valida el usuario del token
export function validarUsuarioAuth(tipo: number){
  //Obtiene token
  var token = getTokenLocalStorage();
  if(token == "") return false;

  //Obtiene la información del token
  var userAuth = getTokenDecode(token);
  if(!validateTokenDecode(userAuth)) return false;
  
  //Validar por tipo
  if(userAuth.tipo == tipo) return true;

  return false;
}

//Valida la existencia de token en el localStorage
function  getTokenLocalStorage(): string {
  var token = localStorage.getItem('token');
  if (token != null && token != "") {
    return token;
  }
  return "";
}

//Decode el Token
function getTokenDecode(token: string): UsuarioAuth {
  var usuario = new UsuarioAuth();
  usuario.user = 'NA';
  if (token != null) {
    try {
      var t: any = jwtDecode(token);
      if (t != null) {
        usuario.id = t.data.id;
        usuario.user = t.data.user;
        usuario.tipo = t.data.tipo;
        usuario.imagen = t.data.imagen;
        usuario.qr = t.data.qr;
      }
    } catch (e) {
      console.log("-> Error: " + e);
    }
  }
  return usuario;
}

//Valida que tenga datos correctos el token
function validateTokenDecode(usuario: UsuarioAuth): boolean {
  if (usuario == null) return false;
  if (usuario.user == 'NA' || usuario.user == undefined || usuario.tipo == undefined) return false;
  return true;
}


