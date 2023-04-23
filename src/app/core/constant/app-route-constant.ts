import {environment} from "@env/environment";

const STRIPE_KEY = environment.stripeKey;
export class AppRouteConstant {

    public static STRIPE_KEY = STRIPE_KEY;
    public static CHECKOUT = 'checkout';
    public static CHECKOUT_BY_ID = 'checkout/:id';
}
