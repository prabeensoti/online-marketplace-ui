import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, Observable} from "rxjs";
import {ApiEndpoints} from "@app/core/app-url.constant";
import {PageableResponse, PageRequest} from "@app/core/core.model";
import {OrderResponseDto} from "@app/core/model/order-response.model";
import {CoreUtil} from "@app/core/core.util";
import {ProductService} from "@app/core/service/product.service";

@Injectable({
  providedIn: 'root'
})
export class ManageOrderService {

  readonly API_ENDPOINT = ApiEndpoints.API_URL;

  constructor(private http: HttpClient, private productService: ProductService) { }

  getOrderByUser() : Observable<any> {
    return this.http.get<any>(ApiEndpoints.MANAGE_ORDERS.GET_BY_USER);
  }

  getOrderByVendor(pageRequest: PageRequest) : Observable<PageableResponse<OrderResponseDto[]>> {
    return this.http.get<PageableResponse<OrderResponseDto[]>>(ApiEndpoints.MANAGE_ORDERS.GET_BY_VENDOR, {
      params: CoreUtil.buildPageParams(pageRequest)
    }).pipe(catchError(this.productService.errorHandler));
  }

  getOrderByAdmin(pageRequest: PageRequest) : Observable<PageableResponse<OrderResponseDto[]>> {
    return this.http.get<PageableResponse<OrderResponseDto[]>>(ApiEndpoints.MANAGE_ORDERS.GET_BY_ADMIN, {
      params: CoreUtil.buildPageParams(pageRequest)
    }).pipe(catchError(this.productService.errorHandler));
  }
}
