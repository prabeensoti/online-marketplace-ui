import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, convertToParamMap, ParamMap, Params } from '@angular/router';
import { ProductDTO } from '@app/core/model/domain.model';
import { ProductService } from '@app/core/service/product.service';
import { filter, map } from 'rxjs';

@Component({
  selector: 'app-search-n-listing',
  templateUrl: './search-n-listing.component.html',
  styleUrls: ['./search-n-listing.component.scss']
})
export class SearchNListingComponent implements OnInit {

  products: ProductDTO[] = [];

  searchText: string = "";

  constructor(private route: ActivatedRoute, private productService: ProductService) { }

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

}
