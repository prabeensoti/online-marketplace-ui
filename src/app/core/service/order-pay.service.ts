import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { PathConstant } from '../constant/path-constant';
import { BackendServerResponse } from '../model/backend-server-response';
import { OrderPayModel } from '../model/order-pay-model';

@Injectable({
  providedIn: 'root'
})
export class OrderPayService {


  constructor(
    private httpClient: HttpClient
  ) { }
  

  errorHandler(errorResp: any) {
    let errorMessage = '';

    if (errorResp.error) errorMessage = errorResp.error.message;
    else errorMessage = errorResp.message;

    return throwError(errorMessage);
  }

  createOrderPay(orderPaymentModel : OrderPayModel): Observable<BackendServerResponse> {
    console.log("service::: createOrderPay");
    
    return this.httpClient
    .post<BackendServerResponse>(
      PathConstant.API_ENDPOINT +
      PathConstant.ORDER_PAY, orderPaymentModel)
    .pipe(catchError(this.errorHandler));
}



}

