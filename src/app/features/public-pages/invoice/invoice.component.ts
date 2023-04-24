import {Component, OnInit} from '@angular/core';
import {InvoiceService} from "@app/core/service/invoice.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss']
})
export class InvoiceComponent implements OnInit {

  orderId: any;

  invoiceDetails: any;
  shippingAddress: any;
  paymentMethod: any;
  orderItems: any
  totalAmount: any

  constructor(private invoiceService : InvoiceService,
              private activatedRoute: ActivatedRoute) {
  }



  ngOnInit(): void {
    this.generateInvoice();
  }

  generateInvoice() {
    this.orderId = this.activatedRoute.snapshot.paramMap.get('orderId');

    this.invoiceService.getInvoice(this.orderId).subscribe(response => {
      this.invoiceDetails = response;
      this.shippingAddress = response.shippingAddress;
      console.log("Shipping Address", this.shippingAddress)
      this.paymentMethod = response.paymentMethod;
      this.orderItems = response.orderItemList
      this.totalAmount = response.total;
      console.log("Response ", response);
    }, error => {
      console.log(error);
    })
  }



}
