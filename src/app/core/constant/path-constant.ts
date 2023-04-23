import { environment } from "@env/environment";

export class PathConstant {
    
    public static API_ENDPOINT = environment.apiUrl;
    public static USER = '/user';
    public static ORDER = '/order';
    public static PAY = "/pay"
    public static INFO = '/info';
}
