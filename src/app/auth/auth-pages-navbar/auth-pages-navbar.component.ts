import { Component } from '@angular/core';
import { appBrandName } from '@app/core/core.constant';

@Component({
  selector: 'app-auth-pages-navbar',
  templateUrl: './auth-pages-navbar.component.html',
  styleUrls: ['./auth-pages-navbar.component.scss']
})
export class AuthPagesNavbarComponent {

  readonly appBrandName = appBrandName;

}
