import {Route, Routes} from "@angular/router";
import {AuthenticationGuard} from "@app/auth/guards/authentication.guard";
import {EmailHistoryComponent} from "@app/features/dashboard/admin/email-history/email-history.component";
import {AccountProfileComponent} from "@app/features/dashboard/components/account-profile/account-profile.component";
import {AccountSettingsComponent} from "@app/features/dashboard/components/account-settings/account-settings.component";
import {
  DashboardServicesComponent
} from "@app/features/dashboard/components/dashboard-services/dashboard-services.component";
import {EnumRole} from "./model/domain.model";
import {ManageProductsComponent} from "@app/features/dashboard/vendor/manage-products/manage-products.component";
import {ManageOrdersComponent} from "@app/features/dashboard/vendor/manage-orders/manage-orders.component";
import {VerifyVendorsComponent} from "@app/features/dashboard/admin/verify-vendors/verify-vendors.component";
import {VerifyProductsComponent} from "@app/features/dashboard/admin/verify-products/verify-products.component";
import {
  SupportNMessagesComponent
} from "@app/features/dashboard/components/support-n-messages/support-n-messages.component";
import {ReportViewComponent} from "@app/features/dashboard/components/report-view/report-view.component";
import {UserOrdersComponent} from "@app/features/dashboard/user/user-orders/user-orders.component";
import {AddProductComponent} from "@app/features/dashboard/vendor/manage-products/add-product/add-product.component";
import {CategoryComponent} from "@app/features/public-pages/category/category.component";
import {OrderManageAllComponent} from "@app/features/dashboard/admin/manage-order/order-manage-all.component";
import {
  ProductSalesReportComponent
} from "@app/features/dashboard/vendor/product-sales-report/product-sales-report.component";
import {
  AdminProductSalesReportComponent
} from "@app/features/dashboard/admin/admin-product-sales-report/admin-product-sales-report.component";
import {
  AdminVendorSalesReportComponent
} from "@app/features/dashboard/admin/admin-vendor-sales-report/admin-vendor-sales-report.component";

export interface RoutePathAndRoles {
  allowedRoles?: EnumRole[];
}

export const APP_UI_ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  VERIFY: '/verify',
  CONTACT: '/contact',
  SEARCH: '/s',

  // dashboard
  DASHBOARD: '/dashboard',
  DASH_SETTINGS: '/dashboard/settings',
  DASH_PROFILE: '/dashboard/profile',

  ACCOUNT: '/dashboard/account',
  ORDERS: '/dashboard/orders',

  MANAGE_PRODUCTS: '/dashboard/manage-products',

  MANAGE_ORDERS: '/dashboard/manage-orders',

  MANAGE_ALL_ORDERS: '/dashboard/manage-all-orders',


  MANAGE_VENDORS: '/dashboard/manage-vendors',

  VERIFY_PRODUCTS: '/dashboard/verify-products',
  VERIFY_VENDORS: '/dashboard/verify-vendors',
  SUPPORT_N_MESSAGES: '/dashboard/support-n-messages',
  EMAIL_HISTORY: '/dashboard/email-history',
  VENDOR_PRODUCT_SALES_REPORT: '/dashboard/vendor-product-sales-report',
  ADMIN_PRODUCT_SALES_REPORT: '/dashboard/admin-product-sales-report',
  ADMIN_VENDOR_SALES_REPORT: '/dashboard/admin-vendor-sales-report'
};

const allRoles: EnumRole[] = [EnumRole.ROLE_USER, EnumRole.ROLE_VENDOR, EnumRole.ROLE_ADMIN];
type AppUiRouteKey = keyof typeof APP_UI_ROUTES;
export const APP_UI_ROUTES_AND_ACCESS: { [key in AppUiRouteKey | any]?: RoutePathAndRoles } = {
  [APP_UI_ROUTES.HOME]: {},
  [APP_UI_ROUTES.LOGIN]: {},
  [APP_UI_ROUTES.REGISTER]: {},
  [APP_UI_ROUTES.VERIFY]: {},
  [APP_UI_ROUTES.CONTACT]: {},
  [APP_UI_ROUTES.SEARCH]: {},

  [APP_UI_ROUTES.DASHBOARD]: {allowedRoles: allRoles},
  [APP_UI_ROUTES.DASH_SETTINGS]: {allowedRoles: allRoles},
  [APP_UI_ROUTES.DASH_PROFILE]: {allowedRoles: allRoles},

  [APP_UI_ROUTES.ACCOUNT]: {allowedRoles: [EnumRole.ROLE_USER]},
  [APP_UI_ROUTES.ORDERS]: {allowedRoles: [EnumRole.ROLE_USER]},

  [APP_UI_ROUTES.MANAGE_PRODUCTS]: {allowedRoles: [EnumRole.ROLE_VENDOR]},
  [APP_UI_ROUTES.MANAGE_ORDERS]: {allowedRoles: [EnumRole.ROLE_VENDOR]},

  [APP_UI_ROUTES.MANAGE_ALL_ORDERS]: {allowedRoles: [EnumRole.ROLE_ADMIN]},

  [APP_UI_ROUTES.VENDOR_PRODUCT_SALES_REPORT]: {allowedRoles: [EnumRole.ROLE_VENDOR]},


  [APP_UI_ROUTES.VERIFY_PRODUCTS]: {allowedRoles: [EnumRole.ROLE_ADMIN]},
  [APP_UI_ROUTES.VERIFY_VENDORS]: {allowedRoles: [EnumRole.ROLE_ADMIN]},
  [APP_UI_ROUTES.EMAIL_HISTORY]: {allowedRoles: [EnumRole.ROLE_ADMIN]},
  [APP_UI_ROUTES.ADMIN_PRODUCT_SALES_REPORT]: {allowedRoles: [EnumRole.ROLE_ADMIN]},
  [APP_UI_ROUTES.ADMIN_VENDOR_SALES_REPORT]: {allowedRoles: [EnumRole.ROLE_ADMIN]},

  [APP_UI_ROUTES.SUPPORT_N_MESSAGES]: {allowedRoles: allRoles},
};


