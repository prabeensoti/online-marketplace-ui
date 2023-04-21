import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, convertToParamMap, ParamMap, Params} from '@angular/router';
import {ProductDTO} from '@app/core/model/domain.model';
import {ProductService} from '@app/core/service/product.service';
import {filter} from 'rxjs';
import {CredentialsService} from "@app/auth/services/credentials.service";
import {ShoppingCartService} from "@app/core/service/shopping-cart.service";
import {ToastService} from "@app/core/service/toast.service";
import {Constants} from "@app/core/core.constant";

@Component({
  selector: 'app-search-n-listing',
  templateUrl: './search-n-listing.component.html',
  styleUrls: ['./search-n-listing.component.scss']
})

export class SearchNListingComponent implements OnInit {

  readonly CART_ITEMS_KEY = 'CART_ITEMS_KEY';
  products: ProductDTO[] = [];

  searchText: string = "";
  loading: boolean = false;

  constructor(private credentialsService: CredentialsService,
              private route: ActivatedRoute,
              private productService: ProductService,
              private shoppingCartService: ShoppingCartService,
              private toastService: ToastService) {
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
    this.loading = true;
    if(this.credentialsService.isAuthenticated()){
      //use loggedIn // first remove from localStorage
      sessionStorage.removeItem(Constants.CART_ITEMS_KEY);
      this.shoppingCartService.addItemToCart(product.productId, 1).subscribe({
        next:(res) => {
          this.toastService.show("Product Added To Cart", { classname: 'bg-success text-light fs-5', delay: 2000 });
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
      //user not loggedIN
        this.shoppingCartService.addItemToCartLocal(product, true)
      this.loading = false
        this.toastService.show("Product Added To Cart", { classname: 'bg-success text-light fs-5', delay: 2000 });
    }
  }
}
