import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginPageComponent } from './login-page/login-page.component';
import { SignupPageComponent } from './signup-page/signup-page.component';
import { VerifyRequestComponent } from './verify-request/verify-request.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthRoutingModule } from './auth-routing.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from '@app/shared/shared.module';
import { HttpAuthInterceptor } from './interceptor/http-auth.interceptor';
import { VendorRegistrationComponent } from './vendor-registration/vendor-registration.component';
import { PricingPlatformPageComponent } from './vendor-registration/components/pricing-platform-page/pricing-platform-page.component';
import { VendorRegistrationFormComponent } from './vendor-registration/components/vendor-registration-form/vendor-registration-form.component';
import { VendorPaymentFormComponent } from './vendor-registration/components/vendor-payment-form/vendor-payment-form.component';
import { VendorDetailsFormComponent } from './vendor-registration/components/vendor-details-form/vendor-details-form.component';
import { AuthPagesNavbarComponent } from './components/auth-pages-navbar/auth-pages-navbar.component';
import { AuthPagesFooterComponent } from './components/auth-pages-footer/auth-pages-footer.component';


@NgModule({
  declarations: [
    LoginPageComponent,
    SignupPageComponent,
    VerifyRequestComponent,
    PricingPlatformPageComponent,
    VendorRegistrationComponent,
    VendorRegistrationFormComponent,
    VendorPaymentFormComponent,
    VendorDetailsFormComponent,
    AuthPagesNavbarComponent,
    AuthPagesFooterComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    SharedModule,
  ],
  providers: [
    {
        provide: HTTP_INTERCEPTORS,
        useClass: HttpAuthInterceptor,
        multi: true
    },
  ]
})
export class AuthModule { }
