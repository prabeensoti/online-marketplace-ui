import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AbstractDataConfigurer } from '@app/shared/table/abstract-data-configurer';
import { OrderGridService } from '../../configurer/order-grid.service';
import { OrderDTO } from '@app/core/model/domain.model';

@Component({
  selector: 'app-manage-orders',
  templateUrl: './manage-orders.component.html',
  styleUrls: ['./manage-orders.component.scss']
})
export class ManageOrdersComponent {

  orderDataGridConfigurer!: AbstractDataConfigurer<OrderDTO>;

  constructor(private orderGridService: OrderGridService, private router: Router) {
    this.orderDataGridConfigurer = orderGridService;
  }

  selectedOrder(data: OrderDTO): void {
    console.log('Order data ', data);
    // TODO either show modal popup or navigate to show order manage form
  }

}
