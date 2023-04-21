import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-vendor-registration-form',
  templateUrl: './vendor-registration-form.component.html',
  styleUrls: ['./vendor-registration-form.component.scss']
})
export class VendorRegistrationFormComponent {

  @Output() next: EventEmitter<any> = new EventEmitter();

  form: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onNext(): void {
    console.log("Vendor account created");
    this.next.emit("Account created");
  }

}
