export class OrderPayResponseDto {

    success !: boolean;
    message : string;
    httpStatus !: string;
    paymentStatus !: string;
    body !: number;

    constructor(message: string){
        this.message = message;
    }

}
