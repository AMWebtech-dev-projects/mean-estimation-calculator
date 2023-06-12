import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SavedProposalComponent } from './saved-proposal.component';

const routes: Routes = [
  { path: '', component: SavedProposalComponent, pathMatch: 'full' },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SavedProposalRoutingModule { }
