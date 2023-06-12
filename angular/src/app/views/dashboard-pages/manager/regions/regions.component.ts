import { Component, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { NgxSpinnerService } from 'ngx-spinner';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subject } from 'rxjs';
import { regions, validationFields } from './models/regions.model';
import { debounceTime, map, tap } from 'rxjs/operators';
import {
  AlertService,
  GlobalService,
  RegionsService,
} from '../../../../shared-ui';
import { AbstractControl, AsyncValidatorFn, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';

@Component({
  selector: 'app-regions',
  templateUrl: './regions.component.html',
  styleUrls: ['./regions.component.scss'],
})
export class RegionsComponent implements OnInit {
  subject: Subject<any> = new Subject();
  title = 'Manage Regions | Estimation Calculator';
  regionsInfo: regions = new regions();
  regionsForm: any = new FormGroup({})
  regionsList: any[] = [];
  checkregionExists = false;
  @ViewChild(DataTableDirective, { static: false })
  datatableElement: any = DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  @ViewChild('showAddEditRegionModal', { static: false })
  public showAddEditRegionModal: any = ModalDirective;
  @ViewChild('deleteRegionModal', { static: false })
  public deleteRegionModal: any = ModalDirective;
  requiredValidation: validationFields = new validationFields();

  constructor(
    private regionsService: RegionsService,
    private alertService: AlertService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private globalService: GlobalService,
    private fb: FormBuilder
  ) {
    this.getRegionsList();
  }

  ngOnInit(): void {
    this.dtOptions = {
      responsive: true,
      scrollX: true,
      scrollY: '350px',
      scrollCollapse: true,
      columnDefs: [
        {
          targets: 4,
          orderable: false,
          searchable: false,
        },
        {
          targets: 5,
          orderable: false,
          searchable: false,
        },
      ],
    };
    this.globalService.getPageTitle(this.title);
    this.subject
      .pipe(debounceTime(1500))
      .subscribe(() => {
        if (this.regionsInfo.regionFactor && (this.regionsInfo.regionFactor > 0 && this.regionsInfo.regionFactor <= 10)) {
          this.regionsInfo.regionFactor = this.regionsInfo.regionFactor;
        } else {
          this.regionsInfo.regionFactor = 0.1;
        }
      }
      );
    this.validationForm();
  }

  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }


  validationForm(regionsInfoValue?: regions) {
    this.regionsForm = this.fb.group({
      _id: '',
      regionName: [
        '',
        [Validators.required, Validators.minLength(3)],
        [this.regionExistValidator()]
      ],
      regionFactor: [
        0.1,
        [Validators.required, Validators.min(0), Validators.max(10)]
      ],
      status: [
        1
      ]
    })
  }

  regionExistValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return this.regionsService.regionAlreadyExists(
        {
          regionName: control.value,
          _id: this.regionsForm?.value?._id
        }).pipe(
          map((data: any) => {
            return data.status === 200 ? { regionExists: true } : null;
          })
        );
    };
  }


  checkvalidation(formType: any) {
    if (
      this.regionsForm.get(formType) &&
      this.regionsForm.get(formType).invalid
    ) { return 'text-danger'; } else { return 'text-success'; }
  }

  get invalidform() {
    return this.regionsForm.controls;
  }


  getRegionsList() {
    this.regionsService.getRegionsList({}).subscribe(
      (dataRes: any) => {
        this.spinner.show();
        if (dataRes.status === 200) {
          this.spinner.hide();
          this.datatableElement.dtInstance.then(
            (dtInstance: DataTables.Api) => {
              dtInstance.destroy();
              this.dtTrigger.next();
              this.regionsList = dataRes.data;
              this.spinner.hide();
            }
          );
        }
      },
      (error: any) => {
        this.spinner.hide();
        this.toastr.error(error.message, 'Error!');
      }
    );
  }

  closeModel() {
    this.showAddEditRegionModal.hide();
    this.deleteRegionModal.hide();
  }

  showAddEditModal(regionsInfoValue?: any) {
    this.alertService.clear();
    this.validationForm();
    if (regionsInfoValue) {
      this.regionsForm.reset(regionsInfoValue);
      this.regionsForm.controls['regionName'].enable()
    }
    this.showAddEditRegionModal.show();
  }

  showRegionDeleteModal(region: any) {
    this.regionsInfo = region;
    this.deleteRegionModal.show();
  }

  addRegion() {
    this.alertService.clear();
    if (this.regionsForm.invalid) {
      this.alertService.error('*Please Fill All Fields are mandatory.');
      return false
    }
    let regionPostData = JSON.parse(JSON.stringify(this.regionsForm.value));
    if (!regionPostData._id) {
      delete regionPostData._id;
    }
    this.regionsService.saveRegionInfo(regionPostData).subscribe(
      (dataRes: any) => {
        if (dataRes.status === 200) {
          this.spinner.hide();
          this.toastr.success(dataRes.message, 'Success!');
          dataRes = dataRes.data;
          this.closeModel();
          // if (!regionPostData._id) {
          //   this.regionsList.unshift(dataRes);
          // } else {
          //   let index = this.regionsList.findIndex(x => x._id === dataRes._id);
          //   if (index) {
          //     this.regionsList[index] = dataRes;
          //   }
          // }
          this.getRegionsList();
        }
      },
      (error: any) => {
        this.spinner.hide();
        this.toastr.error(error.message, 'Error!');
      }
    );
    return;
  }

  changeRegionStatus(region: any) {
    let postData = {
      _id: region._id,
      status: region.status ? 0 : 1,
    };
    // HERE WE CAN CALL API FOR SAVING DATA
    this.regionsService.saveRegionInfo(postData).subscribe(
      (dataRes: any) => {
        if (dataRes.status === 200) {
          dataRes = dataRes.data;
          this.spinner.hide();
          this.toastr.success(
            'Region status has been changed successfully.',
            'Success!'
          );
          let index = this.regionsList.findIndex((x) => x._id === dataRes._id);
          if (index) {
            this.regionsList[index].status = dataRes.status;
          }
        }
      },
      (error: any) => {
        this.spinner.hide();
        this.toastr.error(error.message, 'Error!');
      }
    );
  }

  deleteRegion() {
    this.spinner.show();
    this.regionsService.deleteRegion(this.regionsInfo).subscribe(
      (dataRes) => {
        if (dataRes.status === 200) {
          this.closeModel();
          this.spinner.hide();
          this.getRegionsList();
          this.toastr.success('Region deleted successfully.', 'Success');
        }
      },
      (error) => {
        this.closeModel();
        this.spinner.hide();
        this.toastr.error(
          'There are some server error.Please check connection.',
          'Error'
        );
      }
    );
  }
}
