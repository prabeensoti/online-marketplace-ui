import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {DashboardWrapperComponent} from "./dashboard-wrapper.component";
import {AuthenticationGuard} from "@app/auth/guards/authentication.guard";
import {DASHBOARD_ROUTES} from "@app/core/route.util";


export const ROUTES: Routes = [
    {
        path: '',
        component: DashboardWrapperComponent,
        canActivate: [AuthenticationGuard],
        children: DASHBOARD_ROUTES
    },

];

@NgModule({
    imports: [
        RouterModule.forChild(ROUTES)
    ],
    exports: [RouterModule]
})
export class DashboardRoutingModule { }
