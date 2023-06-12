import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedUiModule } from '../../../../shared-ui';
import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';

@NgModule({
  declarations: [UsersComponent],
  imports: [
    SharedUiModule,
    ReactiveFormsModule,
    UsersRoutingModule,
  ],
})
export class UsersModule { }
