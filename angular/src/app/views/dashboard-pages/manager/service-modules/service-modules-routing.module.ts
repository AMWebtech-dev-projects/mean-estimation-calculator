import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ServiceModulesComponent } from './service-modules.component';

const routes: Routes = [
  { path: '', component: ServiceModulesComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServiceModulesRoutingModule { }
