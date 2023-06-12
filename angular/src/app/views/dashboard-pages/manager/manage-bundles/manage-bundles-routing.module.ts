import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageBundlesComponent } from './manage-bundles.component';

const routes: Routes = [
  { path: '', component: ManageBundlesComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageBundlesRoutingModule { }
