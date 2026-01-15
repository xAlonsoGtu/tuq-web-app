import { User } from "../../models/auth/loginForm";
import { ConfigService } from "./config.service";

export async function getType<T>(url:string): Promise<T> {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var response = await fetch(ConfigService.ApiURI + url, {
        method: "GET",
        //body: JSON.stringify({ username: "example" }),
        headers: myHeaders,
    });

    if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
    }

    const result = await response.json() as T;
        return result;
    }

export async function get(url:string){
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const url_api = ConfigService.ApiURI + url;
    var response = await fetch(ConfigService.ApiURI + url, {
        method: "GET",
        //body: JSON.stringify({ username: "example" }),
        headers: myHeaders,
    });
    
    //var ss = getTypeAuth<User>("ad");
    if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
    }

    const result = await response.json();
    console.log(result);
    return result;
}

// const response = await fetch("https://example.org/post", {
//   method: "POST",
//   body: JSON.stringify({ username: "example" }),
//   // …
// });

// const response = await fetch("https://example.org/post", {
//   method: "POST",
//   headers: {
//     "Content-Type": "application/x-www-form-urlencoded",
//   },
//   // Automatically converted to "username=example&password=password"
//   body: new URLSearchParams({ username: "example", password: "password" }),
//   // …
// });

// const params = new URLSearchParams();
// params.append("username", "example");

// // GET request sent to https://example.org/login?username=example
// const response = await fetch(`https://example.org/login?${params}`);
  
// async function post(request) {
//   try {
//     const response = await fetch(request);
//     const result = await response.json();
//     console.log("Success:", result);
//   } catch (error) {
//     console.error("Error:", error);
//   }
// }

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


