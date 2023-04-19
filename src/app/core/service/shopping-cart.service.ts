import {Injectable} from '@angular/core';
import {ApiEndpoints} from "@app/core/app-url.constant";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {ShoppingCartDTO} from "@app/core/model/shopping-cart.model";
import {CredentialsService} from "@app/auth/services/credentials.service";


@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  constructor(private http: HttpClient, private credentialService:CredentialsService) { }
  private  httpOptions = {
    headers: new HttpHeaders({
      'Accept': 'application/json',
      'Authorization': 'Bearer '+ this.credentialService.getCredentials()?.token
    }),
  };
  public getAllCartItems(): Observable<ShoppingCartDTO[]>{
    return this.http.get<ShoppingCartDTO[]>(ApiEndpoints.SHOPPING_CART.GET, this.httpOptions);
  }

  // add item from cart page
  public manageQtyFromCart(productId:number, qty:number):Observable<boolean> {
    return this.http.post<boolean>(ApiEndpoints.SHOPPING_CART.POST+`?productId=${productId}&quantity=${qty}`,{}, this.httpOptions);
  }

  // add item from product/details page
  public addItemToCart(productId: number, qty:number):Observable<boolean> {
    return this.http.put<boolean>(ApiEndpoints.SHOPPING_CART.PUT+`?productId=${productId}&quantity=${qty}`, {}, this.httpOptions);
  }

  // delete item from cart
  public removeItemToCart(productId:number):Observable<boolean> {
    return this.http.delete<boolean>(ApiEndpoints.SHOPPING_CART.DELETE+`?productId=${productId}`,this.httpOptions);
  }




}
