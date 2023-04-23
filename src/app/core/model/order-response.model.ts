import {OrderDTO, ProductDTO} from "@app/core/model/domain.model";

export interface OrderResponseDto {
  orderDto: OrderDTO;
  total: number;
  relatedOrderItems: [{
    orderItemId: number,
    price: number,
    tax: number,
    quantity: number,
    discount: number,
    isCommissioned: boolean,
    product: ProductDTO
  }]
}
