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


@NgModule({
  declarations: [
    LoginPageComponent,
    SignupPageComponent,
    VerifyRequestComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    SharedModule
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
