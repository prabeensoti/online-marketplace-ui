import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {OrderService} from "@app/core/service/order.service";
import {ToastService} from "@app/core/service/toast.service";

@Component({
  selector: 'app-checking-order',
  templateUrl: './checking-order.component.html',
  styleUrls: ['./checking-order.component.scss']
})
export class CheckingOrderComponent implements OnInit{
  loading: boolean = false;
  display: boolean = false
  myForm! : FormGroup;
  data: any
  orderItem: any

  constructor(private formBuilder: FormBuilder,
              private orderService: OrderService,
              private toastService: ToastService) {
  }

  ngOnInit(): void {
    this.initializedForm()
  }

  initializedForm() {
     this.myForm = this.formBuilder.group({
       orderCode: ['',[Validators.required]]
    })
  }

  get formControls(): {[p: string]: AbstractControl} {
    return this.myForm.controls
  }

  searchOrder() {
    const form = this.myForm.value;
    console.log(form.orderCode);
    this.orderService.getOrderItems(form.orderCode).subscribe(res => {
      console.log(res)
      this.data = res
      this.orderItem = this.data.orderItemDto
      this.display = true
    }, err => {
      this.toastService.show("Order Code Not Found !!", { classname: 'bg-danger text-light fs-5', delay: 2000 })
      this.display = false
      console.log(err)
    })
  }

}
