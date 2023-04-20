import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryContext } from '@app/auth/auth.model';
import { CategoryService } from '@app/core/service/category.service';
import { ToastService } from '@app/core/service/toast.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  categForm!: FormGroup;

  loading: boolean = false;
  hasError: boolean = false;
  responseMessage: string = '';
  isSubmitted = false;

  constructor(private formBuilder: FormBuilder,
    private categoryService: CategoryService,
    private toastService: ToastService) { }

  ngOnInit(): void {
    this.initializeCategoryForm();
  }

  initializeCategoryForm(): void {
    this.categForm = this.formBuilder.group({
      category: ['',[Validators.required]],
    });
  }

  get formControls(): { [p: string]: AbstractControl } {
    return this.categForm.controls;
  }

  saveCategory(): void {
    this.isSubmitted = true;
    if (this.categForm.invalid) {
      return;
    }
    this.loading = true;
    this.hasError = false;
    this.responseMessage = '';
    

    const formValue = this.categForm.value;

    const category : CategoryContext = {
      category: formValue.category,
    }
    console.log(category);
    
    this.categoryService.saveCategory(category).subscribe( response => {
      
      this.loading = false;
      this.hasError = false;
      this.responseMessage = 'Category Added Successful.';
      this.isSubmitted = false;
      this.categForm.reset();
      console.log('category response ', response);
      this.toastService.show('Category Added Successful.', 'Success');
    }, error => {
      this.loading = false;
      this.hasError = true;
      this.responseMessage = error?.error?.response || 'Sorry! Something went wrong !!!';
    });
  }
  
}

