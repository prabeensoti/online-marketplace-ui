import { Component } from '@angular/core';
import { VendorDTO } from '@app/core/model/domain.model';
import { AbstractDataConfigurer } from '@app/shared/table/abstract-data-configurer';
import { VendorGridService } from '../../configurer/vendor-grid.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-verify-vendors',
  templateUrl: './verify-vendors.component.html',
  styleUrls: ['./verify-vendors.component.scss']
})
export class VerifyVendorsComponent {

  vendorDataGridConfigurer!: AbstractDataConfigurer<VendorDTO>;

  constructor(private vendorGridService: VendorGridService, private router: Router) {
    this.vendorDataGridConfigurer = vendorGridService;
  }

  verifySelectedVendor(data: VendorDTO): void {
    console.log('Verify vendor ', data);
    // TODO verify vendor
  }
}
