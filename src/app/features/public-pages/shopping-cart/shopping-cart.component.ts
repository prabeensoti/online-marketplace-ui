import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {

  cartItems = [
    {
      title: "New Super Value Item",
      link: "#",
      description: "This is short description of New Super duper valuable item",
      price: "$1000.00",
      bestSeller: "Best Seller",
      stock: "Y",
      quantity: "3",
      share: "Share"
    },
    // add more items if needed
  ];

  total = "$1000.00"; // replace with actual total calculation logic

  constructor() { }

  ngOnInit(): void {
  }

}
