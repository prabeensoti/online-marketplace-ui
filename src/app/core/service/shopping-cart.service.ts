import {Injectable} from '@angular/core';
import {ApiEndpoints} from "@app/core/app-url.constant";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {ShoppingCartDTO} from "@app/core/model/shopping-cart.model";
import {CredentialsService} from "@app/auth/services/credentials.service";
import {ProductDTO} from "@app/core/model/domain.model";
import {Constants} from "@app/core/core.constant";
import {CartService} from "@app/core/service/cart.service";


@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  constructor(private http: HttpClient,
              private credentialService:CredentialsService,
              private cartService:CartService) { }
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
  public removeItemFromCart(productId:number):Observable<boolean> {
    return this.http.delete<boolean>(ApiEndpoints.SHOPPING_CART.DELETE+`?productId=${productId}`,this.httpOptions);
  }

  //below are the function for not loggedIn case
  public addItemToCartLocal(product:ShoppingCartDTO | ProductDTO, type:boolean){
    let cartItems:any = JSON.parse(Constants.STORAGE_LOCATION.getItem(Constants.CART_ITEMS_KEY) || '[]');
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
      existingItem.quantity = type ? existingItem.quantity+1 : (existingItem.quantity > 1 ? existingItem.quantity-1 : existingItem.quantity)
    } else {
      console.log("10")
      cartItems.push({product,quantity: 1});
    }
    this.cartService.cartTotal.next(cartItems.length)
    Constants.STORAGE_LOCATION.setItem(Constants.CART_ITEMS_KEY, JSON.stringify(cartItems))
  }

  public removeItemFromCartLocal(product:ShoppingCartDTO | ProductDTO){
    let cartItems:any = JSON.parse(Constants.STORAGE_LOCATION.getItem(Constants.CART_ITEMS_KEY) || '[]');
    let existingItemIdx;
    if ("productId" in product) {
      existingItemIdx = cartItems.findIndex((item: { product: { productId: number; }; }) => item.product.productId === product.productId);
    } else {
      existingItemIdx = cartItems.findIndex((item: { product: { productId: number; }; }) => item.product.productId === product.product.productId);
    }
    if(existingItemIdx > -1){
      cartItems.splice(existingItemIdx, 1)
      this.cartService.cartTotal.next(cartItems.length)
      Constants.STORAGE_LOCATION.setItem(Constants.CART_ITEMS_KEY, JSON.stringify(cartItems));
    }
  }
}
