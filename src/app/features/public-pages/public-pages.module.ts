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
import { CheckoutPageComponent } from './checkout-page/checkout-page.component';
import { CategoryItemsComponent } from './components/category-items/category-items.component';
import { ProductItemComponent } from './components/product-item/product-item.component';


@NgModule({
  declarations: [
    HomePageComponent,
    ContactPageComponent,
    PublicPagesWrapperComponent,
    ShoppingCartComponent,
    SearchNListingComponent,
    CheckoutPageComponent,
    CategoryItemsComponent,
    ProductItemComponent,
    
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
