import {Component, Input} from '@angular/core';
import {EmailHistory} from "@app/core/model/email-history.model";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-email-view',
  templateUrl: './email-view.component.html',
  styleUrls: ['./email-view.component.scss']
})
export class EmailViewComponent {
  @Input('emailHistory') emailHistory: EmailHistory | any;
  constructor(public activeModal: NgbActiveModal) {
  }
}
