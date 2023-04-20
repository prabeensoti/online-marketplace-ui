import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Utility } from '@app/core/constant/utility';
import { OrderPayModel } from '@app/core/model/order-pay-model';
import { UserCardInfoModel } from '@app/core/model/user-card-info-model';
import { OrderPayService } from '@app/core/service/order-pay.service';
import { UserService } from '@app/core/service/user.service';

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
  cardBrands = [{name: 'Master Card', val: 'MASTERCARD'}, {name: 'Visa', val: 'VISA'}, {name: 'Stripe', val: 'STRIPE'}];
  selectedCardBrand!: string;
  userCardInfoModel = new UserCardInfoModel();

  constructor(
    private activatedRoute: ActivatedRoute,
    // private location: Location,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService,
    private orderPayService: OrderPayService){
  
  }

  ngOnInit(): void {
    
    this.obtainByUserId(1);
    this.checkoutPageFormBuilder();
    this.patchCreateCheckoutPageForm();

    this.shippingCost = Math.ceil(this.orderPayModel.price/50)*Utility.SHIPPING_CHARGE;
    this.tax = (Utility.TAX/100) * this.orderPayModel.price;
    this.totalPrice = this.orderPayModel.price + this.shippingCost + this.tax;
    // this.states = Utility.STATES;
    // this.countries = Utility.COUNTRIES;
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

  obtainByUserId(userId: number) {
    // this.orderPayModel = this.userService.testData();
    console.log(this.orderPayModel);
    
      this.userService.findInfoById(userId)
          .pipe()
          .subscribe(
              (resp) => {
                console.log("===============");
                console.log(resp);
                this.userCardInfoModel = resp;
              },
              (errorResp) => {  }
          );
  }

  patchCreateCheckoutPageForm(){
    this.createCheckoutPageForm.patchValue({
      userId: this.orderPayModel.userId,
      address: this.userCardInfoModel.addressModel,
      city: this.userCardInfoModel.addressModel.city,
      state: this.userCardInfoModel.addressModel.state,
      zipcode: this.userCardInfoModel.addressModel.zipcode,
      country: this.userCardInfoModel.addressModel.country,
      cardNumber: this.userCardInfoModel.cardInfoModel.cardNumber,
      nameOnCard: this.userCardInfoModel.cardInfoModel.nameOnCard,
      securityCode: this.userCardInfoModel.cardInfoModel.cvc,
      expiryMonth: this.userCardInfoModel.cardInfoModel.expMonth,
      expiryYear: this.userCardInfoModel.cardInfoModel.expYear,
      cardBrand: this.userCardInfoModel.cardInfoModel.cardBrand,
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
