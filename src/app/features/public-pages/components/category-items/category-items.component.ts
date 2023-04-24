import { Component, Input } from '@angular/core';
import { ProductCategoryDTO } from '@app/core/model/domain.model';

@Component({
  selector: 'app-category-items',
  templateUrl: './category-items.component.html',
  styleUrls: ['./category-items.component.scss']
})
export class CategoryItemsComponent {


  @Input() topCategories: ProductCategoryDTO[] = [
    {
      categoryId: 1,
      category: 'Books',
      fileUri: 'https://picsum.photos/3264/1836?random=3',
    },
    {
      categoryId: 2,
      category: 'Music',
      fileUri: 'https://picsum.photos/3264/1836?random=1',
    },
    {
      categoryId: 3,
      category: 'Movies',
      fileUri: 'https://picsum.photos/3264/1836?random=2',
    }
  ];


}
