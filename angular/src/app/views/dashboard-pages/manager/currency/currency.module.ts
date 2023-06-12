import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedUiModule } from '../../../../shared-ui';
import { CurrencyRoutingModule } from './currency-routing.module';
import { CurrencyComponent } from './currency.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    CurrencyComponent
  ],
  imports: [
    CommonModule,
    SharedUiModule,
    ReactiveFormsModule,
    CurrencyRoutingModule,
  ]
})
export class CurrencyModule { }
