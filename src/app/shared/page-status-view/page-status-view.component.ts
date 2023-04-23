import { Component, Input } from '@angular/core';
import { StatusModel } from '@app/core/core.model';

@Component({
  selector: 'app-page-status-view',
  templateUrl: './page-status-view.component.html',
  styleUrls: ['./page-status-view.component.scss']
})
export class PageStatusViewComponent {

  @Input()
  statusModel!: StatusModel;

  constructor(){
    
  }

}
