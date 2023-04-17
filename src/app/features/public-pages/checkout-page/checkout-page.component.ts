import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-checkout-page',
  templateUrl: './checkout-page.component.html',
  styleUrls: ['./checkout-page.component.scss']
})
export class CheckoutPageComponent implements OnInit {

  items = [{ name: 'Product name', description: 'Brief description', price: '$12' }, { name: 'Second product', description: 'Brief description', price: '$8' }, { name: 'Third item', description: 'Brief description', price: '$5' }];

  promo = { name: 'Promo code', code: 'EXAMPLECODE', discount: '$5' };

  total = '$20';

  ngOnInit(): void {
  }


}
