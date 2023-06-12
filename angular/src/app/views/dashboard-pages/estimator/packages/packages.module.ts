import { NgModule } from '@angular/core';

import { PackagesRoutingModule } from './packages-routing.module';
import { PackagesComponent } from './packages.component';
import { SharedUiModule } from '../../../../shared-ui';


@NgModule({
  declarations: [
    PackagesComponent
  ],
  imports: [
    SharedUiModule,
    PackagesRoutingModule
  ]
})
export class PackagesModule { }
