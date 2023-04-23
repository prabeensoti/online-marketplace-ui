export class OrderPayResponseDto {

    success !: boolean;
    message : string;
    httpStatus !: string;
    paymentStatus !: string;

    constructor(message: string){
        this.message = message;
    }

}
