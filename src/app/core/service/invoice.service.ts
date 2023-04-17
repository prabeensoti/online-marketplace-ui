import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "@env/environment";

const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  constructor(private httpClient: HttpClient) { }

  getInvoice(orderId : any) : Observable<any> {
    return this.httpClient.get<any>(`${API_URL}/invoice/${orderId}`);
  }

}
