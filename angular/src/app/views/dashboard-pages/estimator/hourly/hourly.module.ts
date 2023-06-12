import { NgModule } from '@angular/core';

import { HourlyRoutingModule } from './hourly-routing.module';
import { HourlyComponent } from './hourly.component';
import { SharedUiModule } from '../../../../shared-ui';

@NgModule({
  declarations: [
    HourlyComponent
  ],
  imports: [
    SharedUiModule,
    HourlyRoutingModule,
  ],
})

export class HourlyModule { }
