import { Injectable } from '@angular/core';
import { ProductDTO } from '../model/domain.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ApiEndpoints } from '../app-url.constant';
import { PageableResponse } from '../core.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

   readonly API_ENDPOINT = ApiEndpoints.API_URL;

  constructor(private http: HttpClient) {
  }

  public getAllProducts(): Observable<PageableResponse<ProductDTO[]>> {
    const ProductsObservable: Observable<PageableResponse<ProductDTO[]>> = this.http.get<PageableResponse<ProductDTO[]>>(ApiEndpoints.PRODUCTS.ALL);
    return ProductsObservable;
  }

  getProductById(id: number): Observable<ProductDTO> {
    const ProductObservable: Observable<ProductDTO> = this.http.get<ProductDTO>(ApiEndpoints.PRODUCTS.GET_BY_ID + '/' + id);
    return ProductObservable;
  }

  updateProduct(id: number, Product: ProductDTO): Observable<ProductDTO> {
    const ProductEntity = {...Product, id};
    const allCandidateJobsObservable: Observable<ProductDTO> = this.http.put<ProductDTO>(ApiEndpoints.PRODUCTS.UPDATE, ProductEntity);
    return allCandidateJobsObservable;
  }
}
