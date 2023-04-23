import {AddressDTO} from "@app/core/model/domain.model";

export interface ShippingModel {
  shoppingId: number,
  deliveryInstruction: string,
  shippingStatus: string,
  address: AddressDTO
}
