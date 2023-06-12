import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PackagesComponent } from './packages.component';

const routes: Routes = [
  { path: '', component: PackagesComponent, pathMatch: 'full' },
  { path: ':id', component: PackagesComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PackagesRoutingModule { }
