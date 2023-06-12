import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SubRegionsComponent } from './sub-regions.component';

const routes: Routes = [
  { path: '', component: SubRegionsComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubRegionsRoutingModule { }
