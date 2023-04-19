import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardWrapperComponent } from './dashboard-wrapper.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardServicesComponent } from './components/dashboard-services/dashboard-services.component';
import { SharedModule } from '@app/shared/shared.module';
import { AccountProfileComponent } from './components/account-profile/account-profile.component';
import { AccountSettingsComponent } from './components/account-settings/account-settings.component';
import { EmailHistoryComponent } from './admin/email-history/email-history.component';
import {NgbPagination} from "@ng-bootstrap/ng-bootstrap";
import {FormsModule} from "@angular/forms";
import { EmailViewComponent } from './admin/email-history/email-view/email-view.component';



@NgModule({
  declarations: [
    DashboardWrapperComponent,
    DashboardServicesComponent,
    AccountProfileComponent,
    AccountSettingsComponent,
    EmailHistoryComponent,
    EmailViewComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
    NgbPagination,
    FormsModule
  ]
})
export class DashboardModule { }
