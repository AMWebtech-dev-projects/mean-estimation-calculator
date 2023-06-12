import { NgModule } from '@angular/core';
import { ResourcesRoutingModule } from './resources-routing.module';
import { ResourcesComponent } from './resources.component';
import { SharedUiModule } from '../../../../shared-ui';

@NgModule({
  declarations: [
    ResourcesComponent
  ],
  imports: [
    SharedUiModule,
    ResourcesRoutingModule,
  ]
})
export class ResourcesModule { }
