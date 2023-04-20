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

  vendor: VendorDTO;
  productCategory: ProductCategoryDTO;
}

export interface VendorDTO {
  vendorId: number;
  description: string;
  logo: FileEntityDTO;

  user: UserDTO;
}

export interface ProductCategoryDTO {
  categoryId: number;
  category: string;
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
  uri: string;
  fileType?: FileType;
}
