import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardWrapperComponent } from './dashboard-wrapper.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardServicesComponent } from './components/dashboard-services/dashboard-services.component';
import { SharedModule } from '@app/shared/shared.module';
import { AccountProfileComponent } from './components/account-profile/account-profile.component';
import { AccountSettingsComponent } from './components/account-settings/account-settings.component';
import { EmailHistoryComponent } from './admin/email-history/email-history.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgbDatepicker, NgbInputDatepicker, NgbModalModule, NgbPagination} from "@ng-bootstrap/ng-bootstrap";
import { EmailViewComponent } from './admin/email-history/email-view/email-view.component';
import { BreadcrumbComponent } from '@app/shared/breadcrumb/breadcrumb.component';
import { ManageOrdersComponent } from './vendor/manage-orders/manage-orders.component';
import { ManageProductsComponent } from './vendor/manage-products/manage-products.component';
import { VerifyProductsComponent } from './admin/verify-products/verify-products.component';
import { VerifyVendorsComponent } from './admin/verify-vendors/verify-vendors.component';
import { SupportNMessagesComponent } from './components/support-n-messages/support-n-messages.component';
import { ReportViewComponent } from './components/report-view/report-view.component';
import { UserOrdersComponent } from './user/user-orders/user-orders.component';
import { CategoryComponent } from '../public-pages/category/category.component';
import {AddProductComponent} from "@app/features/dashboard/vendor/manage-products/add-product/add-product.component";
import { SalesReportComponent } from './vendor/product-sales-report/sales-report.component';


@NgModule({
  declarations: [
    DashboardWrapperComponent,
    DashboardServicesComponent,
    AccountProfileComponent,
    AccountSettingsComponent,
    EmailHistoryComponent,
    EmailViewComponent,
    ManageOrdersComponent,
    ManageProductsComponent,
    VerifyProductsComponent,
    VerifyVendorsComponent,
    SupportNMessagesComponent,
    ReportViewComponent,
    UserOrdersComponent,
    AddProductComponent,
    SalesReportComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
    NgbPagination,
    FormsModule,
    NgbModalModule,
    ReactiveFormsModule,
    NgbInputDatepicker,
    NgbDatepicker
  ]
})
export class DashboardModule { }
