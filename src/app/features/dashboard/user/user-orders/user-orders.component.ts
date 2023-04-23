import {Component, OnInit} from '@angular/core';
import {ToastService} from "@app/core/service/toast.service";
import {Credentials, CredentialsService} from "@app/auth/services/credentials.service";
import {ManageOrderService} from "@app/core/service/manage-order.service";
import {OrderResponseDto} from "@app/core/model/order-response.model";

@Component({
  selector: 'app-user-orders',
  templateUrl: './user-orders.component.html',
  styleUrls: ['./user-orders.component.scss']
})
export class UserOrdersComponent implements OnInit {

  info: any
  orderResponse : OrderResponseDto[] = [];
  // orderResponse : any;

  constructor(private toastService: ToastService,
              private credentialService: CredentialsService,
              private manageOrderService: ManageOrderService) {
  }

  ngOnInit(): void {
    this.getUserInfo()
    this.getOrderList()
  }

  getOrderList() {
    this.manageOrderService.getOrderByUser().pipe()
      .subscribe( res => {
        console.log(res)
        this.orderResponse = res.content;
        console.log('Order Response', this.orderResponse)
        console.log('', this.orderResponse[0].orderDto)
      }, err => {
        console.log(err)
      })
  }

  getUserInfo() {
    const userInfo : Credentials | null = this.credentialService.getCredentials();
    this.info = userInfo
    console.log(this.info)
  }

}
