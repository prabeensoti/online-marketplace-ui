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
import {StripeCardComponent} from "@app/shared/stripe-card/stripe-card.component";

const sharedComponents = [
  HomeNavbarComponent,
  ServiceSearchComponent,
  LoadingComponent,
  FooterComponent,
  BreadcrumbComponent,
  TableComponent
];

@NgModule({
  declarations: [
    ...sharedComponents,
    ToastNotificationComponent,
    SanitizeHtmlPipeComponent,
    ObjKeysPipe,
    StColumnSortDirective,
    StPaginationComponent,
    StripeCardComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    NgbModule
  ],
  exports: [...sharedComponents, ToastNotificationComponent, SanitizeHtmlPipeComponent]
})
export class SharedModule { }
