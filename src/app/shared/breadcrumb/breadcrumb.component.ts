import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, NavigationEnd, PRIMARY_OUTLET, Router, RouterStateSnapshot } from '@angular/router';
import { filter, map, mergeMap } from 'rxjs';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent implements OnInit {

  @Input()
  rootUrl: string = '';

  currentRoute: { url: string, title: string, label: string } | null = null;

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    let snapshot = this.router.routerState.snapshot;
    this.updateCurrentRoute(this.router.url, this.getCurrentRoute(snapshot));
  }

  ngOnInit(): void {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .pipe(map(() => this.activatedRoute))
      .pipe(map((route) => {
        while (route.firstChild) { route = route.firstChild; }
        return route;
      }))
      .pipe(filter(route => route.outlet === PRIMARY_OUTLET))
      .subscribe(route => {

        let snapshot = this.router.routerState.snapshot;
        const activatedRouteSnapshot = this.getCurrentRoute(snapshot);
        this.updateCurrentRoute(this.router.url, activatedRouteSnapshot);
        // let routeData = currentRoute.data;

        // console.log(routeData);
        // let label = routeData['breadcrumb'];
        // let params = snapshot.root.params;

        // this.currentRoute = {
        //   url: this.router.url,
        //   title: routeData?.['title'],
        //   label: routeData?.['label']
        // };

      });

  }

  private getCurrentRoute(routerState: RouterStateSnapshot): ActivatedRouteSnapshot {
    let currentRoute = routerState.root;

    while (currentRoute.firstChild) {
      currentRoute = currentRoute.firstChild;
    }

    return currentRoute;
  }

  private updateCurrentRoute(url: string, activatedRouteSnapshot: ActivatedRouteSnapshot): void {
    let routeData = activatedRouteSnapshot.data;
    // console.log(routeData);
    // let label = routeData['breadcrumb'];
    // let params = snapshot.root.params;

    this.currentRoute = {
      url: this.router.url,
      title: routeData?.['title'],
      label: routeData?.['label']
    };

  }


}
