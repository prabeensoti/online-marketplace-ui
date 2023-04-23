import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {AbstractDataConfigurer} from '@app/shared/table/abstract-data-configurer';
import {OrderDTO} from '@app/core/model/domain.model';
import {VendorOrderGridService} from "@app/features/dashboard/configurer/order/vendor-order-grid.service";
import {OrderResponseDto} from "@app/core/model/order-response.model";

@Component({
  selector: 'app-manage-orders',
  templateUrl: './manage-orders.component.html',
  styleUrls: ['./manage-orders.component.scss']
})
export class ManageOrdersComponent {

  vendorOrderDataGridConfigure!: AbstractDataConfigurer<OrderResponseDto>;

  constructor(private vendorOrderGridService: VendorOrderGridService) {
    this.vendorOrderDataGridConfigure = vendorOrderGridService;
  }

  selectedOrder(data: OrderDTO): void {
    console.log('Order data ', data);
    // TODO either show modal popup or navigate to show order manage form
  }

}
