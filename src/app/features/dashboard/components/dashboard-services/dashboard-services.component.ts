import { Component, OnInit } from '@angular/core';
import { Route, Routes } from '@angular/router';
import { CredentialsService } from '@app/auth/services/credentials.service';
import { APP_UI_ROUTES, DASHBOARD_ROUTES, RouteUtil } from '@app/core/route.util';

@Component({
  selector: 'app-dashboard-services',
  templateUrl: './dashboard-services.component.html',
  styleUrls: ['./dashboard-services.component.scss']
})
export class DashboardServicesComponent implements OnInit {

  // services available according to user group - customer, vendor, admin or client
  services: Routes = DASHBOARD_ROUTES;

  constructor(private credentialsService: CredentialsService) { }

  ngOnInit(): void {
  }

  isAvailable(route: Route): boolean {
    const hideMenu: boolean = route.data?.['hideMenu'];
    const userRole = this.credentialsService.getUserRole();
    const hasAccess = RouteUtil.verifyHasAccessToRoutes(APP_UI_ROUTES.DASHBOARD + "/" + route.path, userRole);
    if (!hideMenu && hasAccess) {
      return true;
    }
    return false;
  }

}
