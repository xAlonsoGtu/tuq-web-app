import { LoginForm, User } from "../../models/auth/loginForm";
import { ConstantsRoutes } from "../../utils/constants/constantsRoutes";
import { getType } from "../../utils/services/api-client.service";

export class AuthService {
  apiClient: any;
  constructor(
  ) {
    //this.apiClient =  ApiClientService();
  }


  public login(form: LoginForm) {
    //return this.apiClient.get<string, LoginForm>(ConstantsRoutes.LOGIN, form);
    //return this.apiClient.get(ConstantsRoutes.LOGIN);
    return getType<User>(ConstantsRoutes.LOGIN);
    //return this.apiClient.get(ConstantsRoutes.LOGIN);
  }
  
  // public login(form: LoginForm): Observable<ApiResponse<TokenResponse>> {
  //   return this.apiClient.apiPostSimple<TokenResponse, LoginForm>(ConstantsRoutes.LOGIN, form);
  // }

  // public reset(form: ResetForm): Observable<ApiResponse<TokenResponse>> {
  //   return this.apiClient.apiPostSimple<TokenResponse, ResetForm>(ConstantsRoutes.RESET, form);
  // }
}
