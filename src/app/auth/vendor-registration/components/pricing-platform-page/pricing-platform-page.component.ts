import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-pricing-platform-page',
  templateUrl: './pricing-platform-page.component.html',
  styleUrls: ['./pricing-platform-page.component.scss']
})
export class PricingPlatformPageComponent {

  @Output()
  selectedCard: EventEmitter<any> = new EventEmitter();

  selectedCardId: number = 3;

  pricingCards = [
    {
      id: 1,
      name: 'Local Seller', price: '5,000',
      features: ['100 Products', 'Email/Phone Support', 'Support - Chat access', 'No Client Access'],
      buttonClass: 'btn-primary'
    },
    {
      id: 2,
      name: 'Medium Supplier',
      price: '12,000',
      features: ['Upto 10,000 Products', 'Priority Support', 'Priority Help center access', 'No Client Access'],
      buttonClass: 'btn-primary'
    },
    {
      id: 3,
      name: 'Global Distributor',
      price: '20,000',
      features: ['Unlimited Products', 'Dedicated Staff', '24/7 Help center access', 'Client access'],
      buttonClass: 'btn-primary'
    }
  ];

  public selectCard(card: any): void {
    this.selectedCardId = card.id;
    this.selectedCard.emit(card);
  }

}
