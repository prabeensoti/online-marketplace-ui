import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {ProductDTO, VerifyProductDTO} from '@app/core/model/domain.model';
import { AbstractDataConfigurer } from '@app/shared/table/abstract-data-configurer';
import { ProductGridService } from '../../configurer/product-grid.service';
import {FormControl} from "@angular/forms";
import {ModalDismissReasons, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ProductService} from "@app/core/service/product.service";

@Component({
  selector: 'app-verify-products',
  templateUrl: './verify-products.component.html',
  styleUrls: ['./verify-products.component.scss']
})
export class VerifyProductsComponent {

  productDataGridConfigurer!: AbstractDataConfigurer<ProductDTO>;

  closeResult = '';
  isVerified = new FormControl();

  constructor(private productGridService: ProductGridService, private router: Router,
              private modalService: NgbModal,
              private productService: ProductService) {
    this.productDataGridConfigurer = productGridService;
  }

  verifySelectedProduct(data: ProductDTO, content: any): void {
    console.log('Verify product ', data);
    // TODO verify product
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
        console.log(this.isVerified.value)
        const isVerified = this.isVerified.value
        if(isVerified == true)
          data.isVerified = true
        else
          data.isVerified = false

        const verifyProduct : VerifyProductDTO = {
          categoryId: data.productCategory.categoryId,
          description: data.description,
          images: [],
          isDeleted: data.isDeleted,
          isVerified: data.isVerified,
          name: data.name,
          price: data.price,
          productId: data.productId,
          quantity: data.quantity,
          vendorId: data.vendor.vendorId

        }
        this.productService.verifyProduct(verifyProduct).subscribe(res => {
          console.log('Response ', res)
        }, err => {
          console.log(err)
        })
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      },
    );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

}
