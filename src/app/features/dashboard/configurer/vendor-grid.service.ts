import { Injectable } from '@angular/core';
import { GenericFilterRequest, PageRequest, PageableResponse } from '@app/core/core.model';
import { VendorDTO } from '@app/core/model/domain.model';
import { VendorService } from '@app/core/service/vendor.service';
import { AbstractDataConfigurer } from '@app/shared/table/abstract-data-configurer';
import { ColumnType, IColumn } from '@app/shared/table/table-model';
import { Observable } from 'rxjs';

export const MANAGE_VENDORS_COLUMN: IColumn[] = [
  { id: 2, name: 'vendorName', label: 'Vendor name', type: ColumnType.STRING},
  { id: 1, name: 'vendorId', label: 'Vendor Id', type: ColumnType.NUMBER, defaultSearch: true },
  { id: 2, name: 'description', label: 'Vendor description', type: ColumnType.STRING },
  // { id: 2, name: 'isVerified', label: 'Is Verified', type: ColumnType.BOOLEAN },
  { id: 7, name: 'user', label: 'Vendor Full Name', type: ColumnType.OBJECT, bindKeys: ['user', 'fullName'] },
];

@Injectable({
  providedIn: 'root'
})
export class VendorGridService extends AbstractDataConfigurer<VendorDTO> {

  displayColumns: IColumn[] = MANAGE_VENDORS_COLUMN;

  constructor(private vendorService: VendorService) {
    super();
  }

  setDisplayColumns(columns: IColumn[]): void {
    this.displayColumns = columns;
  }

  getColumns(): IColumn[] {
    return this.displayColumns;
  }

  getGridData(pageRequest: PageRequest): Observable<PageableResponse<Array<VendorDTO>>> {
    return this.vendorService.getAllVendors(pageRequest);
  }

  filterGridData(pageRequest: PageRequest, genericFilterRequest: GenericFilterRequest<VendorDTO>): Observable<PageableResponse<Array<VendorDTO>>> {
    return this.vendorService.filterVendors(pageRequest, genericFilterRequest);
  }
}
