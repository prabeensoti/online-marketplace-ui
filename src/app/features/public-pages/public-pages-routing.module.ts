import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PublicPagesWrapperComponent } from './public-pages-wrapper.component';
import { HomePageComponent } from './home-page/home-page.component';
import { ContactPageComponent } from './contact-page/contact-page.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { SearchNListingComponent } from './search-n-listing/search-n-listing.component';
import { CheckoutPageComponent } from './checkout-page/checkout-page.component';
import {InvoiceComponent} from "@app/features/public-pages/invoice/invoice.component";
import { CategoryComponent } from './category/category.component';
import { PricingPlatformPageComponent } from '../../auth/vendor-registration/components/pricing-platform-page/pricing-platform-page.component';


const routes: Routes = [
  {
    path: '',
    component: PublicPagesWrapperComponent,
    children: [
      {
        path: '',
        component: HomePageComponent,
         pathMatch: 'full',
        data: {
          title: 'Home'
        },
      },
      {
        path: 's',
        component: SearchNListingComponent,
        data: {
          title: 'Search'
        }
      },
      {
        path: 'cart',
        component: ShoppingCartComponent,
        data: {
          title: 'Shopping Cart'
        }
      },

      {
        path: 'checkout',
        component: CheckoutPageComponent,
        data: {
          title: 'Checkout Page'
        }
      },
      {
        path: 'invoice',
        component: InvoiceComponent
      },{
        path: 'category',
        component: CategoryComponent
    },

    ]

  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicPagesRoutingModule { }
