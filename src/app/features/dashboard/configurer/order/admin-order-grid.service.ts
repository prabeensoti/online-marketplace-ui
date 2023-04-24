import { Injectable } from '@angular/core';
import {ColumnType, IColumn} from "@app/shared/table/table-model";
import {AbstractDataConfigurer} from "@app/shared/table/abstract-data-configurer";
import {OrderResponseDto} from "@app/core/model/order-response.model";
import {ManageOrderService} from "@app/core/service/manage-order.service";
import {GenericFilterRequest, PageableResponse, PageRequest} from "@app/core/core.model";
import {Observable} from "rxjs";
import { OrderDTO } from '@app/core/model/domain.model';
import { toNumber as _toNumber  } from 'lodash';


export const MANAGE_ALL_ORDERS_COLUMN: IColumn[] = [
  { id: 1, name: 'orderId', label: 'Order Id', type: ColumnType.OBJECT, hide: true },
  { id: 3, name: 'orderDto', label: 'User', type: ColumnType.OBJECT, bindKeys: ['orderDto', 'user', 'fullName'] },
  { id: 2, name: 'orderDto', label: 'Order Id', type: ColumnType.OBJECT, bindKeys: ['orderDto', 'orderId'], defaultSearch: true },
  // { id: 4, name: 'orderDto', label: 'Order Status', type: ColumnType.OBJECT, bindKeys: ['orderDto', 'orderStatus'] },
  // { id: 2, name: 'orderStatus', label: 'Status', type: ColumnType.STRING },
];
@Injectable({
  providedIn: 'root'
})
export class AdminOrderGridService extends AbstractDataConfigurer<OrderResponseDto>{

  constructor(private manageOrderService: ManageOrderService) {
    super();
  }

  displayColumns: IColumn[] = MANAGE_ALL_ORDERS_COLUMN;

  setDisplayColumns(columns: IColumn[]): void {
    this.displayColumns = columns;
  }

  getColumns(): IColumn[] {
    return this.displayColumns;
  }

  getGridData(pageRequest: PageRequest): Observable<PageableResponse<Array<OrderResponseDto>>> {
    return this.manageOrderService.getOrderByAdmin(pageRequest);
  }

  filterGridData(pageRequest: PageRequest, genericFilterRequest: GenericFilterRequest<OrderResponseDto>): Observable<PageableResponse<Array<OrderResponseDto>>> {
    const mappedGenericFilterRequest: GenericFilterRequest<OrderDTO> | any = {
      dataFilter: {
        orderId: _toNumber(genericFilterRequest.searchText)
      }
    }
    return this.manageOrderService.filterManageOrders(pageRequest, mappedGenericFilterRequest);
    // return of({} as PageableResponse<OrderResponseDto[]>);
    // return this.getGridData(pageRequest);
  }

}
