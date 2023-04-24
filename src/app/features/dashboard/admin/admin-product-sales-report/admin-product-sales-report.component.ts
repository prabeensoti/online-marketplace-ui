import {Component, OnInit, ViewChild} from '@angular/core';
import {AdminProductSales} from "@app/core/model/admin-product-sales.model";
import {AdminSalesReportService} from "@app/core/service/admin-sales-report.service";
import {DatePickerComponent} from "@app/shared/datepicker/date-picker.component";

@Component({
  selector: 'app-admin-product-sales-report',
  templateUrl: './admin-product-sales-report.component.html',
  styleUrls: ['./admin-product-sales-report.component.scss']
})
export class AdminProductSalesReportComponent implements OnInit{
  @ViewChild(DatePickerComponent) datePicker!: DatePickerComponent;
  productSalesReport!: AdminProductSales[];

  constructor(private salesReportService: AdminSalesReportService) {
  }

  ngOnInit(): void {
    this.getReport();
  }
  getReport() {
    let dateRange = this.datePicker.getDateRange();
    this.salesReportService.productSalesReport(dateRange.fromDate,dateRange.toDate).subscribe({
      next: res => {
        this.productSalesReport = res;
      },
      error: err => {

      }
    });
  }

  downloadReport() {
    let dateRange = this.datePicker.getDateRange();
    this.salesReportService.productSalesReportDownload(dateRange.fromDate,dateRange.toDate);
  }
}
