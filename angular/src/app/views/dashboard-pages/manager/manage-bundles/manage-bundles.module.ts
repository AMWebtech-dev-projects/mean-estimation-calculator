import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageBundlesRoutingModule } from './manage-bundles-routing.module';
import { ManageBundlesComponent } from './manage-bundles.component';
import { SharedUiModule } from '../../../../shared-ui';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ManageBundlesComponent
  ],
  imports: [
    CommonModule,
    SharedUiModule,
    ReactiveFormsModule,
    ManageBundlesRoutingModule
  ]
})
export class ManageBundlesModule { }
