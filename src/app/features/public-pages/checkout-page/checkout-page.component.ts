import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-checkout-page',
  templateUrl: './checkout-page.component.html',
  styleUrls: ['./checkout-page.component.scss']
})
export class CheckoutPageComponent implements OnInit {

  items = [{ name: 'Product name', description: 'Brief description', price: '$12' }, { name: 'Second product', description: 'Brief description', price: '$8' }, { name: 'Third item', description: 'Brief description', price: '$5' }];

  promo = { name: 'Promo code', code: 'EXAMPLECODE', discount: '$5' };

  total = '$20';

  constructor(private router: Router) {

  }

  ngOnInit(): void {
  }

  onCheckOut() {
    console.log('Check out Click');
    let orderId = 1;
    // After Payment Calculate and Success navigate to Invoice page
    this.router.navigate(['/invoice',orderId]);
  }


}
