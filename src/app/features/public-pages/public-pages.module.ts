import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicPagesWrapperComponent } from './public-pages-wrapper.component';
import { HomePageComponent } from './home-page/home-page.component';
import { ContactPageComponent } from './contact-page/contact-page.component';
import { PublicPagesRoutingModule } from './public-pages-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from '@app/shared/shared.module';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { SearchNListingComponent } from './search-n-listing/search-n-listing.component';
import { CheckoutPageComponent } from './checkout-page/checkout-page.component';
import { CategoryItemsComponent } from './components/category-items/category-items.component';
import { ProductItemComponent } from './components/product-item/product-item.component';
import { NewsletterComponent } from './components/newsletter/newsletter.component';
import {InvoiceComponent} from "@app/features/public-pages/invoice/invoice.component";
import { CategoryComponent } from './category/category.component';
import { CheckingOrderComponent } from './checking-order/checking-order.component';


@NgModule({
  declarations: [
    HomePageComponent,
    ContactPageComponent,
    PublicPagesWrapperComponent,
    ShoppingCartComponent,
    SearchNListingComponent,
    CheckoutPageComponent,
    InvoiceComponent,
    CategoryItemsComponent,
    ProductItemComponent,
    NewsletterComponent,
    CategoryComponent,
    CheckingOrderComponent
  ],
  imports: [
    CommonModule,
    PublicPagesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class PublicPagesModule { }
