import { Component, OnInit } from '@angular/core';
import {ShoppingCartService} from "@app/core/service/shopping-cart.service";
import {ProductDTO} from "@app/core/model/domain.model";
import {ShoppingCartDTO} from "@app/core/model/shopping-cart.model";
import {ToastService} from "@app/core/service/toast.service";

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {

  // cartItems = [
  //   {
  //     title: "New Super Value Item",
  //     link: "#",
  //     description: "This is short description of New Super duper valuable item",
  //     price: "$1000.00",
  //     bestSeller: "Best Seller",
  //     stock: "Y",
  //     quantity: "3",
  //     share: "Share"
  //   },
  //   // add more items if needed
  // ];

  loading: boolean = false;
  cartItems : ShoppingCartDTO[] = [];
  total = "$1000.00"; // replace with actual total calculation logic

  constructor(private shoppingCartService: ShoppingCartService, private toastService: ToastService) { }

  ngOnInit(): void {
    this.initCartList();
  }

  private initCartList(): void {
    this.shoppingCartService.getAllCartItems().subscribe({
      next:(res) => {
        this.cartItems = res
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
    this.shoppingCartService.manageQtyFromCart(product.product.productId, type ? product.quantity+1 : product.quantity-1).subscribe({
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
  }

  onItemRemove(product: ShoppingCartDTO) {
    alert("click");
  }

}
