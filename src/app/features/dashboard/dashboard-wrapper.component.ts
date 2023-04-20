import { Component, OnInit } from '@angular/core';
import { APP_UI_ROUTES } from '@app/core/route.util';

@Component({
  selector: 'app-dashboard-wrapper',
  templateUrl: './dashboard-wrapper.component.html',
  styleUrls: ['./dashboard-wrapper.component.scss']
})
export class DashboardWrapperComponent implements OnInit {

  DASHBOARD_URL: string = APP_UI_ROUTES.DASHBOARD;
  
  constructor() { }

  ngOnInit(): void {
  }

}
