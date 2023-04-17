import { environment } from "@env/environment";

export class PathConstant {

    public static API_ENDPOINT = environment.apiUrl;
    public static USER = '/user';
    public static ORDER_PAY = '/order/pay';
}
