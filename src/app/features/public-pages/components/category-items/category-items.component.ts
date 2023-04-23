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
      image: 'https://images.pexels.com/photos/5886041/pexels-photo-5886041.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=2&amp;h=650&amp;w=940',
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
