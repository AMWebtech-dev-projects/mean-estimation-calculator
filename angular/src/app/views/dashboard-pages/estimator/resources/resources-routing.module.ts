import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResourcesComponent } from './resources.component';

const routes: Routes = [
  { path: '', component: ResourcesComponent, pathMatch: 'full' },
  { path: ':id', component: ResourcesComponent, pathMatch: 'full' },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResourcesRoutingModule { }
