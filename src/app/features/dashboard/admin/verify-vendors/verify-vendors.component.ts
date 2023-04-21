import {Component} from '@angular/core';
import {VendorDTO} from '@app/core/model/domain.model';
import {AbstractDataConfigurer} from '@app/shared/table/abstract-data-configurer';
import {VendorGridService} from '../../configurer/vendor-grid.service';
import {Router} from '@angular/router';
import {ModalDismissReasons, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {FormControl} from "@angular/forms";
import {VendorService} from "@app/core/service/vendor.service";

@Component({
  selector: 'app-verify-vendors',
  templateUrl: './verify-vendors.component.html',
  styleUrls: ['./verify-vendors.component.scss']
})
export class VerifyVendorsComponent {
  vendorDataGridConfigurer!: AbstractDataConfigurer<VendorDTO>;

  closeResult = '';
  isVerified = new FormControl();

  constructor(private vendorGridService: VendorGridService, private router: Router,
              private modalService: NgbModal,
              private vendorService: VendorService) {
    this.vendorDataGridConfigurer = vendorGridService;
  }

  verifySelectedVendor(data: VendorDTO, content: any): void {
    console.log('Verify vendor ', data);
    // TODO verify vendor
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
        console.log(this.isVerified.value)
        const isVerified = this.isVerified.value
        if(isVerified == true)
          data.isVerified = true
        else
          data.isVerified = false
        this.vendorService.verifyVendor(data).subscribe(res => {
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
