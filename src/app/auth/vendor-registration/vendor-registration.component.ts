import { Component, OnInit } from '@angular/core';
import { CardInfoContext, VendorRegistrationContext } from '../auth.model';
import { VendorService } from '@app/core/service/vendor.service';
import { StatusModel } from '@app/core/core.model';
import { CoreUtil } from '@app/core/core.util';
import { Subject } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-vendor-registration',
  templateUrl: './vendor-registration.component.html',
  styleUrls: ['./vendor-registration.component.scss']
})
export class VendorRegistrationComponent implements OnInit {

  step: number = 1;
  maxStep: number = 3;

  vendorRegistrationForm!: FormGroup;
  statusModel: StatusModel = { loading: false, hasError: false };

  constructor(private formBuilder: FormBuilder, private vendorService: VendorService) { }

  ngOnInit(): void {
    this.initAllForms();
  }

  private initAllForms() {
    this.vendorRegistrationForm = this.formBuilder.group({
      account: this.formBuilder.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required],
        passwordConfirm: ['', Validators.required]
      }, {
        validator: CoreUtil.ConfirmedValidator('password', 'passwordConfirm')
      }),
      vendorDetails: this.formBuilder.group({
        companyName: ['', Validators.required],
        description: ['', Validators.required],
      }),
      cardInfo: this.formBuilder.group({
        cardNumber: ['', [Validators.required, Validators.pattern('^[0-9]{16}$')]],
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        expiryDate: ['', [Validators.required, Validators.pattern('^(0[1-9]|1[0-2])\/[0-9]{2}$')]],
        cvv: ['', [Validators.required, Validators.pattern('^[0-9]+$')]]
      })
    });
  }

  onNext() {
    this.step++;
  }

  onPrevious() {
    this.step--;
  }

  stepper(isNext: boolean): void {
    if (this.step <= this.maxStep) {
      if (isNext) {
        this.step++;
      } else {
        this.step--;
      }
    }
  }

  onVendorRegSubmit(): void {
    console.log(this.vendorRegistrationForm.value);
    const regForm = this.vendorRegistrationForm.value;
    const vendorRegistrationContext: VendorRegistrationContext = {
      email: regForm.account.email,
      password: regForm.account.password,
      companyName: regForm.vendorDetails.companyName,
      description: regForm.vendorDetails.description,
      cardInfo: regForm.cardInfo
    }
    this.vendorService.registerVendor(vendorRegistrationContext).subscribe({
      next: (res) => {
        console.log("Registration Successful ", res);
        this.statusModel = CoreUtil.responseStatusModel(true, "Registration Successful!, Please verify your email. After Verification and Admin approval, You will get an email with Successfull Registration.");
        this.vendorRegistrationForm.reset();
      },
      error: (err) => {
        console.log("error ", err);
        this.statusModel = CoreUtil.responseStatusModel(false, err?.error?.message);
      },
    })
  }

}
