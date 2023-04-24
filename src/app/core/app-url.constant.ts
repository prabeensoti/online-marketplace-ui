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

        VENDOR_REGISTER: API_ENDPOINT + '/auth/register-vendor',

        CHECK_EMAIL_IS_AVAILABLE: API_ENDPOINT + '/auth/check-email-availability',
        CHECK_EMAIL_VERIFICATION_CODE: API_ENDPOINT + '/auth/check-email-verification-code',
        // RESEND_VERIFICATION_EMAIL: API_ENDPOINT + '/auth/resend-verification-email',
        FORGOT_PASSWORD: API_ENDPOINT + '/auth/send-forgot-password-email',
        PASSWORD_RESET_SET_NEW_PASS: API_ENDPOINT + '/auth/process-password-update-request',
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
        ALL_PUBLISHED: API_ENDPOINT + '/public/products',
        ALL_TOP_PRODUCTS_BY_CATEGORY: API_ENDPOINT + '/public/top-products-by-category',

        ALL_PUBLISHED_AND_TEMP: API_ENDPOINT + '/allProducts',
        ALL_PUBLISHED_AND_TEMP_OF_VENDOR: API_ENDPOINT+ '/allProducts/vendors',
        GET_BY_ID: API_ENDPOINT + '/products',
        CREATE: API_ENDPOINT + '/products',
        UPDATE: API_ENDPOINT + '/products',
        DELETE: API_ENDPOINT + '/products',
        FILTER: API_ENDPOINT + '/products/filter',
        VERIFY: API_ENDPOINT + '/products/verify',
        SEARCH: API_ENDPOINT + '/s'
    };

    static readonly VENDORS = {
        ALL: API_ENDPOINT + '/vendors',
        GET_BY_ID: API_ENDPOINT + '/vendor',
        CREATE: API_ENDPOINT + '/vendors',
        VERIFY: API_ENDPOINT + '/vendors',
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
        FILTER: API_ENDPOINT + '/orders/filter',
        GET_BY_PRODUCT_CODE: API_ENDPOINT + '/public/orders',
        PATCH_ORDER: API_ENDPOINT + '/orders'

    };

  static readonly MANAGE_ORDERS = {
    ALL: API_ENDPOINT + '/manage-order',
    GET_BY_ID: API_ENDPOINT + '/manage-order',
    CREATE: API_ENDPOINT + '/manage-order',
    UPDATE: API_ENDPOINT + '/manage-order',
    DELETE: API_ENDPOINT + '/manage-order',
    FILTER: API_ENDPOINT + '/manage-order/filter',
    GET_BY_USER: API_ENDPOINT + '/manage-order/user',
    GET_BY_VENDOR: API_ENDPOINT + '/manage-order/vendor',
    GET_BY_ADMIN: API_ENDPOINT + '/manage-order/admin'

  };

  static readonly CATEGORIES = {
    ALL: API_ENDPOINT + '/public/category',
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
  static readonly REPORT = {
    VENDOR_PRODUCT_SALES: API_ENDPOINT+'/report/vendor/product/sales',
    VENDOR_PRODUCT_SALES_PDF: API_ENDPOINT+'/report/vendor/product/sales/pdf',
    ADMIN_PRODUCT_SALES: API_ENDPOINT+'/report/admin/product/sales',
    ADMIN_PRODUCT_SALES_PDF: API_ENDPOINT+'/report/admin/product/sales/pdf',
    ADMIN_VENDOR_SALES: API_ENDPOINT+'/report/admin/vendor/sales',
    ADMIN_VENDOR_SALES_PDF: API_ENDPOINT+'/report/admin/vendor/sales/pdf',
  }
  static APP_UI_ROUTES: any;

}
