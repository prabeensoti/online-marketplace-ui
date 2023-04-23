import { AddressDto } from "../dto/address-dto";
import { CardInfoDto } from "../dto/card-info-dto";
import { AddressModel } from "./address-model";
import { CardInfoModel } from "./card-info-model";

export class UserCardInfoModel {

    userId!: number;
    fullName!: string;
    addressDto!: AddressDto;
    cardInfoDto!: CardInfoDto;
    
    quantity!: number
    price!: number
}
