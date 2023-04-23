import { EnumRole } from "@app/core/model/domain.model";
import { UserDTO } from "@app/core/model/user.model";

export enum OAuth2Provider {
    GOOGLE,
    FACEBOOK,
    GITHUB
}

export interface RegisterContext {
    fullName: string;
    email: string;
    password: string;
}
export interface VerifyEmailContext {
    email: string;
    emailVerificationCode: string;
    registeredProviderName: string;
}
export interface VerifyForgotPasswordContext {
    email: string;
    forgotPasswordVerCode: string;
    newPassword: string;
}

export interface LoginContext {
    username: string;
    password: string;
    rememberMe?: boolean;
}

export interface AuthResponse {
    userId: string;
    fullName: string;
    token: string;
    email: string;
    username: string;
    role: EnumRole;
}

export interface JwtTokenPayload {
    sub: string;
    email: string;
    user: UserDTO
    authorities?: object;
    attributes?: object;
    iat: string;
    exp: string
}

export interface CardInfoContext {
    cardNumber: number;
    firstName: string;
    lastName: string;
    expiryDate: string;
    cvv: number
}

export interface VendorRegistrationContext {
    email: string;
    password: string;
    companyName: string;
    description: string;
    cardInfo: CardInfoContext;
}

export interface CategoryContext {
    category: string;
}