import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'objKeys'
})
export class ObjKeysPipe implements PipeTransform {

  transform(value: any, ...args: any[]): string[] {
    if (value === null || value === undefined) {
      return [];
    }
    return Object.keys(value);
  }

}
