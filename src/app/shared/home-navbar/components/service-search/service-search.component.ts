import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { APP_UI_ROUTES } from '@app/core/route.util';

@Component({
  selector: 'app-service-search',
  templateUrl: './service-search.component.html',
  styleUrls: ['./service-search.component.scss']
})
export class ServiceSearchComponent implements OnInit {

  searchText!: string;

  constructor(public router: Router) { }

  ngOnInit(): void {
  }

  onSearchSubmit() {
    const productBrowseQueryParams = {
      search: this.searchText,
      someFields: 'test'
    };
    this.router.navigate([APP_UI_ROUTES.SEARCH], { queryParams: productBrowseQueryParams, queryParamsHandling: 'merge' });
  }

}
