import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardLayoutComponent } from './dashboard-layout.component';
import { AuthGuard } from '../../shared-ui';

const routes: Routes = [
  {
    path: '', // JUST LOAD HERE DASHBOARD LAYOUT COMPONENT FOR HEADER AND FOOTER AND MIDDLE COMPONENT NO NEED TO LOAD ANY PATH URL BECAUSE WE ARE USING SIMPLE URL. IT WILL LOADS JUST DASHBOARD CHILD  MODULES.
    component: DashboardLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import(
            '../../views/dashboard-pages/manager/dashboard/dashboard/dashboard.module'
          ).then((mod) => mod.DashboardModule),
      },
      {
        path: 'users',
        loadChildren: () =>
          import('../../views/dashboard-pages/manager/users/users.module').then(
            (mod) => mod.UsersModule
          ),
      },
      {
        path: 'regions',
        loadChildren: () =>
          import('../../views/dashboard-pages/manager/regions/regions.module').then(
            (mod) => mod.RegionsModule
          ),
      },
      {
        path: 'sub-regions',
        loadChildren: () =>
          import('../../views/dashboard-pages/manager/sub-regions/sub-regions.module').then(
            (mod) => mod.SubRegionsModule
          ),
      },
      {
        path: 'currency',
        loadChildren: () =>
          import('../../views/dashboard-pages/manager/currency/currency.module').then(
            (mod) => mod.CurrencyModule
          ),
      },
      {
        path: 'manage-services',
        loadChildren: () =>
          import('../../views/dashboard-pages/manager/manage-services/manage-services.module').then(
            (mod) => mod.ManageServicesModule
          ),
      },
      {
        path: 'manage-bundles',
        loadChildren: () =>
          import('../../views/dashboard-pages/manager/manage-bundles/manage-bundles.module').then(
            (mod) => mod.ManageBundlesModule
          ),
      },
      {
        path: 'service-modules',
        loadChildren: () =>
          import('../../views/dashboard-pages/manager/service-modules/service-modules.module').then(
            (mod) => mod.ServiceModulesModule
          ),
      },
      {
        path: 'service-packages',
        loadChildren: () =>
          import('../../views/dashboard-pages/manager/service-packages/service-packages.module').then(
            (mod) => mod.ServicePackagesModule
          ),
      },
      {
        path: 'saved-proposal',
        loadChildren: () =>
          import('../../views/dashboard-pages/estimator/saved-proposal/saved-proposal.module').then(
            (mod) => mod.SavedProposalModule
          ),
      },
      {
        path: 'hourly',
        loadChildren: () =>
          import('../../views/dashboard-pages/estimator/hourly/hourly.module').then(
            (mod) => mod.HourlyModule
          ),
      },
      {
        path: 'resources',
        loadChildren: () =>
          import('../../views/dashboard-pages/estimator/resources/resources.module').then(
            (mod) => mod.ResourcesModule
          ),
      },
      {
        path: 'bundles',
        loadChildren: () =>
          import('../../views/dashboard-pages/estimator/bundles/bundles.module').then(
            (mod) => mod.BundlesModule
          ),
      },
      {
        path: 'UserServiceModule',
        loadChildren: () =>
          import('../../views/dashboard-pages/estimator/user-service-module/user-service-module.module').then(
            (mod) => mod.UserServiceModuleModule
          ),
      },
      {
        path: 'packages',
        loadChildren: () =>
          import('../../views/dashboard-pages/estimator/packages/packages.module').then(
            (mod) => mod.PackagesModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardLayoutRoutingModule { }
