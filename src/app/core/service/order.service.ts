import {HttpClient, HttpErrorResponse, HttpParams} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GenericFilterRequest, PageRequest, PageableResponse } from '../core.model';
import { OrderDTO } from '../model/domain.model';
import { Observable, catchError, throwError } from 'rxjs';
import { ApiEndpoints } from '../app-url.constant';
import { CoreUtil } from '../core.util';

@Injectable({
  providedIn: 'root'
})
export class OrderService {


  readonly API_ENDPOINT = ApiEndpoints.API_URL;

  constructor(private http: HttpClient) {
  }

  public getAllOrders(pageRequest: PageRequest): Observable<PageableResponse<OrderDTO[]>> {
    const OrdersObservable: Observable<PageableResponse<OrderDTO[]>> = this.http.get<PageableResponse<OrderDTO[]>>(ApiEndpoints.ORDERS.ALL, {
      params: CoreUtil.buildPageParams(pageRequest)
    }).pipe(catchError(this.errorHandler));
    return OrdersObservable;
  }

  getOrderById(id: number): Observable<OrderDTO> {
    const OrderObservable: Observable<OrderDTO> = this.http.get<OrderDTO>(ApiEndpoints.ORDERS.GET_BY_ID + '/' + id);
    return OrderObservable;
  }

  updateOrder(id: number, Order: OrderDTO): Observable<OrderDTO> {
    const OrderDTO = { ...Order, id };
    const allOrdersObservable: Observable<OrderDTO> = this.http.put<OrderDTO>(ApiEndpoints.ORDERS.UPDATE, OrderDTO);
    return allOrdersObservable;
  }

  filterOrders(pageRequest: PageRequest, genericFilterRequest: GenericFilterRequest<OrderDTO>): Observable<PageableResponse<Array<OrderDTO>>> {
    const options = {
      params: CoreUtil.buildPageParams(pageRequest)
    };
    return this.http
      .post<PageableResponse<Array<OrderDTO>>>(ApiEndpoints.ORDERS.FILTER, genericFilterRequest, options)
      .pipe(catchError(this.errorHandler));
  }

  getOrderItems(productCode : string): Observable<any> {
    const params = new HttpParams()
      .set('productCode', productCode)
    return this.http.get<any>(ApiEndpoints.ORDERS.GET_BY_PRODUCT_CODE, {params});
  }

  patchOrder(orderId: number): Observable<boolean> {
    const allOrdersObservable: Observable<boolean> = this.http.patch<boolean>(ApiEndpoints.ORDERS.PATCH_ORDER+'/'+orderId, {});
    return allOrdersObservable;
  }


  errorHandler(error: HttpErrorResponse): Observable<any> {
    console.log('Order api error ', error);
    // show toast notification
    return throwError(error);
  }
}
