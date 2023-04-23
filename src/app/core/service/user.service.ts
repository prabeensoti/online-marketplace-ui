
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { PathConstant } from '../constant/path-constant';
import { UserCardInfoModel } from '../model/user-card-info-model';
import { ShoppingCartDTO } from '../model/shopping-cart.model';

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
  
}
