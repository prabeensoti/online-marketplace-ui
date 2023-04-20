import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, convertToParamMap, ParamMap, Params } from '@angular/router';
import { ProductDTO } from '@app/core/model/domain.model';
import { ProductService } from '@app/core/service/product.service';
import { filter, map } from 'rxjs';
import {CredentialsService} from "@app/auth/services/credentials.service";

@Component({
  selector: 'app-search-n-listing',
  templateUrl: './search-n-listing.component.html',
  styleUrls: ['./search-n-listing.component.scss']
})

export class SearchNListingComponent implements OnInit {

  readonly CART_ITEMS_KEY = 'CART_ITEMS_KEY';
  products: ProductDTO[] = [];

  searchText: string = "";

  constructor(private credentialsService: CredentialsService,
              private route: ActivatedRoute,
              private productService: ProductService) {

  }

  ngOnInit(): void {
    this.initProductList();
  }

  private initProductList(): void {
    this.productService.getAllProducts().subscribe({
      next: (res) => {
        this.products = res.content;
      },
      error: (error) => {
        console.log("error ", error);
      },
    });
  }

  private processRouteQueryParams(): void {

    this.route.queryParams
      .pipe(
        filter((params: Params) => params && Object.keys(params).length > 0),
      ).subscribe((params: Params) => {
        const routeQueryParams: Params = { ...params }
        if (params) {
          const paramMap: ParamMap = convertToParamMap(routeQueryParams);
          this.searchText = paramMap.get("search") || "";
        }
      });
  }

  onAddToCartClick(product:ProductDTO) {

    if(this.credentialsService.isAuthenticated()){
      //use loggedIn // first remove from localStorage
      localStorage.removeItem(this.CART_ITEMS_KEY);



    } else {
      //user not loggedIN
      let cartItems:any = JSON.parse(localStorage.getItem(this.CART_ITEMS_KEY) || '[]');
      let existingItem = cartItems.find((item: { productId: number; }) => item.productId === product.productId);
      if(existingItem){
        existingItem.quantity += 1
      } else {
        cartItems.push( {...product, ...{quantity: 1}});
      }
      localStorage.setItem(this.CART_ITEMS_KEY, JSON.stringify(cartItems))
    }
  }
}
