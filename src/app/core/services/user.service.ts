import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { PathConstant } from '../constants/path-constant';
import { OrderPayModel } from '../model/order-pay-model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private httpClient: HttpClient
  ) { }

errorHandler(errorResp: any) {
  let errorMessage = '';

  if (errorResp.error) errorMessage = errorResp.error.message;
  else errorMessage = errorResp.message;

  return throwError(errorMessage);
}  
  
findById(id: number){
  return this.httpClient.get<OrderPayModel>(
    PathConstant.API_ENDPOINT +
    PathConstant.USER + "/" +id
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

}
