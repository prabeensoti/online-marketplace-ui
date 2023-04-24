import { Component, OnInit } from '@angular/core';
import { ProductCategoryDTO, ProductDTO } from '@app/core/model/domain.model';
import { CategoryService } from '@app/core/service/category.service';
import {ShoppingCartService} from "@app/core/service/shopping-cart.service";
import {ShoppingCartDTO} from "@app/core/model/shopping-cart.model";
import {CartService} from "@app/core/service/cart.service";
import {CredentialsService} from "@app/auth/services/credentials.service";
import {Constants} from "@app/core/core.constant";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  allItemsFetched: boolean = false;

  cartItems : ShoppingCartDTO[] = [];
  constructor(private cartService:CartService,
              private categoryService: CategoryService,
              private credentialsService:CredentialsService,
              private shoppingCartService:ShoppingCartService) { }


  topCategories: ProductCategoryDTO[] = [
    {
      categoryId: 1,
      category: 'Books',
      fileUri: 'https://picsum.photos/3264/1836?random=3',
    },
    {
      categoryId: 2,
      category: 'Music',
      fileUri: 'https://picsum.photos/3264/1836?random=1',
    },
    {
      categoryId: 3,
      category: 'Movies',
      fileUri: 'https://picsum.photos/3264/1836?random=2',
    }
  ];






  ngOnInit(): void {
    console.log("Home page");
    this.initTopCategories();
    if(this.credentialsService.isAuthenticated()){
      this.shoppingCartService.getAllCartItems().subscribe({
        next:(res) => {
          this.setCartItems(res.length);
        },error:(err)=> {

        }, complete:()=> {

        }
      })
    } else {
      this.cartItems = JSON.parse(Constants.STORAGE_LOCATION.getItem(Constants.CART_ITEMS_KEY) || '[]');
      this.setCartItems(this.cartItems.length);
    }
  }

  private setCartItems(totalItems: number): void {
    this.cartService.cartTotal.next(totalItems);
  }

  // onReload(): void {
  //   window.location.reload();
  // }

  private initTopCategories(): void {
    this.categoryService.getTopCategories().subscribe({
      next: (res) => {
        this.topCategories = res;

      }, error: (err) => {
        console.log("error ", err);
      }
    })
  }

}
