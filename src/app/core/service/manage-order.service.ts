import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ApiEndpoints} from "@app/core/app-url.constant";

@Injectable({
  providedIn: 'root'
})
export class ManageOrderService {

  readonly API_ENDPOINT = ApiEndpoints.API_URL;

  constructor(private http: HttpClient) { }

  getOrderByUser() : Observable<any> {
    return this.http.get<any>(ApiEndpoints.MANAGE_ORDERS.GET_BY_USER);
  }
}
