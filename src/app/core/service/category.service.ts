import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CategoryContext } from '@app/auth/auth.model';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';

const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private httpClient : HttpClient) { }

  saveCategory(category: CategoryContext): Observable<CategoryContext>{
    return this.httpClient.post<CategoryContext>(`${API_URL}/category`, category);
  }
}
