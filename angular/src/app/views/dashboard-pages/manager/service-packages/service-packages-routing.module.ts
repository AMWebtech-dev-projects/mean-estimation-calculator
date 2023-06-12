import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateServicePackageComponent } from './create-service-package/create-service-package.component';
import { OverviewServicePackageComponent } from './overview-service-package/overview-service-package.component';

const routes: Routes = [
  // { path: '', redirectTo: 'servicePackages', pathMatch: 'full' },
  { path: '', component: OverviewServicePackageComponent, pathMatch: 'full' },
  // { path: 'createServicePackage', component: CreateServicePackageComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServicePackagesRoutingModule { }
