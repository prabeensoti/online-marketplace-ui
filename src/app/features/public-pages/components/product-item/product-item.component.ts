import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { PageRequest } from '@app/core/core.model';
import { ProductDTO } from '@app/core/model/domain.model';
import { ProductService } from '@app/core/service/product.service';

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
    // {
    //   name: 'Product 2',
    //   description: 'This is the second product',
    //   price: 29.99,
    //   image: 'https://picsum.photos/3264/1836?random=5',
    //   link: 'https://example.com/products/2'
    // },
    // {
    //   name: 'Product 3',
    //   description: 'This is the third product',
    //   price: 39.99,
    //   image: 'https://picsum.photos/3264/1836?random=6',
    //   link: 'https://example.com/products/3'
    // },
    // {
    //   name: 'Product 4',
    //   description: 'This is the second product',
    //   price: 29.99,
    //   image: 'https://picsum.photos/3264/1836?random=7',
    //   link: 'https://example.com/products/2'
    // },
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
  ]

  constructor(private productService: ProductService) { }

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

  onAddToCartClick(id: number) {
    alert(id)
  }


}
