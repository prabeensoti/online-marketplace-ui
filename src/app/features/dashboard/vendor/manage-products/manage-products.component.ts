import { Component } from '@angular/core';
import { ProductDTO } from '@app/core/model/domain.model';
import { AbstractDataConfigurer } from '@app/shared/table/abstract-data-configurer';
import { ProductGridService } from '../../configurer/product-grid.service';
import { Router } from '@angular/router';
import { APP_UI_ROUTES } from '@app/core/route.util';

@Component({
  selector: 'app-manage-products',
  templateUrl: './manage-products.component.html',
  styleUrls: ['./manage-products.component.scss']
})
export class ManageProductsComponent {

  productDataGridConfigurer!: AbstractDataConfigurer<ProductDTO>;

  constructor(private productGridService: ProductGridService, private router: Router) {
    this.productDataGridConfigurer = productGridService;
  }

  updateProduct(data: ProductDTO): void {
    console.log('Update product ', data);
    // TODO either show modal popup or navigate to update product
    // this.router.navigate([APP_UI_ROUTES.MANAGE_PRODUCTS + '/view', data.productId]);
  }

}
