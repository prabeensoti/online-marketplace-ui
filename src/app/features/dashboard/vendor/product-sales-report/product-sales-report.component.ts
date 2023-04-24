import {Component, OnInit, ViewChild} from '@angular/core';
import {VendorProductSales} from "@app/core/model/vendor-product-sales.model";
import {DatePickerComponent} from "@app/shared/datepicker/date-picker.component";
import {VendorSalesReportService} from "@app/core/service/vendor-sales-report.service";

@Component({
  selector: 'app-sales-report',
  templateUrl: './product-sales-report.component.html',
  styleUrls: ['./product-sales-report.component.scss']
})
export class ProductSalesReportComponent implements OnInit{
  @ViewChild(DatePickerComponent) datePicker!: DatePickerComponent;
  productSalesReport!: VendorProductSales[];

  constructor(private salesReportService: VendorSalesReportService) {
  }

  ngOnInit(): void {
    this.getReport();
  }

  getReport() {
    console.log(this.datePicker.getDateRange());
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
