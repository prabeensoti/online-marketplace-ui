import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { APP_UI_ROUTES } from '@app/core/route.util';
import { ProductCategoryDTO } from '@app/core/model/domain.model';
import { CategoryService } from '@app/core/service/category.service';

@Component({
  selector: 'app-service-search',
  templateUrl: './service-search.component.html',
  styleUrls: ['./service-search.component.scss']
})
export class ServiceSearchComponent implements OnInit {
  categories: ProductCategoryDTO[] = [];
  searchText!: string;
  searchCategory: string = '';
  minPrice!: number;
  maxPrice!: number;
  sortedOrder!: string;


  constructor(public router: Router, private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.getCategories();
  }

  onCategoryChange(): void {
    this.categoryService.onCategoryChange.next(this.searchCategory);
    this.onSearchSubmit();
  }

  getCategories() {
    this.categoryService.getAllCategories().subscribe(res => {
      this.categories = res;
      // console.log(this.categories);
    });
  }

  onSearchSubmit() {
    const productBrowseQueryParams = {
      name: this.searchText,
      ...(this.searchCategory != '' && { categoryName: this.searchCategory }),
      minPrice: this.minPrice,
      maxPrice: this.maxPrice,
      sortedOrder: this.sortedOrder
    };

    console.log(productBrowseQueryParams);
    this.categoryService.onSearchInputChange.next(this.searchText);
    this.router.navigate([APP_UI_ROUTES.SEARCH], { queryParams: productBrowseQueryParams, queryParamsHandling: 'merge' });
  }

}
