import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicPagesWrapperComponent } from './public-pages-wrapper.component';
import { HomePageComponent } from './home-page/home-page.component';
import { ContactPageComponent } from './contact-page/contact-page.component';
import { PublicPagesRoutingModule } from './public-pages-routing.module';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from '@app/shared/shared.module';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { SearchNListingComponent } from './search-n-listing/search-n-listing.component';


@NgModule({
  declarations: [
    HomePageComponent,
    ContactPageComponent,
    PublicPagesWrapperComponent,
    ShoppingCartComponent,
    SearchNListingComponent,
  ],
  imports: [
    CommonModule,
    PublicPagesRoutingModule,
    FormsModule,
    NgbModule,
    SharedModule
  ]
})
export class PublicPagesModule { }
