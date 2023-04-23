
export interface StatusModel {
  loading: boolean;
  hasError: boolean;
  message?: string;
  messageType?: 'auto' | 'info' | 'success' | 'warning' | 'danger' | 'light'
}
export interface PageRequest {
  page: number;
  size: number;
  sort: string;
  direction: string;
}

export interface GenericResponse<T> {
  messageCode: string;
  response: T;
}

export interface GenericFilterRequest<T> {
  searchText?: any;
  dataFilter: T;
}

export interface PageableResponse<T> {
  content: T;
  totalElements: number; // all elements count
  size?: number; // page size - default: 10 elements per page 
  number?: number; // current page number
}

// export interface GenericResponse<T> {
//   response: T;
//   messageCode: string;
// }
