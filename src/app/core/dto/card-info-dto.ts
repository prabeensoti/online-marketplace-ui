export class CardInfoDto {

    cardInfoId!: number;
    nameOnCard!: string;
    cardNumber!: string;
    expYear!: number;
    expMonth!: number;
    cvc!: string;
    cardBrand!:string;
    addressType!:string;

    public add(cardInfoDto: CardInfoDto) : CardInfoDto {
        this.cardInfoId = cardInfoDto?.cardInfoId;
        this.nameOnCard = cardInfoDto?.nameOnCard;
        this.cardNumber = cardInfoDto?.cardNumber;
        this.expYear = cardInfoDto?.expYear;
        this.expMonth = cardInfoDto?.expMonth;
        this.cvc = cardInfoDto?.cvc;
        this.cardBrand = cardInfoDto?.cardBrand;
        this.addressType = cardInfoDto?.addressType;

        return this;
    }

}
