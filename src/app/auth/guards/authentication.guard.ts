import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, CanActivateChild, CanDeactivate, CanLoad, Route, UrlSegment } from '@angular/router';
import { QueryParamKey } from '@app/core/core.constant';
import { Observable } from 'rxjs';
import { Credentials, CredentialsService } from '../services/credentials.service';
import { APP_UI_ROUTES, APP_UI_ROUTES_AND_ACCESS } from '@app/core/route.util';
import { EnumRole } from '@app/core/model/domain.model';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate, CanActivateChild, CanDeactivate<unknown>, CanLoad {


  constructor(private router: Router, private credentialsService: CredentialsService) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let url: string = state.url;
    return this.checkUserLogin(next, url);
  }
  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.canActivate(next, state);
  }
  canDeactivate(
    component: unknown,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
    return true;
  }

  checkUserLogin(route: ActivatedRouteSnapshot, url: any): boolean {
    if (this.credentialsService.isAuthenticated()) {
      const roles: EnumRole[] = APP_UI_ROUTES_AND_ACCESS[url]?.allowedRoles || [];
      const credentails: Credentials | null = this.credentialsService.getCredentials();
      const userRole: EnumRole = credentails?.role || EnumRole.NONE;
      if (credentails != null && roles.includes(userRole)) {
        return true;
      }
    }
    console.log('Not authenticated, redirecting and adding redirect url...');
    const LoginRoutePath = APP_UI_ROUTES.LOGIN;
    // this.router.navigate([LoginRoutePath], { queryParams: { [QueryParamKey.ORIGINAL_REQUEST_URI]: url }, replaceUrl: true });
    return false;
  }
}

