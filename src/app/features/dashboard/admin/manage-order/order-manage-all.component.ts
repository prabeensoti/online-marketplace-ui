import {Component} from '@angular/core';
import {AbstractDataConfigurer} from "@app/shared/table/abstract-data-configurer";
import {OrderResponseDto} from "@app/core/model/order-response.model";
import {AdminOrderGridService} from "@app/features/dashboard/configurer/order/admin-order-grid.service";
import {OrderDTO} from "@app/core/model/domain.model";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-order-manage-all',
  templateUrl: './order-manage-all.component.html',
  styleUrls: ['./order-manage-all.component.scss']
})
export class OrderManageAllComponent {

  adminOrderDataGridConfigure !: AbstractDataConfigurer<OrderResponseDto>;

  constructor(private adminOrderGridService: AdminOrderGridService, private modalService: NgbModal,) {
    this.adminOrderDataGridConfigure = adminOrderGridService;
  }

  selectedOrder(data: OrderDTO): void {
    console.log('Order data ', data);
    // TODO either show modal popup or navigate to show order manage form
  }

  onOrderDeliver(): void {
    console.log("On Order deliver");
    alert("Yes saved")
    // this.modalService.dismissAll();
  }

  onDeliverClick(data:OrderResponseDto, content: any){
    console.log('Click', data)
    this.modalService.open(content).result.then((result) => {
      // close
      alert('When modal fades away')
    }, (reason)  => {
      //cross or esc
      alert('when close or esc is pressed to remove modal')
    });

  }
}
