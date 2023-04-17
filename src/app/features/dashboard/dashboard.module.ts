import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardWrapperComponent } from './dashboard-wrapper.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardServicesComponent } from './components/dashboard-services/dashboard-services.component';
import { SharedModule } from '@app/shared/shared.module';
import { AccountProfileComponent } from './components/account-profile/account-profile.component';
import { AccountSettingsComponent } from './components/account-settings/account-settings.component';



@NgModule({
  declarations: [
    DashboardWrapperComponent,
    DashboardServicesComponent,
    AccountProfileComponent,
    AccountSettingsComponent,
  ],
  imports: [
    CommonModule,    
    DashboardRoutingModule,
    SharedModule
  ]
})
export class DashboardModule { }
