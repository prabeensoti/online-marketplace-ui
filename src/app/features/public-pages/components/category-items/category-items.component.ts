import { Component } from '@angular/core';

@Component({
  selector: 'app-category-items',
  templateUrl: './category-items.component.html',
  styleUrls: ['./category-items.component.scss']
})
export class CategoryItemsComponent {
  categories = [
    {
      name: 'Books',
      image: 'https://picsum.photos/3264/1836?random=3',
      link: '/books'
    },
    {
      name: 'Music',
      image: 'https://picsum.photos/3264/1836?random=1',
      link: '/music'
    },
    {
      name: 'Movies',
      image: 'https://picsum.photos/3264/1836?random=2',
      link: '/movies'
    }
  ];





}
