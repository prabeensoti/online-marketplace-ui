import {Component, OnInit} from '@angular/core';
import {InvoiceService} from "@app/core/service/invoice.service";

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss']
})
export class InvoiceComponent implements OnInit {

  orderId: String = "2305834";

  invoiceDetails: any;
  shippingAddress: any;
  orderItems: any
  totalAmount: any

  constructor(private invoiceService : InvoiceService) {
  }

  ngOnInit(): void {
    this.generateInvoice();
  }

  generateInvoice() {
    this.invoiceService.getInvoice(1).subscribe(response => {
      this.invoiceDetails = response;
      this.shippingAddress = response.shippingAddress;
      this.orderItems = response.orderItemList
      this.totalAmount = response.total;
      console.log("Response ", response);
    }, error => {
      console.log(error);
    })
  }



}
