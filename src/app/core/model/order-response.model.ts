import {OrderDTO, ProductDTO} from "@app/core/model/domain.model";
import {OrderItemModel} from "@app/core/model/order.model";

export interface OrderResponseDto {
  orderDto: OrderDTO;
  total: number;
  relatedOrderItems: RelatedOrderItem[]
}

export interface RelatedOrderItem {
  orderItemId: number,
    price: number,
  tax: number,
  quantity: number,
  discount: number,
  orderItemStatus:OrderItemModel
  isCommissioned: boolean,
    product: ProductDTO
}
