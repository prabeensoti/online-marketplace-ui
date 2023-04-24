import { Injectable } from '@angular/core';
import {ProductDTO, SearchFilterContext, VerifyProductDTO} from '../model/domain.model';
import { Observable, catchError, throwError } from 'rxjs';
import {HttpClient, HttpErrorResponse, HttpParams} from '@angular/common/http';
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

  // public getAllPublishedProducts(): Observable<PageableResponse<ProductDTO[]>> {
  //   const ProductsObservable: Observable<PageableResponse<ProductDTO[]>> = this.http.get<PageableResponse<ProductDTO[]>>(ApiEndpoints.PRODUCTS.ALL_PUBLISHED);
  //   return ProductsObservable;
  // }

  public getAllPublishedProducts(pageRequest: PageRequest): Observable<PageableResponse<ProductDTO[]>> {
    const ProductsObservable: Observable<PageableResponse<ProductDTO[]>> = this.http.get<PageableResponse<ProductDTO[]>>(ApiEndpoints.PRODUCTS.ALL_PUBLISHED, {
      params: CoreUtil.buildPageParams(pageRequest)
    }).pipe(catchError(this.errorHandler));
    return ProductsObservable;
  }

  public getAllTopPublishedProductsByCategory(pageRequest: PageRequest, categoryId: number): Observable<PageableResponse<ProductDTO[]>> {
    const ProductsObservable: Observable<PageableResponse<ProductDTO[]>> = this.http.get<PageableResponse<ProductDTO[]>>(ApiEndpoints.PRODUCTS.ALL_PUBLISHED, {
      params: {...pageRequest, categoryId: categoryId}
    }).pipe(catchError(this.errorHandler));
    return ProductsObservable;
  }

  public getAllPublishedAndTempProducts(pageRequest: PageRequest): Observable<PageableResponse<ProductDTO[]>> {
    const ProductsObservable: Observable<PageableResponse<ProductDTO[]>> = this.http.get<PageableResponse<ProductDTO[]>>(ApiEndpoints.PRODUCTS.ALL_PUBLISHED_AND_TEMP, {
      params: CoreUtil.buildPageParams(pageRequest)
    }).pipe(catchError(this.errorHandler));
    return ProductsObservable;
  }

  public getAllPublishedAndTempProductsOfVendor(pageRequest: PageRequest): Observable<PageableResponse<ProductDTO[]>> {
    const ProductsObservable: Observable<PageableResponse<ProductDTO[]>> = this.http.get<PageableResponse<ProductDTO[]>>(ApiEndpoints.PRODUCTS.ALL_PUBLISHED_AND_TEMP_OF_VENDOR, {
      params: CoreUtil.buildPageParams(pageRequest)
    }).pipe(catchError(this.errorHandler));
    return ProductsObservable;
  }

  public searchProductByAdvanceFilter(pageRequest : PageRequest, searchFilterContext: SearchFilterContext) : Observable<PageableResponse<ProductDTO[]>> {
    // const pageParams: any = CoreUtil.buildPageParams(pageRequest);
    const ProductsObservable: Observable<PageableResponse<ProductDTO[]>> = this.http.get<PageableResponse<ProductDTO[]>>(ApiEndpoints.PRODUCTS.SEARCH, {
      params: {...pageRequest, ...searchFilterContext}
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

  filterForAllPublishedAndTempProducts(pageRequest: PageRequest, genericFilterRequest: GenericFilterRequest<ProductDTO>): Observable<PageableResponse<Array<ProductDTO>>> {
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


  saveProduct(productFormData : FormData): Observable<ProductModel> {
    return this.http.post<ProductModel>(ApiEndpoints.PRODUCTS.CREATE, productFormData);
  }

  verifyProduct(data: VerifyProductDTO): Observable<ProductDTO> {
    let params = new HttpParams();
    params = params.append('productId', data.productId)
    params = params.append('isVerified', data.isVerified);
    return this.http.put<ProductDTO>(ApiEndpoints.PRODUCTS.VERIFY, params);
  }
}
