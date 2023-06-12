import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServicePackagesRoutingModule } from './service-packages-routing.module';
import { CreateServicePackageComponent } from './create-service-package/create-service-package.component';
import { OverviewServicePackageComponent } from './overview-service-package/overview-service-package.component';
import { SharedUiModule } from '../../../../shared-ui';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    CreateServicePackageComponent,
    OverviewServicePackageComponent
  ],
  imports: [
    CommonModule,
    SharedUiModule,
    ReactiveFormsModule,
    ServicePackagesRoutingModule
  ]
})
export class ServicePackagesModule { }
