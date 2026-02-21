class Avisos {
  aviso_id;         
  nombre;           
  descripcion;     
  imagen_url;     
  fecha_inicio;    
  status;          
  created_at;      
  updated_at;       
  deleted_at;       
}

//   export class Avisos {
//   constructor(aviso) {
//     this.aviso_id = aviso.aviso_id;
//     this.nombre = aviso.nombre;
//     this.descripcion = aviso.descripcion;
//     this.imagen_url = aviso.imagen_url;
//     this.fecha_inicio = aviso.fecha_inicio;
//     this.status = aviso.status;
//     this.created_at = aviso.created_at;
//     this.updated_at = aviso.updated_at;
//     this.deleted_at = aviso.deleted_at;
//   }
// }
 
class AvisosAdd {
     constructor(nAvisos) { 
        this.nombre = nAviso.nombre; 
        this.descripcion = nAviso.descripcion; 
        this.imagen_url = nAviso.imagen_url;
         this.fecha_inicio = nAviso.fecha_inicio; 
         this.status = nAviso.status; } }

module.exports = { Avisos,AvisosAdd };
