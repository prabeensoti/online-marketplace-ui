import {Component, OnInit, ViewChild} from '@angular/core';
import {VendorProductSales} from "@app/core/model/vendor-product-sales.model";
import {DatePickerComponent} from "@app/shared/datepicker/date-picker.component";
import {VendorSalesReportService} from "@app/core/service/vendor-sales-report.service";
import {ToastService} from "@app/core/service/toast.service";

@Component({
  selector: 'app-sales-report',
  templateUrl: './product-sales-report.component.html',
  styleUrls: ['./product-sales-report.component.scss']
})
export class ProductSalesReportComponent implements OnInit{
  @ViewChild(DatePickerComponent) datePicker!: DatePickerComponent;
  productSalesReport!: VendorProductSales[];

  constructor(private salesReportService: VendorSalesReportService,private toastService: ToastService) {
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
        this.toastService.show(err.error.status+" "+err.error.message, { classname: 'bg-danger text-light fs-5', delay: 2000 });
      }
    });
  }
  downloadReport() {
    let dateRange = this.datePicker.getDateRange();
    this.salesReportService.productSalesReportDownload(dateRange.fromDate,dateRange.toDate);
  }
}
