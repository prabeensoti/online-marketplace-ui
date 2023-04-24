import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ToastService} from "@app/core/service/toast.service";
import {ProductService} from "@app/core/service/product.service";
import {ProductCategoryDTO} from "@app/core/model/domain.model";
import {ProductModel} from "@app/core/model/product.model";
import {CategoryService} from "@app/core/service/category.service";

@Component({
  selector: 'app-add-edit-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit{
  productForm!:FormGroup;

  loading: boolean = false;
  hasError: boolean = false;
  responseMessage: string = '';
  isSubmitted = false;

  categories: ProductCategoryDTO[] = [];
  product!: ProductModel;
  files: File[] | undefined;

  constructor(private formBuilder: FormBuilder,
              private toastService: ToastService,
              private productService: ProductService,
              private categoryService: CategoryService) {
  }

  ngOnInit(): void {
    this.initializeProductForm();
    this.fetchAllCategories();
  }

  fetchAllCategories(): void {
    this.categoryService.getAllCategories().subscribe({
      next: (res) => {
        this.categories = res;
      }, error: (err) => {

      }
    })
  }

  initializeProductForm(): void {
      this.productForm = this.formBuilder.group({
        productId:[0],
        name: ['',[Validators.required]],
        description: ['', [Validators.required]],
        quantity: [, [Validators.required]],
        price: [, [Validators.required]],
        categoryId: [, [Validators.required]],
        files:[,[Validators.required]]
      });
  }

  get formControls(): { [p: string]: AbstractControl } {
    return this.productForm.controls;
  }


  saveProduct() {
    const formValue = this.productForm.value
    const product: ProductModel = {
      images: undefined,
      productId: formValue.productId,
      categoryId: formValue.categoryId,
      name: formValue.name,
      description: formValue.description,
      quantity: formValue.quantity,
      price: formValue.price
    }
    const productData = new FormData();
    if(this.files)
    for (const file of this.files) {
      productData.append('files', file);
    }
    productData.append('product', JSON.stringify(product));
    this.productService.saveProduct(productData).subscribe({
      next: (res) => {
        this.initializeProductForm();
        this.toastService.show('Product Added Successfully!!!',{ classname: 'bg-success text-light fs-5', delay: 2000 })
    }, error: (err) => {
        this.toastService.show(err.error.status+" "+err.error.message, { classname: 'bg-danger text-light fs-5', delay: 2000 });
    }});

  }
  onFileSelected(files: any) {
    this.files = files.target.files;
  }
}
