import { ApiResponse } from "../../models/shared/apiResponse";
import { ConfigService } from "./config.service";

//Funccion POST API generica
//T = Objeto del formulario
//R = Objeto payload
//Devuelve una promesa con el objeto ApiResponse
export async function post<T, R>(url:string, form: T, auth: boolean = true): Promise<ApiResponse<R>>  {
    //Creamos encabezados, indicamos que tipo de recuerso envia (json)
    const customHeaders = new Headers();
    customHeaders.append("Content-Type", "application/json");

    //Si API necesita auth
    if(auth){
        //Obtenemos token
        var BearerToken = localStorage.getItem('token');
        if(BearerToken == null) BearerToken = "";
        //Agregamos token al encabezado  
        customHeaders.append('Authorization', BearerToken);
    }

    //Realizamos la solicitud HTTP asincróna,  
    var response = await fetch(ConfigService.ApiURI + url, {
        method: "POST",
        body: JSON.stringify(form),
        headers: customHeaders,
    });
    
    //Si hay respuesta la trasformamos en json
    var result:any;
    if(response)
        result = await response.json();

    //Devolvemos resultado
    return result;
}

//Funccion PUT API generica
export async function put<T, R>(url:string, form: T, auth: boolean = true): Promise<ApiResponse<R>>  {
    //Creamos encabezados, indicamos que tipo de recuerso envia (json)
    const customHeaders = new Headers();
    customHeaders.append("Content-Type", "application/json");

    //Si API necesita auth
    if(auth){
        //Obtenemos token
        var BearerToken = localStorage.getItem('token');
        if(BearerToken == null) BearerToken = "";
        //Agregamos token al encabezado  
        customHeaders.append('Authorization', BearerToken);
    }

    //Realizamos la solicitud HTTP asincróna,  
    var response = await fetch(ConfigService.ApiURI + url, {
        method: "PUT",
        body: JSON.stringify(form),
        headers: customHeaders,
    });
    
    //Si hay respuesta la trasformamos en json
    var result:any;
    if(response)
        result = await response.json();

    //Devolvemos resultado
    return result;
}

//Funccion DELETE API generica
export async function del<T, R>(url:string, form: T, auth: boolean = true): Promise<ApiResponse<R>>  {
    //Creamos encabezados, indicamos que tipo de recuerso envia (json)
    const customHeaders = new Headers();
    customHeaders.append("Content-Type", "application/json");

    //Si API necesita auth
    if(auth){
        //Obtenemos token
        var BearerToken = localStorage.getItem('token');
        if(BearerToken == null) BearerToken = "";
        //Agregamos token al encabezado  
        customHeaders.append('Authorization', BearerToken);
    }

    //Realizamos la solicitud HTTP asincróna,  
    var response = await fetch(ConfigService.ApiURI + url, {
        method: "DELETE",
        body: JSON.stringify(form),
        headers: customHeaders,
    });
    
    //Si hay respuesta la trasformamos en json
    var result:any;
    if(response)
        result = await response.json();

    //Devolvemos resultado
    return result;
}

export async function get<R>(url:string, auth: boolean = true): Promise<ApiResponse<R>>  {
    //Creamos encabezados, indicamos que tipo de recuerso envia (json)
    const customHeaders = new Headers();
    customHeaders.append("Content-Type", "application/json");

    //Si API necesita auth
    if(auth){
        //Obtenemos token
        var BearerToken = localStorage.getItem('token');
        if(BearerToken == null) BearerToken = "";
        //Agregamos token al encabezado  
        customHeaders.append('Authorization', BearerToken);
    }

    //Realizamos la solicitud HTTP asincróna,  
    var response = await fetch(ConfigService.ApiURI + url, {
        method: "GET",
        headers: customHeaders,
    });
    
    //Si hay respuesta la trasformamos en json
    var result:any;
    if(response)
        result = await response.json();

    //Devolvemos resultado
    return result;
}

export async function getWithForm<T, R>(url:string, form: T, auth: boolean = true): Promise<ApiResponse<R>>  {
    //Creamos encabezados, indicamos que tipo de recuerso envia (json)
    const customHeaders = new Headers();
    customHeaders.append("Content-Type", "application/json");

    //Si API necesita auth
    if(auth){
        //Obtenemos token
        var BearerToken = localStorage.getItem('token');
        if(BearerToken == null) BearerToken = "";
        //Agregamos token al encabezado  
        customHeaders.append('Authorization', BearerToken);
    }

    //Realizamos la solicitud HTTP asincróna,  
    var response = await fetch(ConfigService.ApiURI + url, {
        method: "GET",
        body: JSON.stringify(form),
        headers: customHeaders,
    });
    
    //Si hay respuesta la trasformamos en json
    var result:any;
    if(response)
        result = await response.json();

    //Devolvemos resultado
    return result;
}

export async function getWithParams<R>(url:string, params: URLSearchParams, auth: boolean = true): Promise<ApiResponse<R>>  {
    //Creamos encabezados, indicamos que tipo de recuerso envia (json)
    const customHeaders = new Headers();
    customHeaders.append("Content-Type", "application/json");

    //Si API necesita auth
    if(auth){
        //Obtenemos token
        var BearerToken = localStorage.getItem('token');
        if(BearerToken == null) BearerToken = "";
        //Agregamos token al encabezado  
        customHeaders.append('Authorization', BearerToken);
    }

    //const params = new URLSearchParams();
    // params.append("username", "example");

    //Creamos nueva url y asignamos parametros
    const url_new = new URL(ConfigService.ApiURI + url);
    url_new.search = params.toString();

    //Realizamos la solicitud HTTP asincróna,  
    var response = await fetch(url_new , {
        method: "GET",
        headers: customHeaders,
    // Automatically converted to "username=example&password=password"
    //body: new URLSearchParams({ username: "example", password: "password" }),
    });
    
    //Si hay respuesta la trasformamos en json
    var result:any;
    if(response)
        result = await response.json();

    //Devolvemos resultado
    return result;
}
  

// async function setImage() {
//   try {
//     const response = await fetch(url);
//     if (!response.ok) {
//       throw new Error(`Response status: ${response.status}`);
//     }
//         const contentType = response.headers.get("content-type");
//     if (!contentType || !contentType.includes("application/json")) {
//       throw new TypeError("Oops, we haven't got JSON!");
//     }
//     const blob = await response.blob();
//     const objectURL = URL.createObjectURL(blob);
//     image.src = objectURL;
//   } catch (e) {
//     console.error(e);
//   }
// }


