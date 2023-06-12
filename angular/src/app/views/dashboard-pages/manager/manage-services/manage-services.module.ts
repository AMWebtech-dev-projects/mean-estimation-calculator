import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageServicesRoutingModule } from './manage-services-routing.module';
import { ManageServicesComponent } from './manage-services.component';
import { SharedUiModule } from '../../../../shared-ui';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ManageServicesComponent
  ],
  imports: [
    CommonModule,
    SharedUiModule,
    ReactiveFormsModule,
    ManageServicesRoutingModule
  ]
})
export class ManageServicesModule { }
