import { Component, OnInit } from '@angular/core';
import { APP_UI_ROUTES } from '@app/core/route.util';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ToastService} from "@app/core/service/toast.service";
import {ProductService} from "@app/core/service/product.service";
import {ProductCategoryDTO, ProductDTO, VendorDTO} from "@app/core/model/domain.model";
import {ProductModel} from "@app/core/model/product.model";
import {CategoryService} from "@app/core/service/category.service";

@Component({
  selector: 'app-add-product',
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
        console.log(res);
        this.categories = res;
      }, error: (err) => {

      }
    })
  }

  initializeProductForm(): void {
    this.productForm = this.formBuilder.group({
      name: ['',[Validators.required]],
      description: ['', [Validators.required]],
      quantity: ['', [Validators.required]],
      price: ['', [Validators.required]],
      categoryId: ['', [Validators.required]],
      images: ['', [Validators.required]]
    });
  }

  get formControls(): { [p: string]: AbstractControl } {
    return this.productForm.controls;
  }

  saveProduct() {
    console.log('Save Product Button Clicked!!')
    const formValue = this.productForm.value
    console.log(formValue)
    const product: ProductModel = {
      categoryId: formValue.categoryId,
      vendorId: 1,
      name: formValue.name,
      description: formValue.description,
      quantity: formValue.quantity,
      price: formValue.price,
      isVerified: false,
      isDeleted: false,
      images: formValue.images,
    }

    this.productService.saveProduct(product).subscribe(response => {

      console.log('Response : ', response);
      this.toastService.show('Product Added Successfully!!!')
    }, err => {

    })

  }

}
