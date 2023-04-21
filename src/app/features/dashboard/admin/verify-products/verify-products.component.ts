import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProductDTO } from '@app/core/model/domain.model';
import { AbstractDataConfigurer } from '@app/shared/table/abstract-data-configurer';
import { ProductGridService } from '../../configurer/product-grid.service';

@Component({
  selector: 'app-verify-products',
  templateUrl: './verify-products.component.html',
  styleUrls: ['./verify-products.component.scss']
})
export class VerifyProductsComponent {

  productDataGridConfigurer!: AbstractDataConfigurer<ProductDTO>;

  constructor(private productGridService: ProductGridService, private router: Router) {
    this.productDataGridConfigurer = productGridService;
  }

  verifySelectedProduct(data: ProductDTO): void {
    console.log('Verify product ', data);
    // TODO verify product
  }

}
