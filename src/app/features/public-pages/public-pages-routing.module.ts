import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PublicPagesWrapperComponent } from './public-pages-wrapper.component';
import { HomePageComponent } from './home-page/home-page.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { SearchNListingComponent } from './search-n-listing/search-n-listing.component';
import { CheckoutPageComponent } from './checkout-page/checkout-page.component';
import { AppRouteConstant } from '@app/core/constants/app-route-constant';


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
        path: AppRouteConstant.CHECKOUT_BY_ID,
        component: CheckoutPageComponent,
                // loadChildren: () => import('./checkout-page/checkout-page.module').then((m) => m.CheckoutPageModule),
        data: {
          title: 'Checkout Page'
        }
      },
      

    ]

  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicPagesRoutingModule { }
