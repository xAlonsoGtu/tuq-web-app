//Interfaz, permite restringir la estructura de los datos obtenidos del servidor
//El uso frecuente no afectará el rendimiento del programa, caso contrario las clases
export interface ApiResponse<T> {
    success: boolean;
    payload: T;
    error: string;
    paginator: PaginatorResponse;
}

export class PaginatorResponse {
    constructor(
      public total: number,
      public pageIndex: number,
      public pageSize: number,
      public pages: number
    ) { }
  }
  