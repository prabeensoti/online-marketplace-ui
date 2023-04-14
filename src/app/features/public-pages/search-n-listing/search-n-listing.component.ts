import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, convertToParamMap, ParamMap, Params } from '@angular/router';
import { filter, map } from 'rxjs';

@Component({
  selector: 'app-search-n-listing',
  templateUrl: './search-n-listing.component.html',
  styleUrls: ['./search-n-listing.component.scss']
})
export class SearchNListingComponent implements OnInit {

  products = [
    {
      name: 'Product 1',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus.',
      image: 'https://via.placeholder.com/350x200'
    },
    {
      name: 'Product 2',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus.',
      image: 'https://via.placeholder.com/350x200'
    },
    {
      name: 'Product 3',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus.',
      image: 'https://via.placeholder.com/350x200'
    }
  ];

  searchText: string = "";

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
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
