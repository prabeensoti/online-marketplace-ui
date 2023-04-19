export interface PageRequest {
    page: number;
    size: number;
    sort: string;
    direction: string;
  }
  
  export interface PageableResponse<T> {
    content: T;
    totalElements: number; // all elements count
    size?: number; // page size - default: 10 elements per page 
    number?: number; // current page number
  }

  export interface GenericResponse<T> {
    response: T;
    messageCode: string;
}
