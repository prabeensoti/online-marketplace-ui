import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from './loading/loading.component';
import { HomeNavbarComponent } from './home-navbar/home-navbar.component';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ServiceSearchComponent } from './home-navbar/components/service-search/service-search.component';
import { FormsModule } from '@angular/forms';
import { FooterComponent } from './footer/footer.component';
import { ToastNotificationComponent } from './toast-notification/toast-notification.component';
import { SanitizeHtmlPipeComponent } from "@app/shared/pipe/sanitize-html-pipe.component";
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { TableComponent } from './table/table.component';
import { ObjKeysPipe } from './table/pipe/obj-keys.pipe';
import { StColumnSortDirective } from './table/st-column-sort/st-column-sort.directive';
import { StPaginationComponent } from './table/st-pagination/st-pagination.component';
import { PageStatusViewComponent } from './page-status-view/page-status-view.component';
import { AutoFocusDirective } from './directives/auto-focus.directive';
import { DatePickerComponent } from './datepicker/date-picker.component';
import {StripeCardComponent} from "@app/shared/stripe-card/stripe-card.component";

const sharedComponents = [
  LoadingComponent,
  PageStatusViewComponent,
  BreadcrumbComponent,
  TableComponent,
  AutoFocusDirective,
  ObjKeysPipe,
  SanitizeHtmlPipeComponent,
  ToastNotificationComponent,
  StripeCardComponent,
  HomeNavbarComponent,
  ServiceSearchComponent,
  FooterComponent,
  DatePickerComponent
];

@NgModule({
  declarations: [
    ...sharedComponents,
    StColumnSortDirective,
    StPaginationComponent,
    StPaginationComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    NgbModule
  ],
  exports: [...sharedComponents]
})
export class SharedModule { }
