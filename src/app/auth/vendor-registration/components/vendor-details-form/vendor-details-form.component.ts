import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-vendor-details-form',
  templateUrl: './vendor-details-form.component.html',
  styleUrls: ['./vendor-details-form.component.scss']
})
export class VendorDetailsFormComponent {

  @Output() next: EventEmitter<any> = new EventEmitter();
  @Output() previous: EventEmitter<any> = new EventEmitter();

  form: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      description: ['', Validators.required],
      // logo: ['', Validators.required]
    });
  }

  onNext() {
    this.next.emit("");
  }

  onPrevious() {
    this.previous.emit("");
  }

}
