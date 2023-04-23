import { AddressModel } from "./address-model";
import { CardInfoModel } from "./card-info-model";
import { ShoppingCartDTO } from "./shopping-cart.model";

export class OrderPayModel {
    
    addressDto!: AddressModel;
    cardInfoDto !: CardInfoModel;

    isGuestUser !: boolean;
    clientIp !: string;
    cardId !: string;
    transactionId !: string;

    userId!:number;
    fullName!: string;
    email!: string;
    quantity!: number;
    price!: number;
    shoppingCartDtos!: ShoppingCartDTO[];

    // cardNumber!: number;
    // lastFourDigits!: number;
    // nameOnCard!: string;
    // securityCode!: number;
    // expMonth!: number;
    // expYear!: number;
    // cvc!: string;
    // cardBrand!: string

}
