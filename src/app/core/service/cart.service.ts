import { Injectable } from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CartService {

  // totalItems: number = 0;
  cartTotal: Subject<number>  = new Subject<number>();
  constructor() { }
}
