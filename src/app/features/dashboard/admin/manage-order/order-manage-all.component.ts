import {Component} from '@angular/core';
import {AbstractDataConfigurer} from "@app/shared/table/abstract-data-configurer";
import {OrderResponseDto} from "@app/core/model/order-response.model";
import {AdminOrderGridService} from "@app/features/dashboard/configurer/order/admin-order-grid.service";
import {OrderDTO} from "@app/core/model/domain.model";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {OrderService} from "@app/core/service/order.service";
import {debounce, debounceTime} from "rxjs";
import {OrderStatusModel} from "@app/core/model/order.model";
import {ToastService} from "@app/core/service/toast.service";

@Component({
  selector: 'app-order-manage-all',
  templateUrl: './order-manage-all.component.html',
  styleUrls: ['./order-manage-all.component.scss']
})
export class OrderManageAllComponent {


  adminOrderDataGridConfigure !: AbstractDataConfigurer<OrderResponseDto>;
  selectedRowData!:OrderResponseDto;
  loading:boolean=false;
  protected readonly OrderStatusModel = OrderStatusModel;

  constructor(
      private adminOrderGridService: AdminOrderGridService,
      private modalService: NgbModal,
      private orderService: OrderService,
      private toastService:ToastService) {
    this.adminOrderDataGridConfigure = adminOrderGridService;
  }

  selectedOrder(data: OrderDTO): void {
    console.log('Order data ', data);
    // TODO either show modal popup or navigate to show order manage form
  }

  onOrderDeliver(): void {
    this.loading = true;
    console.log("On Order deliver", this.selectedRowData);
    this.orderService.patchOrder(this.selectedRowData.orderDto.orderId).subscribe({
      next:(res)=>{
        this.modalService.dismissAll();
        this.loading = false;
        console.log("res",res);
        this.toastService.show("Success",{ classname: 'bg-success text-light fs-5', delay: 2000 })
        this.selectedRowData.orderDto.orderStatus = OrderStatusModel.DELIVERED;
      },
      error:(err)=> {
        this.loading = false
      },
      complete:()=> {
        this.loading = false;
      }
    })
  }

  onDeliverClick(data:OrderResponseDto, content: any){
    this.selectedRowData = data;
    this.modalService.open(content).result.then((result) => {
      // close
      // alert('When modal fades away')
    }, (reason)  => {
      //cross or esc
      // alert('when close or esc is pressed to remove modal')
    });

  }
}
