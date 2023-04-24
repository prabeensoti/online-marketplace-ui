import { Component, OnInit } from '@angular/core';
import { ProductCategoryDTO, ProductDTO } from '@app/core/model/domain.model';
import { CategoryService } from '@app/core/service/category.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  allItemsFetched: boolean = false;


  topCategories: ProductCategoryDTO[] = [
    {
      categoryId: 1,
      category: 'Books',
      imageUrl: 'https://picsum.photos/3264/1836?random=3',
    },
    {
      categoryId: 2,
      category: 'Music',
      imageUrl: 'https://picsum.photos/3264/1836?random=1',
    },
    {
      categoryId: 3,
      category: 'Movies',
      imageUrl: 'https://picsum.photos/3264/1836?random=2',
    }
  ];


  constructor(private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.initTopCategories();
  }

  // onReload(): void {
  //   window.location.reload();
  // }

  private initTopCategories(): void {
    this.categoryService.getTopCategories().subscribe({
      next: (res) => {
        this.topCategories = res;

      }, error: (err) => {
        console.log("error ", err);
      }
    })
  }

}
