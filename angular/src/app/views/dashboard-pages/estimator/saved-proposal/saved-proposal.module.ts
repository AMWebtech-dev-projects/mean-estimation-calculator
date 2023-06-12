import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SavedProposalRoutingModule } from './saved-proposal-routing.module';
import { SavedProposalComponent } from './saved-proposal.component';
import { SharedUiModule } from '../../../../shared-ui';


@NgModule({
  declarations: [
    SavedProposalComponent
  ],
  imports: [
    CommonModule,
    SavedProposalRoutingModule,
    SharedUiModule,
  ]
})
export class SavedProposalModule { }
