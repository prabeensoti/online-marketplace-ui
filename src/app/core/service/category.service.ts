import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CategoryContext } from '@app/auth/auth.model';
import { environment } from '@env/environment';
import { Observable, Subject } from 'rxjs';
import {PageableResponse} from "@app/core/core.model";
import {ProductCategoryDTO, ProductDTO} from "@app/core/model/domain.model";
import {ApiEndpoints} from "@app/core/app-url.constant";

const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  onCategoryChange: Subject<string> = new Subject();
  onSearchInputChange: Subject<string> = new Subject();

  constructor(private httpClient : HttpClient) { }

  // TODO findAll category, Observable<ProductCategory[]>
  // backend List<ProductCategory>

  public getAllCategories(): Observable<ProductCategoryDTO[]> {
    const categoriesObservable: Observable<ProductCategoryDTO[]> = this.httpClient
      .get<ProductCategoryDTO[]>(ApiEndpoints.CATEGORIES.ALL);
    return categoriesObservable;
  }

  public getTopCategories(): Observable<ProductCategoryDTO[]> {
    const categoriesObservable: Observable<ProductCategoryDTO[]> = this.httpClient
      .get<ProductCategoryDTO[]>(ApiEndpoints.CATEGORIES.ALL);
    return categoriesObservable;
  }


  saveCategory(category: CategoryContext): Observable<CategoryContext>{
    return this.httpClient.post<CategoryContext>(`${API_URL}/category`, category);
  }
}
