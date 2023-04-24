import {ShippingModel} from "@app/core/model/shipping.model";
import {PaymentDTO} from "@app/core/model/payment.model";
import {OrderStatusModel} from "@app/core/model/order.model";

enum UserStatus {
  VERIFIED = 'VERIFIED',
  UNVERIFIED = 'UNVERIFIED',
  SUSPENDED = 'SUSPENDED',
}
export enum EnumRole {
  ROLE_USER = 'ROLE_USER',
  ROLE_VENDOR = 'ROLE_VENDOR',
  ROLE_ADMIN = 'ROLE_ADMIN',
  NONE = 'NONE'
}
enum FileType {
  IMAGES = 'IMAGES',
  LIST = 'LIST',
}
enum OrderStatus {
  NEW = "NEW",
  IN_PROGRESS = "IN_PROGRESS",
  COMPLETED = "COMPLETED",
  DELIVERED = 'DELIVERED'
}

export interface UserDTO {
  userId: number;
  email: string;
  password: string;
  fullName: string;
  emailVerified?: boolean;
  phoneNumber?: string;
  userStatus: UserStatus;
  role: RoleDTO;
  address: AddressDTO;
}

export interface RoleDTO {
  roleId: number;
  role: EnumRole;
}

export interface ProductDTO {
  productId: number;
  name: string;
  description: string;
  quantity: number;
  price: number;
  images: FileEntityDTO[];

  isVerified: boolean;
  isDeleted: boolean;

  vendor?: VendorDTO;
  productCategory: ProductCategoryDTO;
}

export interface VerifyProductDTO {
  productId: number;
  name: string;
  description: string;
  quantity: number;
  price: number;
  images: FileEntityDTO[];

  isVerified: boolean;
  isDeleted: boolean;

  vendorId: number;
  categoryId: number ;
}

export interface VendorDTO {
  vendorId: number;
  description: string;
  logo: FileEntityDTO;
  isVerified: boolean
  user: UserDTO;
}

export interface ProductCategoryDTO {
  categoryId: number;
  category: string;
  fileUri?: string;
}

export interface OrderDTO {
  orderId: number;
  orderStatus: OrderStatusModel;
  orderDate: Date;
  shipping: ShippingModel;
  user: UserDTO;
  payments: PaymentDTO[]
}

export interface AddressDTO {
  addressId: number;
  address1: string;
  address2: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface FileEntityDTO {
  fileId: number;
  fileUri: string;
  fileType?: FileType;
}

export interface SearchFilterContext {
  name: string;
  categoryName: string;
  minPrice: number;
  maxPrice: number;
  sortedPrice: string;
}
