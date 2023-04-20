import {Injectable} from '@angular/core';
import {ApiEndpoints} from "@app/core/app-url.constant";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {ShoppingCartDTO} from "@app/core/model/shopping-cart.model";
import {CredentialsService} from "@app/auth/services/credentials.service";
import {ProductDTO} from "@app/core/model/domain.model";
import {Constants} from "@app/core/core.constant";


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

  //below are the function for not loggedIn case
  public addItemToCartLocal(product:ShoppingCartDTO | ProductDTO, qty:number){
    let cartItems:any = JSON.parse(localStorage.getItem(Constants.CART_ITEMS_KEY) || '[]');
    let existingItem;
    if ("productId" in product) {
      console.log("110")
      existingItem = cartItems.find((item: {
        product: { productId: number; };
      }) => item.product.productId === product?.productId);
    } else {
      console.log("011")
      existingItem = cartItems.find((item: {
        product: { productId: number; };
      }) => item.product.productId === product?.product?.productId);
    }
    if(existingItem){
      console.log("11")
      existingItem.quantity += qty
    } else {
      console.log("10")
      cartItems.push({product,quantity: qty});
    }
    localStorage.setItem(Constants.CART_ITEMS_KEY, JSON.stringify(cartItems))
  }

  public removeItemFromCartLocal(product:ShoppingCartDTO | ProductDTO){
    let cartItems:any = JSON.parse(localStorage.getItem(Constants.CART_ITEMS_KEY) || '[]');
    let existingItemIdx;
    if ("productId" in product) {
      existingItemIdx = cartItems.findIndex((item: { product: { productId: number; }; }) => item.product.productId === product.productId);
    } else {
      existingItemIdx = cartItems.findIndex((item: { product: { productId: number; }; }) => item.product.productId === product.product.productId);
    }
    if(existingItemIdx > -1){
      cartItems.splice(existingItemIdx, 1)
      localStorage.setItem(Constants.CART_ITEMS_KEY, JSON.stringify(cartItems));
    }
  }
}
