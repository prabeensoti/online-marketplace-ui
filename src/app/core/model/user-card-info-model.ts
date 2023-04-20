import { AddressModel } from "./address-model";
import { CardInfoModel } from "./card-info-model";

export class UserCardInfoModel {

    userId!: number;
    fullName!: string;
    addressModel!: AddressModel;
    cardInfoModel!: CardInfoModel;
    
    quantity!: number
    price!: number
}
