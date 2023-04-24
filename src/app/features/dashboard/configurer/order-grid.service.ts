import { Injectable } from '@angular/core';
import { GenericFilterRequest, PageRequest, PageableResponse } from '@app/core/core.model';
import { OrderDTO } from '@app/core/model/domain.model';
import { OrderService } from '@app/core/service/order.service';
import { AbstractDataConfigurer } from '@app/shared/table/abstract-data-configurer';
import { ColumnType, IColumn } from '@app/shared/table/table-model';
import { Observable } from 'rxjs';

export const MANAGE_ORDERS_COLUMN: IColumn[] = [
  { id: 1, name: 'orderId', label: 'Order Id', type: ColumnType.NUMBER, hide: true, defaultSearch: true },
  { id: 7, name: 'user', label: 'Vendor', type: ColumnType.OBJECT, bindKeys: ['user', 'fullName'] },
  { id: 2, name: 'orderStatus', label: 'Status', type: ColumnType.STRING },
];

@Injectable({
  providedIn: 'root'
})
export class OrderGridService extends AbstractDataConfigurer<OrderDTO> {

  displayColumns: IColumn[] = MANAGE_ORDERS_COLUMN;

  constructor(private orderService: OrderService) {
    super();
  }

  setDisplayColumns(columns: IColumn[]): void {
    this.displayColumns = columns;
  }

  getColumns(): IColumn[] {
    return this.displayColumns;
  }

  getGridData(pageRequest: PageRequest): Observable<PageableResponse<Array<OrderDTO>>> {
    return this.orderService.getAllOrders(pageRequest);
  }

  filterGridData(pageRequest: PageRequest, genericFilterRequest: GenericFilterRequest<OrderDTO>): Observable<PageableResponse<Array<OrderDTO>>> {
    return this.orderService.filterOrders(pageRequest, genericFilterRequest);
  }

}