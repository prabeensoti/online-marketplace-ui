import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Order} from "@app/core/model/order.model";
import {Observable} from "rxjs";
import {EmailHistoryPage} from "@app/core/model/email-history-page.model";
import {ApiEndpoints} from "@app/core/app-url.constant";
import {VendorProductSales} from "@app/core/model/vendor-product-sales.model";
import {AdminVendorSales} from "@app/core/model/admin-vendor-sales.model";
import {AdminProductSales} from "@app/core/model/admin-product-sales.model";

@Injectable({
  providedIn: 'root'
})
export class AdminSalesReportService {


  constructor(private httpClient: HttpClient) { }

  productSalesReport(fromDate: string, toDate:string) : Observable<AdminProductSales[]> {
    let httpParams = new HttpParams();
    httpParams = httpParams.append('fromDate',fromDate);
    httpParams = httpParams.append('toDate',toDate);
    return this.httpClient.get<AdminProductSales[]>(ApiEndpoints.REPORT.ADMIN_PRODUCT_SALES, {params: httpParams});
  }
  productSalesReportDownload(fromDate: string, toDate:string)  {
    let httpParams = new HttpParams();
    httpParams = httpParams.append('fromDate',fromDate);
    httpParams = httpParams.append('toDate',toDate);
    this.httpClient.get<Blob>(ApiEndpoints.REPORT.ADMIN_PRODUCT_SALES_PDF, {responseType: 'blob' as 'json',params: httpParams}).subscribe(blob=>{
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
  vendorSalesReport(fromDate: string, toDate:string) : Observable<AdminVendorSales[]> {
    let httpParams = new HttpParams();
    httpParams = httpParams.append('fromDate',fromDate);
    httpParams = httpParams.append('toDate',toDate);
    return this.httpClient.get<AdminVendorSales[]>(ApiEndpoints.REPORT.ADMIN_VENDOR_SALES, {params: httpParams});
  }
  vendorSalesReportDownload(fromDate: string, toDate:string)  {
    let httpParams = new HttpParams();
    httpParams = httpParams.append('fromDate',fromDate);
    httpParams = httpParams.append('toDate',toDate);
    this.httpClient.get<Blob>(ApiEndpoints.REPORT.ADMIN_VENDOR_SALES_PDF, {responseType: 'blob' as 'json',params: httpParams}).subscribe(blob=>{
      const a = document.createElement('a')
      const objectUrl = URL.createObjectURL(blob)
      a.href = objectUrl
      a.download = `VendorSalesReport_${fromDate}_${toDate}.pdf`;
      a.click();
      URL.revokeObjectURL(objectUrl);
    }, error => {
      console.log(error);
    });
  }
}
