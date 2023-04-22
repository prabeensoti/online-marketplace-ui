import { Directive, HostBinding, Optional, Input } from '@angular/core';
import { ControlContainer} from '@angular/forms';

@Directive({selector: 'label[controlName]'})
export class LabelControl {
    @Input() controlName: string | undefined;

    constructor(@Optional() private parent: ControlContainer) {}
  
    @HostBinding('textContent')
    get controlValue() {
        if(this.parent){
            if(this.parent.control){
                if(this.controlName){
                    return this.parent.control.get(this.controlName)?.value
                }
            }
        }
      return '';
    }
  }
