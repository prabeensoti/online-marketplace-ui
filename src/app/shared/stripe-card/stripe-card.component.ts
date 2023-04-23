import { Component } from '@angular/core';

@Component({
  selector: 'app-stripe-card',
  templateUrl: './stripe-card.component.html',
  styleUrls: ['./stripe-card.component.scss']
})
export class StripeCardComponent {
  cardOptions: any;

  constructor() {
  }
}
