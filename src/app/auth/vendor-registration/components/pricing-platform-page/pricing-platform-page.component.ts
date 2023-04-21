import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-pricing-platform-page',
  templateUrl: './pricing-platform-page.component.html',
  styleUrls: ['./pricing-platform-page.component.scss']
})
export class PricingPlatformPageComponent {

  @Output()
  selectedCard: EventEmitter<any> = new EventEmitter();

  selectedCardId: number = 1;

  pricingCards = [
    {
      id: 1,
      name: 'Local Seller', price: '5,000',
      features: ['Single User', '100 Products', 'Help center access', 'No Client Access'],
      buttonClass: 'btn-primary'
    },
    {
      id: 2,
      name: 'Medium Supplier',
      price: '12,000',
      features: ['20 users accounds', 'Upto 10,000 Products', '24/7 Help center access', 'No Client Access'],
      buttonClass: 'btn-primary'
    },
    {
      id: 3,
      name: 'Global Player',
      price: '20,000',
      features: ['Unlimited user accounts', 'Unlimited Products', 'Dedicated Help center access', 'Client access'],
      buttonClass: 'btn-primary'
    }
  ];

  public selectCard(card: any): void {
    this.selectedCardId = card.id;
    this.selectedCard.emit(card);
  }

}
