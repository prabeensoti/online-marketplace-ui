import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignupPageComponent } from './auth/signup-page/signup-page.component';
import { LoginPageComponent } from './auth/login-page/login-page.component';
import { VerifyRequestComponent } from './auth/verify-request/verify-request.component';
import { AuthenticationGuard } from './auth/guards/authentication.guard';
import { PricingPlatformPageComponent } from './auth/vendor-registration/components/pricing-platform-page/pricing-platform-page.component';
import { VendorRegistrationComponent } from './auth/vendor-registration/vendor-registration.component';

const routes: Routes = [

  {
    path: 'register',
    component: SignupPageComponent,
  },
  {
    path: 'login',
    component: LoginPageComponent,
  },
  {
    path: 'verify',
    component: VerifyRequestComponent,
  },
  {
    path: 'vendor-register',
    component: VendorRegistrationComponent,
  },

  {
    path: '',
    loadChildren: () => import('@app/features/public-pages/public-pages.module')
      .then(m => m.PublicPagesModule),
  },
  {
    path: 'dashboard',
    canActivate: [AuthenticationGuard],
    loadChildren: () => import('@app/features/dashboard/dashboard.module')
      .then(m => m.DashboardModule)
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
