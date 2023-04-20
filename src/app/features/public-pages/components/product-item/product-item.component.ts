import { Component } from '@angular/core';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent {

  constructor() { }

  ngOnInit(): void {
  }

  onAddToCartClick(id:number){
    alert(id)
  }


}
