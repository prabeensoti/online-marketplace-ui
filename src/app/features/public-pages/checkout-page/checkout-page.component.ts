import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '@app/core/services/user.service';
import { Utility } from '@app/core/constants/utility';
import { OrderPayService } from '@app/core/services/order-pay.service';
import { OrderPayModel } from '@app/core/model/order-pay-model';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-checkout-page',
  templateUrl: './checkout-page.component.html',
  styleUrls: ['./checkout-page.component.scss']
})
export class CheckoutPageComponent implements OnInit {

  // items = [{ name: 'Apple', description: 'This is Steve Jobs', price: '$1200' }, { name: 'Dell', description: 'Brief description', price: '$8' }, { name: 'HP', description: 'Brief description', price: '$5' }];

  // promo = { name: 'My Promo code', code: 'EXAMPLECODE', discount: '$25' };

  orderPayModel = new OrderPayModel(); 
  createCheckoutPageForm!: FormGroup;
  shippingCost!: number;
  tax!: number;
  totalPrice!: number;

  countries!: string[];
  states!: string[];
  userPresent = false;
  cardBrands = [{name: 'Master Card'}, {name: 'Visa'}, {name: 'Stripe'}];
  selectedCardBrand!: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    // private location: Location,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService,
    private orderPayService: OrderPayService){

     let userId =   this.route.snapshot.params;
     console.log(userId);

     console.log("#######################");
     
     
   
  }

  ngOnInit(): void {
    
    this.obtainById(1);
    this.checkoutPageFormBuilder();
    this.patchCreateCheckoutPageForm();

    this.shippingCost = Math.ceil(this.orderPayModel.price/50)*Utility.SHIPPING_CHARGE;
    this.tax = Utility.TAX * this.orderPayModel.price;
    this.totalPrice = this.orderPayModel.price + this.shippingCost + this.tax;
    this.states = Utility.STATES;
    this.countries = Utility.COUNTRIES;
  }

  checkoutPageFormBuilder(){
    this.createCheckoutPageForm = this.formBuilder.group({
      userId:[''],
      address: ['', [Validators.required]],
      city: ['', [Validators.required]],
      state: [''],
      zipcode: [''],
      country: [''],
      cardNumber: [''],
      nameOnCard: [''],
      securityCode: [''],
      expiryMonth: [''],
      expiryYear: [''],
      cardBrand: [''],
      quantity:['', [Validators.required]],
      price: ['', [Validators.required]],
      fullName: ['', [Validators.required]]

    })
  }

  obtainById(userId: number) {
    this.orderPayModel = this.userService.testData();

    console.log(this.orderPayModel);
    
    //   this.userService.findById(userId)
    //       .pipe()
    //       .subscribe(
    //           (resp) => {
    //               this.orderPayModel = this.userService.testData();
    //           },
    //           (errorResp) => {  }
    //       );
  }

  patchCreateCheckoutPageForm(){
    this.createCheckoutPageForm.patchValue({
      userId: this.orderPayModel.userId,
      address: this.orderPayModel.address,
      city: this.orderPayModel.city,
      state: this.orderPayModel.state,
      zipcode: this.orderPayModel.zipcode,
      country: this.orderPayModel.country,
      cardNumber: this.orderPayModel.cardNumber,
      nameOnCard: this.orderPayModel.nameOnCard,
      securityCode: this.orderPayModel.securityCode,
      expiryMonth: this.orderPayModel.expiryMonth,
      expiryYear: this.orderPayModel.expiryYear,
      cardBrand: this.orderPayModel.cardBrand,
      quantity: this.orderPayModel.quantity,
      price: this.orderPayModel.price,
      fullName: this.orderPayModel.fullName,
    })
    this.userPresent = true;
  }

  reset() {
    // this.buttonPressed = false;
  }

  activeRadio(name: string) {
    this.selectedCardBrand = name;
    
  }

  createOrderPayment(){
    this.orderPayService.createOrderPay(this.createCheckoutPageForm.value)
            .pipe()
            .subscribe(
                (resp) => {
                    // this.router.navigate(['/admin']);
                },
                (error) => { console.log(error);}
            );

  }

}
