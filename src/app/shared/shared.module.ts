import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from './loading/loading.component';
import { HomeNavbarComponent } from './home-navbar/home-navbar.component';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ServiceSearchComponent } from './home-navbar/components/service-search/service-search.component';
import { FormsModule } from '@angular/forms';

const sharedComponents = [
  HomeNavbarComponent,
  ServiceSearchComponent,
  LoadingComponent
];

@NgModule({
  declarations: [...sharedComponents],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    NgbModule
  ],
  exports: [...sharedComponents]
})
export class SharedModule { }
