import {Directive, EventEmitter, HostBinding, HostListener, Input, Output} from '@angular/core';
import { Column, IColumn, SortDirection, SortEvent, SortRotation } from '../table-model';

@Directive({
  selector: 'th[libStColumnSort]'
})
export class StColumnSortDirective {

  @Input() column!: IColumn;
  @Input() direction: SortDirection = 'asc';
  @Output() sort = new EventEmitter<SortEvent>();

  @HostBinding('class.asc') get isAscending(): boolean {
    return this.direction === 'asc';
  }

  @HostBinding('class.desc') get isDescending(): boolean {
    return this.direction === 'desc';
  }

  @HostListener('click') rotate(): any {
    this.direction = SortRotation[this.direction];
    const sortEvent: SortEvent = {column: this.column, direction: this.direction};
    this.sort.emit(sortEvent);
  }

}
