import { Component } from '@angular/core';
import { appBrandName } from '@app/core/core.constant';

@Component({
  selector: 'app-auth-pages-footer',
  templateUrl: './auth-pages-footer.component.html',
  styleUrls: ['./auth-pages-footer.component.scss']
})
export class AuthPagesFooterComponent {

  readonly appBrandName = appBrandName;

  currentDate: Date = new Date();

}
