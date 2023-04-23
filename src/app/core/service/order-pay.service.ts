import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { PathConstant } from '../constant/path-constant';
import { BackendServerResponse } from '../model/backend-server-response';
import { OrderPayModel } from '../model/order-pay-model';
import { ShoppingCartDTO } from '../model/shopping-cart.model';
import { OrderPayInfoDto } from '../dto/order-pay-info-dto';
import { OrderPayResponseDto } from '../dto/order-pay-response-dto';

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
  
findOrderPayInfo(cartItems: ShoppingCartDTO[]){
  return this.httpClient.post<OrderPayInfoDto>(
    PathConstant.API_ENDPOINT +
    PathConstant.ORDER +
    PathConstant.PAY +
    PathConstant.INFO , cartItems
  )
  .pipe(catchError(this.errorHandler))
}

testData(){
  let orderPaymentModel= {
    userId:1,    
    address: '1502',
    city: 'Seattle',
    state: 'WA',
    zipcode: '98118',
    country: 'USA',
    cardNumber: 123456789,
    nameOnCard: 'Suprea Ghising',
    securityCode: 123,
    expiryMonth: 5,
    expiryYear: 2025,
    cardBrand: 'Visa',
    quantity: 15,
    price: 55, 
    fullName: 'Anna Purna'
  };

  return orderPaymentModel;
}

  createOrderPay(orderPaymentModel : OrderPayModel): Observable<OrderPayResponseDto> {
    console.log("service::: createOrderPay");
    
    return this.httpClient
    .post<OrderPayResponseDto>(
      PathConstant.API_ENDPOINT +
      PathConstant.ORDER +
      PathConstant.PAY, orderPaymentModel)
    .pipe(catchError(this.errorHandler));
}



}

