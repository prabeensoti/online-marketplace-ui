import {Component, OnInit, ViewChild} from '@angular/core';
import {DatePickerComponent} from "@app/shared/datepicker/date-picker.component";
import {AdminProductSales} from "@app/core/model/admin-product-sales.model";
import {AdminSalesReportService} from "@app/core/service/admin-sales-report.service";
import {AdminVendorSales} from "@app/core/model/admin-vendor-sales.model";
import {ToastService} from "@app/core/service/toast.service";

@Component({
  selector: 'app-admin-vendor-sales-report',
  templateUrl: './admin-vendor-sales-report.component.html',
  styleUrls: ['./admin-vendor-sales-report.component.scss']
})
export class AdminVendorSalesReportComponent implements OnInit{
  @ViewChild(DatePickerComponent) datePicker!: DatePickerComponent;
  vendorSalesReport!: AdminVendorSales[];

  constructor(private salesReportService: AdminSalesReportService, private toastService: ToastService) {
  }

  ngOnInit(): void {
    this.getReport();
  }
  getReport() {
    let dateRange = this.datePicker.getDateRange();
    this.salesReportService.vendorSalesReport(dateRange.fromDate,dateRange.toDate).subscribe({
      next: res => {
        console.log(res);
        this.vendorSalesReport = res;
      },
      error: err => {
        this.toastService.show(err.error.status+" "+err.error.message, { classname: 'bg-danger text-light fs-5', delay: 2000 });
      }
    });
  }

  downloadReport() {
    let dateRange = this.datePicker.getDateRange();
    this.salesReportService.vendorSalesReportDownload(dateRange.fromDate,dateRange.toDate);
  }
}
