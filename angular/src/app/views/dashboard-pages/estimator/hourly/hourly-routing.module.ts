import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HourlyComponent } from './hourly.component';

const routes: Routes = [
  { path: '', component: HourlyComponent, pathMatch: 'full' },
  { path: ':id', component: HourlyComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HourlyRoutingModule { }
