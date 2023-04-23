import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CredentialsService } from '@app/auth/services/credentials.service';
import { Utility } from '@app/core/constant/utility';
import { Constants } from '@app/core/core.constant';
import { AddressDto } from '@app/core/dto/address-dto';
import { CardInfoDto } from '@app/core/dto/card-info-dto';
import { OrderPayInfoDto } from '@app/core/dto/order-pay-info-dto';
import { ShoppingCartDTO } from '@app/core/model/shopping-cart.model';
import { OrderPayService } from '@app/core/service/order-pay.service';
import { ShoppingCartService } from '@app/core/service/shopping-cart.service';
import { ToastService } from '@app/core/service/toast.service';
import {AppRouteConstant} from "@app/core/constant/app-route-constant";
import { SessionModel } from '@app/core/model/session-model';

@Component({
  selector: 'app-checkout-page',
  templateUrl: './checkout-page.component.html',
  styleUrls: ['./checkout-page.component.scss']
})
export class CheckoutPageComponent implements OnInit {

  createCheckoutPageForm!: FormGroup;
  shippingCost!: number;
  tax!: number;
  totalPrice!: number;
  loading!:boolean
  isGuestUser = true;

  cardBrands = [
   {name: 'Master Card', val: Utility.MASTERCARD},
   {name: 'Visa', val: Utility.VISA},
   {name: 'Stripe', val: Utility.STRIPE}
  ];
  selectedCardBrand!: string;
  orderPayInfoDto = new OrderPayInfoDto();
  addressDto = new AddressDto();
  shippingAddresses : AddressDto[] = [];

  cardInfos = [
    {'cardInfoId':0, 'cardNumber':'', 'nameOnCard':'', 'expYear':0, 'expMonth':0, 'cvc':'', 'cardBrand':'', 'addressType':''}
  ]
  selectedAddressId!: number;
  selectedCardInfos !: number;
  cartItems : ShoppingCartDTO[] = [];

  stripe!: any;
  session!: SessionModel;
  sToken !: any;


  constructor(
    private fb: FormBuilder,
    private orderPayService: OrderPayService,
    private credentialsService: CredentialsService,
    private toastrService: ToastService,
    private shoppingCartService:ShoppingCartService
    ){

  }

  ngOnInit(): void {
    if(this.credentialsService.isAuthenticated()) 
      this.isGuestUser=false;

    this.findShoppingCartsDetail();   
    this.checkoutPageFormBuilder();

    this.invokeStripe();
  }

  confirmPayment() {   
    if(!this.totalPrice){
      this.toastrService.show("No calculation done!", { classname: 'bg-danger text-light fs-5', delay: 2000 });
      return;
    }
    this.doPayment();
  }

  doPayment(){
    const paymentHandler = (<any>window).StripeCheckout
      .configure({
        key: AppRouteConstant.STRIPE_KEY,
        image: 'https://stripe.com/img/documentation/checkout/marketplace.png',
        locale: 'auto',
        currency: 'usd',
        billingAddress: true,
        shippingAddress: true,
        zipCode: true,
        token: function (this:any, token: any) {    
          alert('Stripe token generated!');
          this.sToken = token.card;      
          console.log(this.sToken);
          this.createOrderPayment();
      }.bind(this),
    });

    paymentHandler.open({
      name: 'Payment Method',
      description: this.orderPayInfoDto.quantity +' Products Added',
      amount: this.totalPrice * 100
    });

  }

  invokeStripe() {
    if (!window.document.getElementById('stripe-script')) {
      const script = window.document.createElement('script');
      script.id = 'stripe-script';
      script.type = 'text/javascript';
      script.src = 'https://checkout.stripe.com/checkout.js';
      window.document.body.appendChild(script);
    }
  }

