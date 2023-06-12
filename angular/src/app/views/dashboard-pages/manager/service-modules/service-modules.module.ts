import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServiceModulesRoutingModule } from './service-modules-routing.module';
import { ServiceModulesComponent } from './service-modules.component';
import { SharedUiModule } from '../../../../shared-ui';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ServiceModulesComponent
  ],
  imports: [
    CommonModule,
    SharedUiModule,
    ReactiveFormsModule,
    ServiceModulesRoutingModule
  ]
})
export class ServiceModulesModule { }
