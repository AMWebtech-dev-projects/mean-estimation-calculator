import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BundlesComponent } from './bundles.component';

const routes: Routes = [
  { path: '', component: BundlesComponent, pathMatch: 'full' },
  { path: ':id', component: BundlesComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BundlesRoutingModule { }
