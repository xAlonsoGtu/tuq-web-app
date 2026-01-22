import { LoginForm, UsuarioAuth } from "../../models/auth/loginForm";
import { ConstantsRoutes } from "../../utils/constants/constantsRoutes";
import { post } from "../../utils/services/api-client.service";

//Servicios o funciones que usar el modulo auth
export class AuthService {
  //Login 
  public login(form: LoginForm) {
    return post<LoginForm, UsuarioAuth>(ConstantsRoutes.LOGIN, form, false);
  }
}
