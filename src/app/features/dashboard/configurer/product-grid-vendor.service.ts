import { Injectable } from '@angular/core';
import { ProductDTO } from '@app/core/model/domain.model';
import { AbstractDataConfigurer } from '@app/shared/table/abstract-data-configurer';
import { Column, ColumnType, IColumn } from '@app/shared/table/table-model';
import { ProductService } from '@app/core/service/product.service';
import { GenericFilterRequest, PageRequest, PageableResponse } from '@app/core/core.model';
import { Observable } from 'rxjs';

export const MANAGE_PRODUCTS_COLUMN: IColumn[] = [
  { id: 1, name: 'productId', label: 'Product Id', type: ColumnType.NUMBER, hide: true },
  { id: 2, name: 'name', label: 'Product Name', type: ColumnType.STRING,  defaultSearch: true},
  // { id: 3, name: 'description', label: 'Description', type: ColumnType.STRING, cssClasses: 'w-10' },
  { id: 4, name: 'quantity', label: 'Quantity', type: ColumnType.NUMBER },
  { id: 2, name: 'isVerified', label: 'Is Verified', type: ColumnType.BOOLEAN },
  { id: 7, name: 'vendor', label: 'Vendor', type: ColumnType.OBJECT, bindKeys: ['vendor', 'vendorName'] },
  { id: 8, name: 'productCategory', label: 'Category', type: ColumnType.OBJECT, bindKeys: ['productCategory', 'category'] },
];

@Injectable({
  providedIn: 'root'
})
export class ProductGridVendorService extends AbstractDataConfigurer<ProductDTO> {

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
    return this.productService.getAllPublishedAndTempProductsOfVendor(pageRequest);
  }

  filterGridData(pageRequest: PageRequest, genericFilterRequest: GenericFilterRequest<ProductDTO>): Observable<PageableResponse<Array<ProductDTO>>> {
    return this.productService.filterForAllPublishedAndTempProducts(pageRequest, genericFilterRequest);
    return this.getGridData(pageRequest);
  }

}
