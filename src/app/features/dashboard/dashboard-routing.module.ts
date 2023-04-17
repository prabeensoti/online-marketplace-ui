import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AccountProfileComponent } from "./components/account-profile/account-profile.component";
import { AccountSettingsComponent } from "./components/account-settings/account-settings.component";
import { DashboardServicesComponent } from "./components/dashboard-services/dashboard-services.component";
import { DashboardWrapperComponent } from "./dashboard-wrapper.component";

const routes: Routes = [
    {
        path: '',
        component: DashboardWrapperComponent,
        children: [
            {
                path: '',
                component: DashboardServicesComponent,
                pathMatch: 'full',
                data: {
                    title: 'Services'
                },
            },
            {
                path: 'profile',
                component: AccountProfileComponent,
                pathMatch: 'full',
                data: {
                    title: 'Profile'
                },
            },
            {
                path: 'settings',
                component: AccountSettingsComponent,
                pathMatch: 'full',
                data: {
                    title: 'Settings'
                },
            },
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})
export class DashboardRoutingModule { }
