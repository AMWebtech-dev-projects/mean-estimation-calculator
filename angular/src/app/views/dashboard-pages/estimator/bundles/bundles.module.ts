import { NgModule } from '@angular/core';

import { BundlesRoutingModule } from './bundles-routing.module';
import { BundlesComponent } from './bundles.component';
import { SharedUiModule } from '../../../../shared-ui';


@NgModule({
  declarations: [
    BundlesComponent
  ],
  imports: [
    SharedUiModule,
    BundlesRoutingModule
  ]
})
export class BundlesModule { }
