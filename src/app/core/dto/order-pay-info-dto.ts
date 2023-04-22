import { AddressDto } from "./address-dto";
import { CardInfoDto } from "./card-info-dto";

export class OrderPayInfoDto {
    
    userId!: number;
    fullName!: string;
    addressDtos!: [];
    cardInfoDtos!: [];
    
    quantity!: number
    price!: number
}
