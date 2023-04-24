import {Component} from '@angular/core';
import {AbstractDataConfigurer} from '@app/shared/table/abstract-data-configurer';
import {OrderDTO} from '@app/core/model/domain.model';
import {VendorOrderGridService} from "@app/features/dashboard/configurer/order/vendor-order-grid.service";
import {OrderResponseDto, RelatedOrderItem} from "@app/core/model/order-response.model";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {OrderItemModel, OrderStatusModel} from "@app/core/model/order.model";
import {OrderService} from "@app/core/service/order.service";
import {ToastService} from "@app/core/service/toast.service";

@Component({
  selector: 'app-manage-orders',
  templateUrl: './manage-orders.component.html',
  styleUrls: ['./manage-orders.component.scss']
})
export class ManageOrdersComponent {

  vendorOrderDataGridConfigure!: AbstractDataConfigurer<OrderResponseDto>;
  loading:boolean = false;
  selectedRowData!:OrderResponseDto
  protected readonly OrderStatusModel = OrderStatusModel;
  constructor(private vendorOrderGridService: VendorOrderGridService,
              private modalService: NgbModal,
              private orderService: OrderService,
              private toastService: ToastService) {
    this.vendorOrderDataGridConfigure = vendorOrderGridService;
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
        this.selectedRowData.relatedOrderItems = this.selectedRowData.relatedOrderItems.map(item => ({...item, orderItemStatus:'WAREHOUSE_SHIP'} as RelatedOrderItem));
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

  isAllShipped(data: OrderResponseDto): number {
    console.log('CALL')
    return data.relatedOrderItems.findIndex(orderItem => orderItem.orderItemStatus != OrderItemModel.WAREHOUSE_SHIP)
  }

}
