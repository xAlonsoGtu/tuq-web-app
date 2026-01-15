export interface ApiResponse<T> {
    success: boolean;
    payload: T;
    error: string;
    paginator: PaginatorResponse;
}

export class PaginatorResponse {
    constructor(
      public total: number,
      public pageIndex: string,
      public pageSize: number
    ) { }
  }
  