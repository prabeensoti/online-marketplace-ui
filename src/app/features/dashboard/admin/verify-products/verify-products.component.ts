import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {ProductDTO, VerifyProductDTO} from '@app/core/model/domain.model';
import { AbstractDataConfigurer } from '@app/shared/table/abstract-data-configurer';
import { ProductGridAdminService } from '../../configurer/product-grid-admin.service';
import {FormControl} from "@angular/forms";
import {ModalDismissReasons, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ProductService} from "@app/core/service/product.service";
import {ToastService} from "@app/core/service/toast.service";

@Component({
  selector: 'app-verify-products',
  templateUrl: './verify-products.component.html',
  styleUrls: ['./verify-products.component.scss']
})
export class VerifyProductsComponent {

  productDataGridConfigurer!: AbstractDataConfigurer<ProductDTO>;

  closeResult = '';
  isVerified = new FormControl();

  constructor(private productGridService: ProductGridAdminService, private router: Router,
              private modalService: NgbModal,
              private productService: ProductService,
              private toastService: ToastService) {
    this.productDataGridConfigurer = productGridService;
  }

  verifySelectedProduct(data: ProductDTO, content: any): void {
    this.isVerified = new FormControl();
    console.log('Verify product ', data);
    // TODO verify product
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
        console.log(this.isVerified.value)
        const isVerified = this.isVerified.value
        if (isVerified == true) {
          data.isVerified = true
          this.toastService.show("Product Verify Successfully!", {classname: 'bg-success text-light fs-5', delay: 2000});
        }
        else {
          data.isVerified = false
          this.toastService.show("Product UnVerify Successfully!", {classname: 'bg-success text-light fs-5', delay: 2000});
        }

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
          vendorId: data.vendor != null ? data.vendor.vendorId: 0,
        }
        this.productService.verifyProduct(verifyProduct).subscribe(res => {
          console.log('Response ', res)
        }, err => {
          console.log(err)
          this.toastService.show(err.error.status+" "+err.error.message, { classname: 'bg-danger text-light fs-5', delay: 2000 });
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