  findShoppingCartsDetail(){
  this.loading = false
  if(!this.isGuestUser){
    this.shoppingCartService.getAllCartItems().subscribe({
      next:(res)=>{
        this.loading = false;
        this.cartItems = res;
      },
      error:(err)=>{
        console.log("Error",err);
      },
      complete:()=>{ this.findOrderPayInfo(this.cartItems);}
    })
  } else{
    this.cartItems = JSON.parse(Constants.STORAGE_LOCATION.getItem(Constants.CART_ITEMS_KEY) || '[]');
    this.findOrderPayInfo(this.cartItems);
  }   
  
}

checkoutPageFormBuilder(){
  this.createCheckoutPageForm = this.fb.group({
    // userId:[''],
    quantity:['', [Validators.required]],
    price: ['', [Validators.required]],
    // addressId: [''],
    // address1: ['', [Validators.required]],
    // address2: [''],
    // city: ['', [Validators.required]],
    // state: [''],
    // zipCode: [''],
    // country: [''],
    // cardNumber: [''],
    // nameOnCard: [''],
    // securityCode: [''],
    // expiryMonth: [''],
    // expiryYear: [''],
    // cardBrand: [''],
    // fullName: ['', [Validators.required]]

  })
}

findOrderPayInfo(cartItems: ShoppingCartDTO[]) {

    this.orderPayService.findOrderPayInfo(cartItems)
        .pipe()
        .subscribe({
          next: (resp) => {
            this.orderPayInfoDto = resp;

            this.getShippingAddresses();
            this.getCardInfos();
            this.calculatePrice();
            this.patchCreateCheckoutPageForm();

      },
      error: (error) => { console.log(error);}
    });

}

getShippingAddresses(){
  this.orderPayInfoDto?.addressDtos?.forEach(list => {
    this.shippingAddresses.push(new AddressDto().add(list));
  });  
  this.setNewAddress();
}

setNewAddress(){
  this.addressDto.addressId = 0;
  this.addressDto.address1 = 'Add New';
  this.shippingAddresses.push(this.addressDto);
}

getCardInfos(){
  this.orderPayInfoDto?.cardInfoDtos?.forEach(list => {
    this.cardInfos.push(new CardInfoDto().add(list));
  })
}

calculatePrice(){
  this.shippingCost = Math.ceil(this.orderPayInfoDto.price/50)*Utility.SHIPPING_CHARGE;
  this.tax = (Utility.TAX/100) * this.orderPayInfoDto.price;
  this.totalPrice = this.orderPayInfoDto.price + this.shippingCost + this.tax;
}


patchCreateCheckoutPageForm(){
  this.createCheckoutPageForm.patchValue({
    userId: this.orderPayInfoDto.userId,
    quantity: this.orderPayInfoDto?.quantity,
    price: this.orderPayInfoDto?.price,
  })
}

reset() {
  // this.buttonPressed = false;
}

activeShippingAddress(val:number){
  this.selectedAddressId = val;
}

activeRadio(val: string) {
  this.selectedCardBrand = val;
}

createOrderPayment(){
  console.log("--------- setOrderPay -----------");
  this.setUserDetails();

  if(!this.validateAddress()){
    this.toastrService.show("Address required", { classname: 'bg-danger text-light fs-5', delay: 2000 });
    return;
  }
  this.saveOrderPayment();

}

setUserDetails(){
  this.createCheckoutPageForm.addControl('fullName', this.fb.control(this.sToken.name));
  this.createCheckoutPageForm.addControl('email', this.fb.control(this.sToken.email));
  this.createCheckoutPageForm.addControl('isGuestUser', this.fb.control(this.isGuestUser));
  this.createCheckoutPageForm.addControl('cardId', this.fb.control(this.sToken.id));
  this.createCheckoutPageForm.addControl('clientIp', this.fb.control(this.sToken.client_ip));

  this.createCheckoutPageForm.addControl('cardInfoDto', this.fb.group({
    cardNumber: this.sToken.address_city, 
    nameOnCard: this.sToken.name,
    expYear: this.sToken.exp_year, 
    expMonth: this.sToken.exp_month,
    cvc: this.sToken.address_line2,
    cardBrand: this.sToken.brand,
  }));
  
  this.createCheckoutPageForm.addControl('addressDto', this.fb.group({
    city: this.sToken.address_city, 
    state: this.sToken.address_state,
    zipCode: this.sToken.address_zip, 
    address1: this.sToken.address_line1,
    address2: this.sToken.address_line2,
    country: this.sToken.address_country,
  }));

}

saveOrderPayment(){
  var data = {...this.createCheckoutPageForm.value,shoppingCartDtos: this.cartItems};

  console.log("=====saveOrderPayment ====");
  console.log(data);    
  
  this.orderPayService.createOrderPay(data)
    .pipe()
    .subscribe({ next: (resp) => {
          console.log(" ::::::::::::: ");
          console.log(resp);

        },
        error: (error) => { console.log(error);}
      });

}

validateAddress(){
  let address1 = this.createCheckoutPageForm.get('addressDto')?.get('address1')?.value;
  let address2 = this.createCheckoutPageForm.get('addressDto')?.get('address2')?.value;
  let zipCode = this.createCheckoutPageForm.get('addressDto')?.get('zipCode')?.value;
  let city = this.createCheckoutPageForm.get('addressDto')?.get('city')?.value;
  if(!(address1 || address2) && !zipCode && !city) 
    return false;
  return true;
}

}

