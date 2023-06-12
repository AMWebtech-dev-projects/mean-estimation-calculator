import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedUiModule } from '../../../../shared-ui';
import { SubRegionsRoutingModule } from './sub-regions-routing.module';
import { SubRegionsComponent } from './sub-regions.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    SubRegionsComponent
  ],
  imports: [
    CommonModule,
    SharedUiModule,
    ReactiveFormsModule,
    SubRegionsRoutingModule,
  ]
})
export class SubRegionsModule { }
