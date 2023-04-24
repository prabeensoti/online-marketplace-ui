import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {ApiEndpoints} from "@app/core/app-url.constant";
import {GenericFilterRequest, PageableResponse, PageRequest} from "@app/core/core.model";
import {OrderResponseDto} from "@app/core/model/order-response.model";
import {CoreUtil} from "@app/core/core.util";
import {ProductService} from "@app/core/service/product.service";
import { OrderDTO } from '../model/domain.model';

@Injectable({
  providedIn: 'root'
})
export class ManageOrderService {

  readonly API_ENDPOINT = ApiEndpoints.API_URL;

  constructor(private http: HttpClient, private productService: ProductService) { }

  getOrderByUser() : Observable<any> {
    return this.http.get<any>(ApiEndpoints.MANAGE_ORDERS.GET_BY_USER);
  }

  getAllOrderByVendor(pageRequest: PageRequest, ) : Observable<PageableResponse<OrderResponseDto[]>> {
    return this.http.get<PageableResponse<OrderResponseDto[]>>(ApiEndpoints.MANAGE_ORDERS.GET_BY_VENDOR, {
      params: CoreUtil.buildPageParams(pageRequest)
    }).pipe(catchError(this.productService.errorHandler));
  }

  getOrderByAdmin(pageRequest: PageRequest) : Observable<PageableResponse<OrderResponseDto[]>> {
    return this.http.get<PageableResponse<OrderResponseDto[]>>(ApiEndpoints.MANAGE_ORDERS.GET_BY_ADMIN, {
      params: CoreUtil.buildPageParams(pageRequest)
    }).pipe(catchError(this.productService.errorHandler));
  }

  filterManageOrders(pageRequest: PageRequest, genericFilterRequest: GenericFilterRequest<OrderDTO>): Observable<PageableResponse<Array<OrderResponseDto>>> {
    const options = {
      params: CoreUtil.buildPageParams(pageRequest)
    };
    return this.http
      .post<PageableResponse<Array<OrderResponseDto>>>(ApiEndpoints.MANAGE_ORDERS.FILTER, genericFilterRequest, options)
      .pipe(catchError(this.errorHandler));
  }

  errorHandler(error: HttpErrorResponse): Observable<any> {
    console.log('Product api error ', error);
    // show toast notification
    return throwError(error);
  }

}