export const DASHBOARD_ROUTES: Routes = [
  {
    path: '',
    component: DashboardServicesComponent,
    // canActivate: [AuthenticationGuard],
    pathMatch: "full",
    data: {hideMenu: true}
  },
  {
    path: 'profile',
    component: AccountProfileComponent,
    data: {title: 'Profile', label: 'View and manage your profile and account information', hideMenu: true}
  },
  {
    path: 'settings',
    component: AccountSettingsComponent,
    data: {title: 'Settings', label: 'Change view Settings and Privacy control', hideMenu: true}
  },

  // ROLE_USER
  {
    path: 'orders',
    component: UserOrdersComponent,
    data: {title: 'Your Orders', label: 'Track, return, cancel an order, download invoice or buy again',}
  },

  // ROLE_VENDOR
  {
    path: 'manage-products',
    component: ManageProductsComponent,
    data: {title: 'Manage Products', label: 'View, modify and publish products',}
  },
  {
    path: 'manage-orders',
    component: ManageOrdersComponent,
    data: {title: 'Manage Orders', label: 'Ship, track and cancel/return an order',}
  },
  {
    path: 'vendor-product-sales-report',
    component: ProductSalesReportComponent,
    data: {title: 'Product Sales Report', label: 'Overall Sales report of product',}
  },

  // ROLE_ADMIN
  {
    path: 'verify-products',
    component: VerifyProductsComponent,
    data: {title: 'Verify Products', label: 'Verify Products',}
  },
  {
    path: 'verify-vendors',
    component: VerifyVendorsComponent,
    data: {title: 'Verify Vendors', label: 'Verify Vendors',}
  },

  {
    path: 'manage-all-orders',
    component: OrderManageAllComponent,
    data: {title: 'Manage All Orders', label: 'Ship, track and cancel/return an order',}
  },
  {
    path: 'admin-product-sales-report',
    component: AdminProductSalesReportComponent,
    data: {title: 'Product Sales Report', label: 'Overall Sales report of product',}
  },
  {
    path: 'admin-vendor-sales-report',
    component: AdminVendorSalesReportComponent,
    data: {title: 'Vendor Sales Report', label: 'Overall Sales report of vendor',}
  },


  // ROLE_VENDOR and ROLE_ADMIN
  {
    path: 'email-history',
    component: EmailHistoryComponent,
    data: {title: 'Email History', label: 'View all email send history of system'}
  },
  // ALL_USERS
  {
    path: 'support-n-messages',
    component: SupportNMessagesComponent,
    data: {title: 'Digital Services and Support', label: 'Troubleshoot, Request for change and support',}
  },
  // {
  //     path: 'manage-views',
  //     component: ManageViewsComponent,
  //     data: { title: 'Manage Home/Category/Banners', label: 'Manage home view, category add/edit and trending views', }
  // },
];


//   const roles: EnumRole[] = APP_UI_ROUTES_AND_ACCESS[url]?.allowedRoles || [];

export class RouteUtil {

  static verifyHasAccessToRoutes(accessUrl: string | undefined | null, currentUserRole: EnumRole | null): boolean {
    const url: string = accessUrl || '';
    const roles: EnumRole[] = APP_UI_ROUTES_AND_ACCESS[url]?.allowedRoles || [];
    const userRole: EnumRole = currentUserRole || EnumRole.NONE;
    if (roles.includes(userRole)) {
      return true;
    }
    return false;
  }

  // static verifyHasAccessToRoutes(accessRoute: Route, currentUserRole: EnumRole): boolean {
  //     const url: string = accessRoute.path || '';
  //     const roles: EnumRole[] = APP_UI_ROUTES_AND_ACCESS[url]?.allowedRoles || [];
  //     const userRole: EnumRole = currentUserRole || EnumRole.NONE;
  //     if (roles.includes(userRole)) {
  //         return true;
  //     }
  //     return false;
  // }

}
