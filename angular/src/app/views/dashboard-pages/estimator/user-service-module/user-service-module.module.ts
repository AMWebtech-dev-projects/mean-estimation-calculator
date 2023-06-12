import { NgModule } from '@angular/core';

import { UserServiceModuleRoutingModule } from './user-service-module-routing.module';
import { SharedUiModule } from '../../../../shared-ui';
import { UserServiceModuleComponent } from './user-service-module.component';


@NgModule({
  declarations: [
    UserServiceModuleComponent
  ],
  imports: [
    SharedUiModule,
    UserServiceModuleRoutingModule
  ]
})
export class UserServiceModuleModule { }
