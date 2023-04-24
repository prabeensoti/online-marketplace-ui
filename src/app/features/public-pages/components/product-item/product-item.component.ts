import { Component } from '@angular/core';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent {

  products = [
    {
      name: 'Product 1',
      description: 'This is the first product',
      price: 19.99,
      image: 'https://picsum.photos/3264/1836?random=4',
      link: 'https://example.com/products/1'
    },
    {
      name: 'Product 2',
      description: 'This is the second product',
      price: 29.99,
      image: 'https://picsum.photos/3264/1836?random=5',
      link: 'https://example.com/products/2'
    },
    {
      name: 'Product 3',
      description: 'This is the third product',
      price: 39.99,
      image: 'https://picsum.photos/3264/1836?random=6',
      link: 'https://example.com/products/3'
    },
    {
      name: 'Product 4',
      description: 'This is the second product',
      price: 29.99,
      image: 'https://picsum.photos/3264/1836?random=7',
      link: 'https://example.com/products/2'
    },
    {
      name: 'Product 5',
      description: 'This is the third product',
      price: 39.99,
      image: 'https://picsum.photos/3264/1836?random=8',
      link: 'https://example.com/products/3'
    },
    {
      name: 'Product 6',
      description: 'This is the third product',
      price: 39.99,
      image: 'https://picsum.photos/3264/1836?random=9',
      link: 'https://example.com/products/3'
    }
  ]

  constructor() { }

  ngOnInit(): void {
  }

  onAddToCartClick(id:number){
    alert(id)
  }


}
