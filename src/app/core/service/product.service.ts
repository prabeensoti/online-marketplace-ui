import { Injectable } from '@angular/core';
import { ProductDTO } from '../model/domain.model';
import { Observable, catchError, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ApiEndpoints } from '../app-url.constant';
import { GenericFilterRequest, PageRequest, PageableResponse } from '../core.model';
import { CoreUtil } from '../core.util';
import {ProductModel} from "@app/core/model/product.model";

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

  public getAllProductsWithPage(pageRequest: PageRequest): Observable<PageableResponse<ProductDTO[]>> {
    const ProductsObservable: Observable<PageableResponse<ProductDTO[]>> = this.http.get<PageableResponse<ProductDTO[]>>(ApiEndpoints.PRODUCTS.ALL, {
      params: CoreUtil.buildPageParams(pageRequest)
    }).pipe(catchError(this.errorHandler));
    return ProductsObservable;
  }

  getProductById(id: number): Observable<ProductDTO> {
    const ProductObservable: Observable<ProductDTO> = this.http.get<ProductDTO>(ApiEndpoints.PRODUCTS.GET_BY_ID + '/' + id);
    return ProductObservable;
  }

  updateProduct(id: number, Product: ProductDTO): Observable<ProductDTO> {
    const ProductEntity = { ...Product, id };
    const allProductsObservable: Observable<ProductDTO> = this.http.put<ProductDTO>(ApiEndpoints.PRODUCTS.UPDATE, ProductEntity);
    return allProductsObservable;
  }

  filterProducts(pageRequest: PageRequest, genericFilterRequest: GenericFilterRequest<ProductDTO>): Observable<PageableResponse<Array<ProductDTO>>> {
    const options = {
      params: CoreUtil.buildPageParams(pageRequest)
    };
    return this.http
      .post<PageableResponse<Array<ProductDTO>>>(ApiEndpoints.PRODUCTS.FILTER, genericFilterRequest, options)
      .pipe(catchError(this.errorHandler));
  }


  errorHandler(error: HttpErrorResponse): Observable<any> {
    console.log('Product api error ', error);
    // show toast notification
    return throwError(error);
  }


  saveProduct(product : ProductModel): Observable<ProductModel> {
    return this.http.post<ProductModel>(ApiEndpoints.PRODUCTS.CREATE, product);
  }
}
