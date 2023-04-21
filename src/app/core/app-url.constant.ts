import { environment } from '@env/environment';
import { QueryParamKey } from './core.constant';

const API_ENDPOINT = environment.apiUrl;


// For Oauth-redirect: "http://localhost:4200"  see: window.location.origin
export const CURRENT_WINDOW_URL = window.location.protocol + '//' + window.location.hostname + (window.location.port ? ':' + window.location.port : '');
const OAUTH2_UI_REDIRECT_URI = QueryParamKey.REDIRECT_URI + '=' + CURRENT_WINDOW_URL + '/login'

// API Endpoints
export class ApiEndpoints {

    static readonly API_URL = API_ENDPOINT;

    static readonly AUTH = {
        CUSTOM_USER_REGISTRATION: API_ENDPOINT + '/auth/register-user',
        CUSTOM_USER_LOGIN: API_ENDPOINT + '/auth/login',

        CHECK_VERIFICATION_CODE: API_ENDPOINT + '/auth/check-verification-code',
        RESEND_VERIFICATION_EMAIL: API_ENDPOINT + '/auth/resend-verification-email',
        FORGOT_PASSWORD: API_ENDPOINT + '/auth/send-forgot-password',
        PASSWORD_RESET_SET_NEW_PASS: API_ENDPOINT + '/auth/process-password-reset',
        LOGOUT: API_ENDPOINT + '/logout',

        GOOGLE_AUTH: API_ENDPOINT + '/oauth2/authorize/google?' + OAUTH2_UI_REDIRECT_URI,
        FACEBOOK_AUTH: API_ENDPOINT + '/oauth2/authorize/facebook?' + OAUTH2_UI_REDIRECT_URI,
        GITHUB_AUTH: API_ENDPOINT + '/oauth2/authorize/github?' + OAUTH2_UI_REDIRECT_URI,

    };

    static readonly USERS = {
        USER_DETAILS: API_ENDPOINT + '/users/me'
    };

    // CATEGORY

    static readonly PRODUCTS = {
        ALL: API_ENDPOINT + '/products',
        GET_BY_ID: API_ENDPOINT + '/products',
        CREATE: API_ENDPOINT + '/products',
        UPDATE: API_ENDPOINT + '/products',
        DELETE: API_ENDPOINT + '/products',
        FILTER: API_ENDPOINT + '/products/filter'

    };

    static readonly VENDORS = {
        ALL: API_ENDPOINT + '/vendors',
        GET_BY_ID: API_ENDPOINT + '/vendor',
        CREATE: API_ENDPOINT + '/vendors',
        UPDATE: API_ENDPOINT + '/vendors',
        DELETE: API_ENDPOINT + '/vendors',
        FILTER: API_ENDPOINT + '/vendors/filter'

    };

    static readonly ORDERS = {
        ALL: API_ENDPOINT + '/orders',
        GET_BY_ID: API_ENDPOINT + '/orders',
        CREATE: API_ENDPOINT + '/orders',
        UPDATE: API_ENDPOINT + '/orders',
        DELETE: API_ENDPOINT + '/orders',
        FILTER: API_ENDPOINT + '/orders/filter'

    };

  static readonly CATEGORIES = {
    ALL: API_ENDPOINT + '/category',
    GET_BY_ID: API_ENDPOINT + '/category',
    CREATE: API_ENDPOINT + '/category',
    UPDATE: API_ENDPOINT + '/category',
    DELETE: API_ENDPOINT + '/category'
  };

    // Other Url constants

    static readonly SHOPPING_CART = {
      ALL: API_ENDPOINT+'/shopping-cart',
      GET: API_ENDPOINT+'/shopping-cart',
      POST: API_ENDPOINT+'/shopping-cart',
      PUT: API_ENDPOINT+'/shopping-cart',
      DELETE: API_ENDPOINT+'/shopping-cart'
  }

}
