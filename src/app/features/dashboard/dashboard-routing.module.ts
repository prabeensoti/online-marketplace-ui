import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AccountProfileComponent } from "./components/account-profile/account-profile.component";
import { AccountSettingsComponent } from "./components/account-settings/account-settings.component";
import { DashboardServicesComponent } from "./components/dashboard-services/dashboard-services.component";
import { DashboardWrapperComponent } from "./dashboard-wrapper.component";
import { EmailHistoryComponent } from "@app/features/dashboard/admin/email-history/email-history.component";
import { AuthenticationGuard } from "@app/auth/guards/authentication.guard";
import { DASHBOARD_ROUTES } from "@app/core/route.util";
import { CategoryComponent } from "../public-pages/category/category.component";
import { AddProductComponent } from "@app/features/dashboard/vendor/manage-products/add-product/add-product.component";



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
