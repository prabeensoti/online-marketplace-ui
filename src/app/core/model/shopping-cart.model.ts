import {AddressDTO, ProductDTO, RoleDTO} from "@app/core/model/domain.model";
import {UserDTO} from "@app/core/model/user.model";

export interface ShoppingCartDTO {
  cartId: number;
  product: ProductDTO;
  password: UserDTO;
  quantity: number;
}
