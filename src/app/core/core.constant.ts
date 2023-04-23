import { environment } from "@env/environment";

export const appBrandName = environment.appBrandName || 'My App';


export class QueryParamKey {

  static readonly TOKEN = "token";
  static readonly ERROR = "error";
  static readonly EMAIL = "email";

  // Authentication constants, API Authenntication flow will process this param ob the basis of the implementation logic
  static readonly REDIRECT_URI = "redirect_uri";
  static readonly ORIGINAL_REQUEST_URI = "original_request_uri";

  // Email Verification QueryParam Keys
  static readonly IS_PROCESS_VERIFY_EMAIL = "isProcessVerifyEmail";
  static readonly EMAIL_VERIFICATION_CODE = "emailVerificationCode";
  static readonly REGISTERED_PROVIDER_NAME = "registeredProviderName";

  // Password reset query params
  static readonly IS_PROCESS_PASSWORD_RESET = "isProcessPasswordReset";
  static readonly FORGOT_PASSWORD_VER_CODE = "forgotPasswordVerCode";


}

export class QueryParamUIKey {

  static readonly ORIGINAL_REQUEST_URI = 'originalRequestUri';
  static readonly REFERRED_FROM_URI = 'referredFromUri';
  static readonly DEFAULT_INFO_MESSAGE = 'defaultInfoMessage';

  static readonly INFO_MESSAGE = "infoMessage";

  static readonly REGISTRATION_SUCCESSFUL = "registrationSuccess";
  static readonly EMAIL_VERIFICATION_SUCCESSFUL = "emailVerificationSuccess";
  static readonly PASSWORD_RESET_SUCCESSFUL = "passwordResetSuccess";

}


export const MESSAGE_RESPONSE_CONSTANTS = {

  Success_Action: 'Action Success',
  Operation_Failed_MSG: 'Oops! Something went wrong !!',

};

export const ERROR_CODES_CONSTANTS = {
  ServerDown: 0,
  BadRequest: 400,
  Unauthorized: 401,
  ResourceNotFound: 404,
  InternalServerError: 500,
};

export class Constants {
  static readonly STORAGE_LOCATION = sessionStorage;
  static readonly CART_ITEMS_KEY = 'CART_ITEMS_KEY';
}
