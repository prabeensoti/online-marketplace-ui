import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CredentialsService } from '@app/auth/services/credentials.service';
import { Utility } from '@app/core/constant/utility';
import { Constants } from '@app/core/core.constant';
import { AddressDto } from '@app/core/dto/address-dto';
import { CardInfoDto } from '@app/core/dto/card-info-dto';
import { OrderPayInfoDto } from '@app/core/dto/order-pay-info-dto';
import { OrderPayModel } from '@app/core/model/order-pay-model';
import { ShoppingCartDTO } from '@app/core/model/shopping-cart.model';
import { OrderPayService } from '@app/core/service/order-pay.service';
import { ShoppingCartService } from '@app/core/service/shopping-cart.service';
import { ToastService } from '@app/core/service/toast.service';
import {environment} from "@env/environment.prod";
import {AppRouteConstant} from "@app/core/constant/app-route-constant";

@Component({
  selector: 'app-checkout-page',
  templateUrl: './checkout-page.component.html',
  styleUrls: ['./checkout-page.component.scss']
})
export class CheckoutPageComponent implements OnInit {

  // items = [{ name: 'Apple', description: 'This is Steve Jobs', price: '$1200' }, { name: 'Dell', description: 'Brief description', price: '$8' }, { name: 'HP', description: 'Brief description', price: '$5' }];

  // promo = { name: 'My Promo code', code: 'EXAMPLECODE', discount: '$25' };

  // orderPayModel = new OrderPayModel();
  // countries!: string[];
  // states!: string[];

  createCheckoutPageForm!: FormGroup;
  shippingCost!: number;
  tax!: number;
  totalPrice!: number;
  loading!:boolean

  cardBrands = [
   {name: 'Master Card', val: Utility.MASTERCARD},
   {name: 'Visa', val: Utility.VISA},
   {name: 'Stripe', val: Utility.STRIPE}
  ];
  selectedCardBrand!: string;
  orderPayInfoDto = new OrderPayInfoDto();
  // addressDto = new AddressDto();
  // cardInfoDto = new CardInfoDto();
  shippingAddresses : AddressDto[] = [];

  cardInfos = [
    {'cardInfoId':0, 'cardNumber':'', 'nameOnCard':'', 'expYear':0, 'expMonth':0, 'cvc':'', 'cardBrand':'', 'addressType':''}
  ]
  selectedAddressId!: number;
  selectedCardInfos !: number;
  cartItems : ShoppingCartDTO[] = [];


  constructor(
    private activatedRoute: ActivatedRoute,
    // private location: Location,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private orderPayService: OrderPayService,
    private credentialsService: CredentialsService,
    private toastrService: ToastService,
    private shoppingCartService:ShoppingCartService
    ){

  }

  ngOnInit(): void {
    this.getShoppingCartsDetail();
    this.obtainOrderPayInfo(this.cartItems);
    this.checkoutPageFormBuilder();

    // this.stripeTest = this.formBuilder.group({
    //   name: ['', [Validators.required]]
    // });
    this.invokeStripe();
  }

  makePayment(amount: any) {
    const paymentHandler = (<any>window).StripeCheckout.configure({
      key: AppRouteConstant.STRIPE_KEY,
      locale: 'auto',
      token: function (stripeToken: any) {
        console.log(stripeToken.card);
        alert('Stripe token generated!');
      },
    });

    paymentHandler.open({
      name: 'Technical Adda',
      description: '4 Products Added',
      amount: amount * 100,
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

  getShoppingCartsDetail(){
    this.loading = false
    if(this.credentialsService.isAuthenticated()){
      this.shoppingCartService.getAllCartItems().subscribe({
        next:(res)=>{
          this.loading = false;
          this.cartItems = res;
        },
        error:(err)=>{
          console.log("Error",err);

        },
        complete:()=>{ }
      })
    } else{
      this.cartItems = JSON.parse(Constants.STORAGE_LOCATION.getItem(Constants.CART_ITEMS_KEY) || '[]');

    }
  }


  checkoutPageFormBuilder(){
    this.createCheckoutPageForm = this.formBuilder.group({
      userId:[''],
      quantity:['', [Validators.required]],
      price: ['', [Validators.required]],
      addressId: [''],
      address1: ['', [Validators.required]],
      address2: [''],
      city: ['', [Validators.required]],
      state: [''],
      zipCode: [''],
      country: [''],
      cardNumber: [''],
      nameOnCard: [''],
      securityCode: [''],
      expiryMonth: [''],
      expiryYear: [''],
      cardBrand: [''],
      fullName: ['', [Validators.required]]

    })
  }

  obtainOrderPayInfo(cartItems: ShoppingCartDTO[]) {

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
    let addressDto = new AddressDto();
    addressDto.addressId = 0;
    addressDto.address1 = 'Add New';
    this.shippingAddresses.push(addressDto);
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
      // address1: this.selectedAddressId,
      // address2: this.addressDto?.address2,
      // city: this.addressDto?.city,
      // state: this.addressDto?.state,
      // zipCode: this.addressDto?.zipCode,
      // country: this.addressDto?.country,
      // cardNumber: this.cardInfoDto?.cardNumber,
      // nameOnCard: this.cardInfoDto?.nameOnCard,
      // securityCode: this.cardInfoDto?.cvc,
      // expiryMonth: this.cardInfoDto?.expMonth,
      // expiryYear: this.cardInfoDto?.expYear,
      // cardBrand: this.selectedCardBrand,
      fullName: this.orderPayInfoDto?.fullName,
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
    console.log(this.createCheckoutPageForm.value);

    if(!this.validateAddress()){
      this.toastrService.show("Address required", { classname: 'bg-danger text-light fs-5', delay: 2000 });
      return;
    }

    // this.createCheckoutPageForm.addControl('shoppingCartDtos', this.formBuilder.group(this.cartItems));
    this.createCheckoutPageForm.addControl('isGuestUser', this.formBuilder.control(this.credentialsService.isAuthenticated()));
    console.log("=======###createOrderPayment####===========");
    var data = {...this.createCheckoutPageForm.value,shoppingCartDtos: this.cartItems};
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
    let addressId = this.createCheckoutPageForm.get('addressId')?.value;
    let address1 = this.createCheckoutPageForm.get('address1')?.value;
    let address2 = this.createCheckoutPageForm.get('address2')?.value;
    let zipCode = this.createCheckoutPageForm.get('zipCode')?.value;

    if(!addressId && (!(address1 || address2) && !zipCode) )
      return false;
    return true;
  }

}

