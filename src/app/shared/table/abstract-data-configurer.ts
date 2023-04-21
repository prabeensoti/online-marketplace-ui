import {Observable} from 'rxjs';
import { Column, IColumn } from './table-model';
import { GenericFilterRequest, PageRequest, PageableResponse } from '@app/core/core.model';

export abstract class AbstractDataConfigurer<T> {

  protected constructor() {
  }

  abstract getColumns(): IColumn[];

  // abstract getRowOptions(): GridRowOption[];

  abstract getGridData(pageRequest: PageRequest): Observable<PageableResponse<Array<T>>>;

  abstract filterGridData(pageRequest: PageRequest, genericFilterRequest: GenericFilterRequest<T>): Observable<PageableResponse<T[]>>;

}
