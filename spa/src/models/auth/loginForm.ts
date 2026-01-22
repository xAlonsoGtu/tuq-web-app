//Clase para envio de datos -> login
export class LoginForm {
    constructor(user:string, pass: string){
        this.user = user;
        this.pass = pass;
    }
    user: string;
    pass: string;
}

//Clase para obtener datos de la sesión del usuario
export class UsuarioAuth {
    id!: number;
    user!: string;
    tipo!: number;
    imagen!: string;
    qr!: string;
}