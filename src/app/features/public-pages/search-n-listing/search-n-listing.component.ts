import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, convertToParamMap, ParamMap, Params} from '@angular/router';
import {ProductDTO, SearchFilterContext} from '@app/core/model/domain.model';
import {ProductService} from '@app/core/service/product.service';
import {debounceTime, filter, fromEvent} from 'rxjs';
import {CredentialsService} from "@app/auth/services/credentials.service";
import {ShoppingCartService} from "@app/core/service/shopping-cart.service";
import {ToastService} from "@app/core/service/toast.service";
import {Constants} from "@app/core/core.constant";
import { PageRequest } from '@app/core/core.model';
import {CartService} from "@app/core/service/cart.service";
import { CategoryService } from '@app/core/service/category.service';

@Component({
  selector: 'app-search-n-listing',
  templateUrl: './search-n-listing.component.html',
  styleUrls: ['./search-n-listing.component.scss']
})

export class SearchNListingComponent implements OnInit {

  readonly CART_ITEMS_KEY = 'CART_ITEMS_KEY';
  products: ProductDTO[] = [];
  totalElements: number = 0;
  currentPage: number = 0;

  name: string = "";
  categoryName: string = "";
  minPrice: number = 0;
  maxPrice: number = 0;
  sortedPrice: string = "default";


  loading: boolean = false;

  constructor(private credentialsService: CredentialsService,
              private route: ActivatedRoute,
              private productService: ProductService,
              private shoppingCartService: ShoppingCartService,
              private categoryService: CategoryService,
              private toastService: ToastService) {
  }

  ngOnInit(): void {
    // this.initProductList();
    this.onCategorySelection();
    this.onSearchInputChange();
    this.processRouteQueryParams();
  }

  onCategorySelection(): void {
    this.categoryService.onCategoryChange.subscribe({
      next: (cat) => {
        this.categoryName = cat;
        this.onFilterChange();
      }
    });
  }

  onSearchInputChange(): void {
    this.categoryService.onSearchInputChange.subscribe({
      next: (searchInput) => {
        this.name = searchInput;
        this.onFilterChange();
      }
    });
  }

  private initProductList(): void {
    const pageRequest: PageRequest = {page: this.currentPage, size: 10, sort: "name", direction: "asc"};
    this.productService.getAllPublishedProducts(pageRequest).subscribe({
      next: (res) => {
        this.products = res.content;
        this.totalElements = res.totalElements;
      },
      error: (error) => {
        console.log("error ", error);
      },
    });
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.onFilterChange();
  }

  /**
   * Call this method every time the filter changes
   */
  private onFilterChange(): void {
    const searchFilterContext: SearchFilterContext = {
      name: this.name,
      categoryName: this.categoryName,
      minPrice: this.minPrice,
      maxPrice: this.maxPrice,
      sortedPrice: this.sortedPrice,
    }
    const pageRequest: PageRequest = { page: this.currentPage-1, size: 10, sort: "price", direction: this.sortedPrice};

    this.productService.searchProductByAdvanceFilter(pageRequest, searchFilterContext).subscribe({
      next: (res: any) => {
        this.products = res.content;
        this.totalElements = res.totalElements;
      },
      error: (error: any) => {
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
          this.name = paramMap.get("name") || "";
          this.categoryName = paramMap.get("categoryName") || "";
          this.minPrice = Number(paramMap.get("minPrice")) || 0;
          this.maxPrice = Number(paramMap.get("maxPrice")) || 0;
        }
        this.onFilterChange();
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

  onSelectChange() {
    console.log('Selected option: ' + this.sortedPrice);
    this.onFilterChange();
  }

  onMinPriceInput(value: string) {
    fromEvent(document, 'input')
      .pipe(debounceTime(500))
      .subscribe(() => {
        this.minPrice = Number(value); 
        console.log('Input value: ' + value);
        this.onFilterChange();
      });
  }

  onMaxPriceInput(value: string) {
    fromEvent(document, 'input')
      .pipe(debounceTime(500))
      .subscribe(() => {
        this.maxPrice = Number(value); 
        console.log('Input value: ' + value);
        this.onFilterChange();
      });
  }
}
