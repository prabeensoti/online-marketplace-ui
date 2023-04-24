import { Injectable } from '@angular/core';
import {HttpClient, HttpContext, HttpHeaders, HttpParams, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {ApiEndpoints} from "@app/core/app-url.constant";
import {VendorProductSales} from "@app/core/model/vendor-product-sales.model";

@Injectable({
  providedIn: 'root'
})
export class VendorSalesReportService {

  constructor(private httpClient: HttpClient) { }

  productSalesReport(fromDate: string, toDate:string) : Observable<VendorProductSales[]> {
    let httpParams = new HttpParams();
    httpParams = httpParams.append('fromDate',fromDate);
    httpParams = httpParams.append('toDate',toDate);
    return this.httpClient.get<VendorProductSales[]>(ApiEndpoints.REPORT.VENDOR_PRODUCT_SALES, {params: httpParams});
  }
  productSalesReportDownload(fromDate: string, toDate:string)  {
    let httpParams = new HttpParams();
    httpParams = httpParams.append('fromDate',fromDate);
    httpParams = httpParams.append('toDate',toDate);
    this.httpClient.get<Blob>(ApiEndpoints.REPORT.VENDOR_PRODUCT_SALES_PDF, {responseType: 'blob' as 'json',params: httpParams}).subscribe(blob=>{
      const a = document.createElement('a')
      const objectUrl = URL.createObjectURL(blob)
      a.href = objectUrl
      a.download = `ProductSalesReport_${fromDate}_${toDate}.pdf`;
      a.click();
      URL.revokeObjectURL(objectUrl);
    }, error => {
      console.log(error);
    });
  }
}
