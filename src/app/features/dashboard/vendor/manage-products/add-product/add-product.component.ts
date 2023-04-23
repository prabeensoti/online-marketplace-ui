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
  private selectedFiles!: FileList;
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
        console.log(res);
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
        categoryId: [, [Validators.required]]
      });
  }

  get formControls(): { [p: string]: AbstractControl } {
    return this.productForm.controls;
  }


  saveProduct() {
    const formValue = this.productForm.value
    console.log(formValue)
    const product: ProductModel = {
      productId: 0,
      categoryId: formValue.categoryId,
      name: formValue.name,
      description: formValue.description,
      quantity: formValue.quantity,
      price: formValue.price,
      images: this.selectedFiles
    }

    this.productService.saveProduct(product).subscribe(next => {
      this.toastService.show('Product Added Successfully!!!')
    }, err => {

    })

  }
  onFileSelected(files: any) {
    this.selectedFiles = files.target.files;
  }
}
