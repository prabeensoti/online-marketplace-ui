// export interface Column {
//   name: string;
//   label: string;
//   type: 'string' | 'number' | 'date' | 'object';
//   sortable?: boolean;
//   filterable?: boolean;
//   objectBind?: ColumnBindObject;
//   defaultSearch?: boolean;
//   hide?: boolean;
// }

// export  interface ColumnBindObject {
//   nameBind: string;
//   type: 'string' | 'fixedLink' | 'object';
//   bindValue?: any;
//   linkType: 'internal' | 'external' | 'api';
//   apiLinkValue?: string;
//   apiLinkBind?: string;
//   fixedLinkValue?: string;
//   apiFixedLinkBind?: string;
//   disable?: boolean;
// }

// export interface GridRowOption {
//   name: string;
//   label: string;
//   enableRefreshOnEmit?: boolean;
//   icon?: string;
//   class?: string;
//   type: 'button' | 'link' | 'template' | 'modal' | 'emit';
//   link?: string;
//   appendCname?: string;
// }

// export interface OpDataEmit {
//   data: any;
//   optionName: string;
// }


export type SortDirection = 'asc' | 'desc' ;
export const SortRotation: { [key: string]: SortDirection } = { asc: 'desc', desc: 'asc' };

export interface SortEvent {
  column: IColumn;
  direction: SortDirection;
}
export interface TableStateEvent {
  sortEvent: SortEvent;
  pageNo: number;
  pageSize: number;
}


export enum ColumnType {
  STRING = 'string', NUMBER = 'number', BOOLEAN = 'boolean', DATE = 'date', LINK = 'link', OBJECT = 'OBJECT', OTHER = 'other'
}

export interface IColumn {
  id: number;
  name: string;
  label: string;
  type: ColumnType;
  defaultSearch?: boolean;
  bindKeys?: Array<string>;
  cssClasses?: string;
  cssValueMap?: { [dataValue: string]: string };
  disableSortable?: boolean;
  filterable?: boolean;
  hide?: boolean;
  parseValue?: (func: (item: any) => string ) => string;
}

export class Column implements IColumn {
  id!: number;
  name!: string;
  label!: string;
  type!: ColumnType;
  defaultSearch: boolean = false;
  bindKeys: Array<string> = [];
  cssClasses: string = '';
  cssValueMap: { [dataValue: string]: string } = {};
  disableSortable: boolean = false;
  filterable: boolean = true;
  hide: boolean = false;
  parseValue?: (func: (item: any) => string ) => string;
}

// Table Display Properties
export class TableUI {
  tableBordered: boolean = true;
  tableResponsive: boolean = true;
  tableHover: boolean = true;
  tableStripped: boolean = true;
  additionalCSSClass: string = '';
  // TODO Pagination Display Config
}
