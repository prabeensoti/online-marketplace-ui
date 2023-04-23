import { Injectable } from '@angular/core';
import { ProductDTO } from '@app/core/model/domain.model';
import { AbstractDataConfigurer } from '@app/shared/table/abstract-data-configurer';
import { Column, ColumnType, IColumn } from '@app/shared/table/table-model';
import { ProductService } from '@app/core/service/product.service';
import { GenericFilterRequest, PageRequest, PageableResponse } from '@app/core/core.model';
import {Observable, of} from 'rxjs';

export const MANAGE_PRODUCTS_COLUMN: IColumn[] = [
  { id: 2, name: 'name', label: 'Product Name', type: ColumnType.STRING },
  { id: 1, name: 'productId', label: 'Product Id', type: ColumnType.NUMBER, defaultSearch: true },
  // { id: 3, name: 'description', label: 'Description', type: ColumnType.STRING, cssClasses: 'w-10' },
  { id: 4, name: 'quantity', label: 'Quantity', type: ColumnType.NUMBER },
  { id: 7, name: 'vendor', label: 'Vendor', type: ColumnType.OBJECT, bindKeys: ['vendor', 'vendorName'] },
  { id: 7, name: 'vendor', label: 'Vendor Id', type: ColumnType.OBJECT, bindKeys: ['vendor', 'vendorId'] },
  { id: 8, name: 'productCategory', label: 'Category', type: ColumnType.OBJECT, bindKeys: ['productCategory', 'category'] },
];

@Injectable({
  providedIn: 'root'
})
export class ProductGridAdminService extends AbstractDataConfigurer<ProductDTO> {

  displayColumns: IColumn[] = MANAGE_PRODUCTS_COLUMN;

  constructor(private productService: ProductService) {
    super();
  }

  setDisplayColumns(columns: IColumn[]): void {
    this.displayColumns = columns;
  }

  getColumns(): IColumn[] {
    return this.displayColumns;
  }

  getGridData(pageRequest: PageRequest): Observable<PageableResponse<Array<ProductDTO>>> {
    return this.productService.getAllPublishedAndTempProducts(pageRequest);
  }

  filterGridData(pageRequest: PageRequest, genericFilterRequest: GenericFilterRequest<ProductDTO>): Observable<PageableResponse<Array<ProductDTO>>> {
    // return this.productService.filterProducts(pageRequest, genericFilterRequest);
    // return of({} as PageableResponse<Array<ProductDTO>>);
    return this.productService.filterForAllPublishedAndTempProducts(pageRequest, genericFilterRequest);
  }

}
