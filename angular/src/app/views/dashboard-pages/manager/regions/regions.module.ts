import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedUiModule } from '../../../../shared-ui';
import { RegionsRoutingModule } from './regions-routing.module';
import { RegionsComponent } from './regions.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [RegionsComponent],
  imports: [
    CommonModule,
    SharedUiModule,
    ReactiveFormsModule,
    RegionsRoutingModule,
  ],
})
export class RegionsModule { }
