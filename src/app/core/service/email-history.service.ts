import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {EmailHistoryPage} from "@app/core/model/email-history-page.model";
import {environment} from "@env/environment";
import {Order} from "@app/core/model/order.model";
const API_URL = environment.apiUrl;
@Injectable({
  providedIn: 'root'
})
export class EmailHistoryService {

  constructor(private httpClient: HttpClient) { }

  getEmailHistoryPage(page:number,perPage:number,sortBy?:string,order?: Order) : Observable<EmailHistoryPage> {
    let path = `${API_URL}/email-history`;
    let httpParams = new HttpParams().append('page',page).append('perPage',perPage);
    if(sortBy != undefined){
      httpParams = httpParams.append('sortBy',sortBy);
    }
    if(order != undefined){
      httpParams = httpParams.append('order',order);
    }
    return this.httpClient.get<EmailHistoryPage>(path, {params: httpParams});
  }
}
