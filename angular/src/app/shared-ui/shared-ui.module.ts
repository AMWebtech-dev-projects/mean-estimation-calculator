import {
  CUSTOM_ELEMENTS_SCHEMA,
  ModuleWithProviders,
  NgModule,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { NumberOnlyDirective } from './directives/onlynumber.directive';
import { CharacterOnlyDirective } from './directives/onlycharacter.directive';
import { DisabledDirective } from './directives/disabled.directive';
import { AlertComponent } from './alert';
import { NgxSpinnerModule } from 'ngx-spinner';
import { LoadingComponent } from './loading/loading.component';
import {} from './loading/loading.component';
import { GrdFilterPipe } from './filters-pipes/grd-filter.pipe';
import { ModalModule } from 'ngx-bootstrap/modal';
import { DataTablesModule } from 'angular-datatables';
import { UiSwitchModule } from 'ngx-toggle-switch';
import { EstimatorCardComponent } from './estimator-card/estimator-card.component';
import { EstimatorPdfComponent } from './estimator-pdf/estimator-pdf.component';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { HttpClientModule } from '@angular/common/http';
import { UsersService } from '.';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from './services/api.service';

const SHARED_COMPONENTS: any = [
  NumberOnlyDirective,
  CharacterOnlyDirective,
  DisabledDirective,
  AlertComponent,
  LoadingComponent,
  GrdFilterPipe,
  EstimatorPdfComponent,
  EstimatorCardComponent,
];
const SHARED_MODULES: any = [
  CommonModule,
  FormsModule,
  HttpClientModule,
  RouterModule,
  ModalModule,
  DataTablesModule,
  UiSwitchModule,
  NgxSpinnerModule,
  NgxSliderModule,
  BsDatepickerModule.forRoot(),
  BsDropdownModule.forRoot(),
];
@NgModule({
  imports: [SHARED_MODULES],
  providers: [],
  declarations: [SHARED_COMPONENTS],
  exports: [SHARED_COMPONENTS, SHARED_MODULES],
  entryComponents: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SharedUiModule {
  static forRoot(): ModuleWithProviders<SharedUiModule> {
    return {
      ngModule: SharedUiModule,
      providers: [],
    };
  }
}
