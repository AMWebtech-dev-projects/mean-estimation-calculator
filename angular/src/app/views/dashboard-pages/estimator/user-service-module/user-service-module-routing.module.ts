import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserServiceModuleComponent } from './user-service-module.component';

const routes: Routes = [
  { path: '', component: UserServiceModuleComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserServiceModuleRoutingModule { }
