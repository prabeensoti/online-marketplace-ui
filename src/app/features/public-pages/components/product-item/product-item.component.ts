import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CredentialsService } from '@app/auth/services/credentials.service';
import { Constants } from '@app/core/core.constant';
import { PageRequest } from '@app/core/core.model';
import { ProductDTO } from '@app/core/model/domain.model';
import { ProductService } from '@app/core/service/product.service';
import { ShoppingCartService } from '@app/core/service/shopping-cart.service';
import { ToastService } from '@app/core/service/toast.service';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent implements OnChanges {


  @Input() categoryId!: number;


  topProducts: ProductDTO[] = [
    {
      productId: 1,
      name: 'Product 1',
      description: 'This is the first product',
      quantity: 1,
      price: 19.99,
      images: [
        {
          fileId: 1,
          fileUri: 'https://picsum.photos/3264/1836?random=4'
        }
      ],
      isVerified: true,
      isDeleted: true,
      productCategory: { category: 'elec', categoryId: 1 }
    },
    {
      productId: 2,
      name: 'Product 2',
      description: 'This is the second product',
      quantity: 1,
      price: 19.99,
      images: [
        {
          fileId: 2,
          fileUri: 'https://picsum.photos/3264/1836?random=5'
        }
      ],
      isVerified: true,
      isDeleted: true,
      productCategory: { category: 'elec', categoryId: 1 }
    },
    {
      productId: 3,
      name: 'Product 3',
      description: 'This is the third product',
      quantity: 1,
      price: 19.99,
      images: [
        {
          fileId: 2,
          fileUri: 'https://picsum.photos/3264/1836?random=6'
        }
      ],
      isVerified: true,
      isDeleted: true,
      productCategory: { category: 'elec', categoryId: 1 }
    },{
      productId: 4,
      name: 'Product 4',
      description: 'This is the forth product',
      quantity: 1,
      price: 19.99,
      images: [
        {
          fileId: 2,
          fileUri: 'https://picsum.photos/3264/1836?random=7'
        }
      ],
      isVerified: true,
      isDeleted: true,
      productCategory: { category: 'elec', categoryId: 1 }
    },
    // {
    //   name: 'Product 5',
    //   description: 'This is the third product',
    //   price: 39.99,
    //   image: 'https://picsum.photos/3264/1836?random=8',
    //   link: 'https://example.com/products/3'
    // },
    // {
    //   name: 'Product 6',
    //   description: 'This is the third product',
    //   price: 39.99,
    //   image: 'https://picsum.photos/3264/1836?random=9',
    //   link: 'https://example.com/products/3'
    // }
  ];

  loading: boolean = false;

  constructor(private credentialsService: CredentialsService, private productService: ProductService,
    private shoppingCartService: ShoppingCartService,
    private toastService: ToastService) { }

  ngOnChanges(changes: SimpleChanges): void {
    this.fetchProductsByCategory();
  }

  ngOnInit(): void {
  }

  fetchProductsByCategory(): void {
    const pageRequest: PageRequest = { page: 0, size: 4, sort: 'productId', direction: 'asc' };
    const categoryId: number = this.categoryId;
    this.productService.getAllTopPublishedProductsByCategory(pageRequest, categoryId).subscribe({
      next: (res) => {
        this.topProducts = res.content;
      }, error: (err) => {
        console.log("error ", err);
      }
    });
  }

  onAddToCartClick(product:ProductDTO) {
    this.loading = true;
    if(this.credentialsService.isAuthenticated()){
      //use loggedIn // first remove from localStorage
      sessionStorage.removeItem(Constants.CART_ITEMS_KEY);
      this.shoppingCartService.addItemToCart(product.productId, 1).subscribe({
        next:(res) => {
          this.toastService.show("Product Added To Cart", { classname: 'bg-success text-light fs-5', delay: 2000 });
        },
        error:(err) => {
          console.log("Error on remove cart",err)
          this.loading = false;
          this.toastService.show(err.error.status+" "+err.error.message, { classname: 'bg-danger text-light fs-5', delay: 2000 });
        },
        complete:() => {
          this.loading = false
        }
      })


    } else {
      //user not loggedIN
        this.shoppingCartService.addItemToCartLocal(product, true)
      this.loading = false
        this.toastService.show("Product Added To Cart", { classname: 'bg-success text-light fs-5', delay: 2000 });
    }
  }


}
