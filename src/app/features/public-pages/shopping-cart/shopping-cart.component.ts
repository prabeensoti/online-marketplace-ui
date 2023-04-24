import {Component, OnInit} from '@angular/core';
import {ShoppingCartService} from "@app/core/service/shopping-cart.service";
import {ShoppingCartDTO} from "@app/core/model/shopping-cart.model";
import {ToastService} from "@app/core/service/toast.service";
import {CredentialsService} from "@app/auth/services/credentials.service";
import {Constants} from "@app/core/core.constant";
import {CartService} from "@app/core/service/cart.service";

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {

  loading: boolean = false;
  cartItems : ShoppingCartDTO[] = [];
  total = 0; // replace with actual total calculation logic
  constructor(private shoppingCartService: ShoppingCartService,
              private toastService: ToastService,
              private credentialsService: CredentialsService,
              private cartService: CartService) { }

  ngOnInit(): void {
    if(this.credentialsService.isAuthenticated())
      this.initCartList();
    else
      this.initLocalItem();
  }
  private initLocalItem(): void {
    // load local storage item to cart
    this.cartItems = JSON.parse(Constants.STORAGE_LOCATION.getItem(Constants.CART_ITEMS_KEY) || '[]');
    this.setCartItems(this.cartItems.length);
    this.total=this.cartItems.length > 0 ? this.cartItems.map(x=> x.quantity*x.product.price).reduce((x,y)=>x+y) : 0;
  }

  private setCartItems(totalItems: number): void {
    this.cartService.cartTotal.next(totalItems);
  }

  private initCartList(): void {
    this.shoppingCartService.getAllCartItems().subscribe({
      next:(res) => {
        this.cartItems = res
        this.setCartItems(res.length)
        this.total=this.cartItems.length > 0 ? res.map(x=> x.quantity*x.product.price).reduce((x,y)=>x+y) : 0;
        this.loading = false
        //this.toastService.show("Cart Loaded", { classname: 'bg-success text-light fs-5', delay: 2000 });
      },
      error:(err)=> {
        console.log("error on init cart ",err)
        this.toastService.show(err.error.status+" "+err.error.message, { classname: 'bg-danger text-light fs-5', delay: 2000 });
      }
    })
  }

  onQtyChangeClick(product: ShoppingCartDTO, type:boolean){
    this.loading = true
    if(this.credentialsService.isAuthenticated()){
      let quantity:number = type ? product.quantity+1 : (product.quantity>1 ? product.quantity -1 : product.quantity)
      this.shoppingCartService.manageQtyFromCart(product.product.productId, quantity ).subscribe({
        next:(res) => {
          this.initCartList();
          this.loading = false;
        },
        error:(err) => {
          console.log("Error on remove cart",err)
          this.loading = false;
          this.toastService.show(err.error.status+" "+err.error.message, { classname: 'bg-danger text-light fs-5', delay: 2000 });
        },
        complete:() => {
          this.loading = false
        }
      })
    } else {
      // not logged in
      this.shoppingCartService.addItemToCartLocal(product, type)
      this.loading = false;
      this.initLocalItem();
    }
  }

  onItemRemove(product: ShoppingCartDTO) {
    if(this.credentialsService.isAuthenticated()){
      this.shoppingCartService.removeItemFromCart(product.product.productId).subscribe({
        next:(res) => {
          this.initCartList();
          this.loading = false;
          if(res)
            this.toastService.show("Successfully Removed!", { classname: 'bg-success text-light fs-5', delay: 2000 });
        },
        error:(err)=>{
          console.log("Error on remove cart",err)
          this.loading = false;
          this.toastService.show(err.error.status+" "+err.error.message, { classname: 'bg-danger text-light fs-5', delay: 2000 });
        },
        complete:() => {
          this.loading = false
        }
      })

    } else {
      this.shoppingCartService.removeItemFromCartLocal(product);
      this.initLocalItem();
    }
  }

}
