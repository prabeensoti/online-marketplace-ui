import {
  ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, TemplateRef, ViewChild
} from '@angular/core';
import { get as _get,  cloneDeep as _cloneDeep, toNumber as _toNumber  } from 'lodash';
import { ColumnType, IColumn, SortDirection, SortEvent, TableStateEvent, TableUI } from './table-model';
import { PageChangedEvent } from './st-pagination/st-pagination.model';
import { Subject, debounceTime } from 'rxjs';
import { AbstractDataConfigurer } from './abstract-data-configurer';
import { GenericFilterRequest, PageRequest } from '@app/core/core.model';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  readonly ColumnType = ColumnType;

  @Input() title = '';
  // @Input() columns!: Column[];
  // @Input() dataList: Array<any> = [];
  // @Input() totalElements = 0; // Not required if "staticPagination = true"

  @Input() triggerRefresh: Subject<void> = new Subject<void>();
  @Input() dataGridConfigurer!: AbstractDataConfigurer<any>;

  // Optional Fields
  @Input() pageSize = 5;
  @Input() perPageOptions: number[] = [5, 20, 50];
  @Input() sortColumnName!: string;
  @Input() searchTemplate!: TemplateRef<any>;
  @Input() actionTemplate!: { [columnName: string]: TemplateRef<any> };
  @Input() showSerialNo: boolean = true;

  /**
   * with staticPagination = true: Performs Client side pagination, No dynamic data fetch required,
   * But Emtited values are still available
   * Pgination is done on the full "dataList" using slicing operation
   */
  @Input() staticPagination = false;

  // ===== Optional UI Display ===========
  @Input() tableUI: TableUI = new TableUI();
  // Pagination Fields. TODO: Create NgbNavigationConfig interface and populate pagination fields
  @Input() boundaryLinks = false; // false: first and last buttons will be hidden
  @Input() directionLinks = true; // false: previous and next buttons will be hidden

  // Output
  @Output() sort = new EventEmitter<SortEvent>();
  @Output() pageChange = new EventEmitter<number>();
  @Output() tableStateEvent = new EventEmitter<TableStateEvent>();
  // @Output() rowSelected: EventEmitter<OpDataEmit> = new EventEmitter<OpDataEmit>();

  sortColumn!: IColumn;
  currentPage = 1;
  sortDirection: SortDirection = 'asc';

  searchTerm!: any;
  @ViewChild('searchInput') searchInput!: ElementRef<HTMLInputElement>;

  isCaseSensitiveSearch = false;
  noDataColumnCount!: number;
  tempFullDataList: Array<any> = []; // temp full data list for "staticPagination"

  // state
  columns!: IColumn[];
  dataList: Array<any> = [];
  totalElements = 0; // Not required if "staticPagination = true"
  searchColumn!: IColumn;
  searchColumnPlaceholder = '';

  loading: boolean = true;
  hasError: boolean = false;


  constructor(private changeDetection: ChangeDetectorRef) {
  }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    this.columns = this.dataGridConfigurer.getColumns();
    this.initializeDefaultValues();
    this.onGridDataInit();
  }

  initializeDefaultValues(): void {
    // set defaults
    if (this.dataList === null || this.dataList === undefined) {
      this.dataList = [];
    }
    if (this.dataList.length <= 0) {
      const actionTemplateKeysCount = this.actionTemplate ? Object.keys(this.actionTemplate)?.length : 0;
      this.noDataColumnCount = this.columns?.length || 0 + actionTemplateKeysCount;
    }
    if (this.staticPagination) {
      this.tempFullDataList = _cloneDeep(this.dataList);
      this.totalElements = this.dataList.length;
    }
    if ((this.columns?.length > 0) && !(this.sortColumnName && this.sortColumnName.length > 0)) {
      this.sortColumn = this.columns[0];
      this.sortColumnName = this.columns[0].name;
    }
    this.changeDetection.detectChanges();
  }

  private onGridDataInit(): void {
    console.log('Grid Init triggered');
    this.dataGridConfigurer.getGridData(this.currPageFilter()).subscribe(res => {
      console.log('response received data and total count');
      this.dataList = res?.content;
      this.hasError = false;
      this.totalElements = res?.totalElements;
    }, error => {
      console.log('error ', error);
      this.hasError = true;
    });
    // let column: IColumn | undefined = this.columns.find((value) => {
    //   if (value.defaultSearch) {
    //     return value;
    //   }
    // });
    let column: IColumn | undefined;
    for (const value of this.columns) {
      if (value.defaultSearch) {
        column = value;
        break;
      }
    }
    if (!column) {
      column = this.columns[0];
    } else {
      this.searchColumn = column;
      this.searchColumnPlaceholder = 'Search by ' + column.label;
    }

    this.triggerRefresh.subscribe(value => {
      console.log('refreshing table');
      this.onFilter(this.generateFilterRequest());
    });
  }

  private currPageFilter(): PageRequest {
    console.log('current page ', this.currentPage);
    const pageRequest: PageRequest = {
      page: this.currentPage - 1,
      size: this.pageSize,
      sort: this.sortColumn.type == ColumnType.OBJECT ? this.sortColumn.bindKeys?.at(-1) || this.sortColumnName : this.sortColumn.name,
      direction: this.sortDirection
    };
    return pageRequest;
  }

  private onFilter(genericFilterRequest: GenericFilterRequest<any>): void {
    console.log('Data Filter triggered ', genericFilterRequest);
    this.dataGridConfigurer.filterGridData(this.currPageFilter(), genericFilterRequest)
      .subscribe(pageFilteredRes => {
        console.log('filtered response received - data and total count');
        this.dataList = pageFilteredRes?.content;
        this.hasError = false;
        this.totalElements = pageFilteredRes?.totalElements;
      }, error => {
        console.log('error ', error);
        this.hasError = true;
      });
  }

  private generateFilterRequest(): GenericFilterRequest<any> {
    const genericFilterRequest: GenericFilterRequest<any> = {
      searchText: this.searchTerm,
      dataFilter: {
        [this.searchColumn.name]: this.searchColumn.type === ColumnType.NUMBER ? _toNumber(this.searchTerm) : this.searchTerm,
      },
    };
    return genericFilterRequest;
  }

  onSortTriggered(sortEvent: SortEvent): void {
    // console.log('onSortTriggered ', sortEvent);
    if(sortEvent.column.disableSortable) {
      return;
    }
    this.sortColumn = sortEvent.column;
    this.sortColumnName = sortEvent.column.name;
    this.sortDirection = sortEvent.direction;
    if (this.staticPagination) {
      const dataList = this.dataList.sort((a: any, b: any) => this.compareForSort(a, b));
      this.dataList = this.sortDirection === 'asc' ? dataList : dataList.reverse();
    }
    this.sort.emit(sortEvent);
    this.prepareAndEmitTableStateEvent();
  }

  private compareForSort(a: any, b: any): number {
    const columnName = this.sortColumn.name;
    let firstColumnValue = a[columnName];
    let secondColumnValue = b[columnName];
    if (this.sortColumn.type === ColumnType.OBJECT) {
      firstColumnValue = this.getObjValueFromPath(a, this.sortColumn.bindKeys);
      secondColumnValue = this.getObjValueFromPath(b, this.sortColumn.bindKeys);
    }
    if (firstColumnValue === secondColumnValue) {
      return 0;
    }
    return firstColumnValue > secondColumnValue ? 1 : -1;
  }


  onPageChangeTriggered($event: PageChangedEvent): void {
    // console.log('onPageChangeTriggered ', this.currentPage);
    this.pageChange.emit(this.currentPage);
    this.prepareAndEmitTableStateEvent();
  }

  onPageSizeChange(): void {
    // console.log('onPageSizeChange ', this.pageSize);
    this.prepareAndEmitTableStateEvent();
  }

  private prepareAndEmitTableStateEvent(): void {
    const tableStateEvent: TableStateEvent = {
      sortEvent: { column: this.sortColumn, direction: this.sortDirection },
      pageNo: this.currentPage,
      pageSize: this.pageSize,
    };
    // console.log('emitting table state event ', tableStateEvent);
    this.changeDetection.detectChanges();
    this.tableStateEvent.emit(tableStateEvent);

    this.onFilter(this.generateFilterRequest());
  }

  onSearchInput($event: any): void {
    console.log('input search ', $event);
    this.currentPage = 1;
    this.onFilter(this.generateFilterRequest());
  }

  toggleCaseSensitive(): void {
    this.isCaseSensitiveSearch = !this.isCaseSensitiveSearch;
    this.offlineSearchInTable();
    this.searchInput?.nativeElement?.focus();
  }

  offlineSearchInTable(): void {
    if (this.searchTerm && this.searchTerm.length > 0) {
      const searchTerm = this.searchTerm;
      const filteredDataList = this.tempFullDataList.filter(obj => {
        // check if present in any object value
        let hasMatch = false;
        for (const column of this.columns) {
          let hasSearchTerm = false;
          if (column.type === ColumnType.OBJECT) {
            const value = this.getObjValueFromPath(obj, column.bindKeys || []) || '';
            hasSearchTerm = this.checkIfIncludesTerm(value, searchTerm);
          } else {
            const value = obj[column.name] || '';
            hasSearchTerm = this.checkIfIncludesTerm(value.toString(), searchTerm);
          }
          hasMatch = hasSearchTerm;
          if (hasMatch) {
            break;
          }
        }
        return hasMatch;
      });
      this.dataList = filteredDataList;
    } else {
      this.dataList = this.tempFullDataList;
    }
    this.changeDetection.detectChanges();
  }

  private checkIfIncludesTerm(value: string, term: string): boolean {
    if (this.isCaseSensitiveSearch) {
      return value.includes(term);
    }
    return value.toLowerCase().includes(term.toLowerCase());
  }

  getObjValueFromPath(object: any, path: Array<string> | undefined = []): string {
    return _get(object, path);
  }

}
