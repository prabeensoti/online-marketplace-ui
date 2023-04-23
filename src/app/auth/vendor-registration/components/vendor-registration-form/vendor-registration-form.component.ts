import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '@app/auth/services/authentication.service';
import { StatusModel } from '@app/core/core.model';
import { CoreUtil } from '@app/core/core.util';
import { Subject, debounceTime, filter } from 'rxjs';

@Component({
  selector: 'app-vendor-registration-form',
  templateUrl: './vendor-registration-form.component.html',
  styleUrls: ['./vendor-registration-form.component.scss']
})
export class VendorRegistrationFormComponent implements OnInit {


  @Input() parentForm: FormGroup = new FormGroup({});
  @Output() next: EventEmitter<any> = new EventEmitter();

  statusModel: StatusModel = { loading: false, hasError: false };

  // state
  emailValidState: { isValid: boolean, apiCalled: boolean } = { isValid: false, apiCalled: false };

  constructor(private authService: AuthenticationService) {

  }

  ngOnInit(): void {
    this.onEmailChange();
  }

  get currentFormGroup(): FormGroup {
    return (this.parentForm.controls['account'] as FormGroup);
  }

  onNext(isNext: boolean = true): void {
    console.log("Vendor account created");
    if (isNext && (this.parentForm.controls['account'] as FormGroup).valid) {
      this.next.emit(true);
    } else if (!isNext) {
      this.next.emit(false);
    }
  }

  onEmailChange(): void {
    const emailFormControl: AbstractControl = this.currentFormGroup.controls['email'];
    emailFormControl.valueChanges.pipe(debounceTime(400)).subscribe(
      value => {
        this.statusModel = CoreUtil.loadingStatusModel(true);
        if (emailFormControl.valid) {
          this.emailValidState = { isValid: false, apiCalled: false };
          this.authService.checkIfEmailIsAvailable(emailFormControl.value).subscribe({
            next: (res) => {
              if (res.response) {
                this.emailValidState = { isValid: true, apiCalled: true };
                this.statusModel = CoreUtil.responseStatusModel(true, "You are good to go! This Email is available");
              } else {
                this.emailValidState = { isValid: false, apiCalled: false };
                this.statusModel = CoreUtil.responseStatusModel(false, "Sorry, this email is not available");
              }
            }, error: (err) => {
              this.statusModel = CoreUtil.responseStatusModel(false, "Something went wrong, while checking email");
            }
          });
        }

      }
    )
    // if (emailFormControl.valid) {


    // }

  }

}
