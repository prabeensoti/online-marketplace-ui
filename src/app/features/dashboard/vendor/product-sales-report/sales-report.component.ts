import {Component, ViewChild} from '@angular/core';
import {VendorProductSalesReportModel} from "@app/core/model/vendor-product-sales-report.model";
import {DatePickerComponent} from "@app/shared/datepicker/date-picker.component";

@Component({
  selector: 'app-sales-report',
  templateUrl: './sales-report.component.html',
  styleUrls: ['./sales-report.component.scss']
})
export class SalesReportComponent {
  @ViewChild(DatePickerComponent) datePicker!: DatePickerComponent;
  productSalesReport: VendorProductSalesReportModel[] | undefined;
  pageSize:number=10;
  page: number=1;
  collectionSize: number = 0;
  getReport() {
    console.log(this.datePicker.getDateRange());
  }

  refreshData() {

  }
}
