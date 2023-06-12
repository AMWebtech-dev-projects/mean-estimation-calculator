import { Component, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { NgxSpinnerService } from 'ngx-spinner';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subject } from 'rxjs';
import { subRegions, validationFields } from './models/sub-regions.model';
import { AlertService, GlobalService, RegionsService, SubRegionsService } from '../../../../shared-ui';
import { AbstractControl, AsyncValidatorFn, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { map, retry } from 'rxjs/operators';

@Component({
  selector: 'app-sub-regions',
  templateUrl: './sub-regions.component.html',
  styleUrls: ['./sub-regions.component.scss']
})
export class SubRegionsComponent implements OnInit {

  title = 'Manage Sub-Regions | Estimation Calculator';
  subRegionsInfo: subRegions = new subRegions();
  subRegionsform: any = new FormGroup({})
  subRegionsList: any[] = [];
  regionsList: any[] = [];
  countryCodeExists = false;
  @ViewChild(DataTableDirective, { static: false })
  datatableElement: any = DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  @ViewChild('AddEditSubRegionModal', { static: false, })
  public AddEditSubRegionModal: any = ModalDirective;
  @ViewChild('deleteSubRegionModal', { static: false })
  public deleteSubRegionModal: any = ModalDirective;
  requiredValidation: validationFields = new validationFields();

  constructor(
    private subRegionsService: SubRegionsService,
    private regionsService: RegionsService,
    private alertService: AlertService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private globalService: GlobalService,) {
    this.getRegionsList();
    this.getSubRegionsList();
    this.validationForm();
  }

  ngOnInit(): void {
    this.dtOptions = {
      responsive: true,
      scrollX: true,
      scrollY: '350px',
      scrollCollapse: true,
      columnDefs: [{
        targets: 5,
        orderable: false,
        searchable: false,
      }, {
        targets: 6,
        orderable: false,
        searchable: false,
      },],
    };
    this.globalService.getPageTitle(this.title);
  }

  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }

  validationForm() {
    this.subRegionsform = this.fb.group({
      _id: '',
      countryName: [
        '',
        [Validators.required, Validators.minLength(3)],
        [this.countrycodeExistValidator()]
      ],
      countryCode: ['',
        [Validators.required, Validators.minLength(2), Validators.pattern('^[A-Z]+$')],
        [this.countrycodeExistValidator()]
      ],
      regionId: [
        '',
        [Validators.required]
      ],
      status: 1
    })
  }

  countrycodeExistValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return this.subRegionsService.countryCodeExists({
        countryCode: control.value, _id: this.subRegionsform?.value?._id
      }).pipe(
        map((data: any) => {
          return data.status === 200 ? { countryExists: true } : null;
        })
      )
    }
  }

  getRegionsList() {
    this.regionsService.getRegionsList({ status: 1 }).subscribe(
      (dataRes: any) => {
        this.spinner.show();
        if (dataRes.status === 200) {
          this.spinner.hide();
          dataRes = dataRes.data;
          this.regionsList = dataRes;
        }
      }, (error: any) => {
        this.spinner.hide()
        this.toastr.error(error.message, 'Error!');
      });
  }

  showRegionName(regionId: any) {
    if (this.regionsList && this.regionsList.length) {
      let foundRegionName = this.regionsList.find(x => x._id === regionId);
      if (foundRegionName) {
        return foundRegionName.regionName;
      } else {
        return '';
      }
    } else {
      return '';
    }
  }

  getSubRegionsList() {
    this.subRegionsService.getSubRegionsList().subscribe((dataRes: any) => {
      this.spinner.show();
      if (dataRes.status === 200) {
        this.spinner.hide();
        this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
          dtInstance.destroy();
          this.dtTrigger.next();
          this.subRegionsList = dataRes.data;
          this.spinner.hide();
        });
      }
    }, (error: any) => {
      this.spinner.hide()
      this.toastr.error(error.message, 'Error!');
    });
  }

  closeModel() {
    this.AddEditSubRegionModal.hide();
    this.deleteSubRegionModal.hide();
    this.validationForm();
  }

  showAddEditModal(subRegionsInfoValue?: any) {
    this.alertService.clear();
    this.validationForm();
    if (subRegionsInfoValue && subRegionsInfoValue._id) {
      this.subRegionsform.reset(subRegionsInfoValue);
      this.subRegionsform.controls['countryCode'].enable();
    }
    this.AddEditSubRegionModal.show();
  }

  subRegionDeleteModal(subregion: any) {
    this.subRegionsInfo = subregion;
    this.deleteSubRegionModal.show();
    this.validationForm();
  }

  checkvalidation(key: any) {
    let Validate: any = { ...this.subRegionsInfo };
    if (this.subRegionsform.get(key) && this.subRegionsform.get(key).invalid) {
      return 'text-danger';
    } else {
      return 'text-primary';
    }
  }

  get invalidForm() {
    return this.subRegionsform.controls
  }


  addSubRegion() {
    this.alertService.clear();
    if (this.subRegionsform.invalid) {
      this.alertService.error('*Please Fill All Fields are mandatory.');
      return false
    }

    let PostData = JSON.parse(JSON.stringify(this.subRegionsform.value));
    if (!PostData._id) {
      delete PostData._id;
    }
    this.subRegionsService.saveSubRegionInfo(PostData).subscribe((dataRes: any) => {
      if (dataRes.status === 200) {
        this.spinner.hide();
        this.toastr.success(dataRes.message, 'Success!');
        dataRes = dataRes.data;
        this.closeModel();
        /*  if (!regionPostData._id) {
           this.subRegionsList.unshift(dataRes);
         } else {
           let index = this.subRegionsList.findIndex(x => x._id === dataRes._id);
           if (index) {
             this.subRegionsList[index] = dataRes;
           }
         } */
        this.getSubRegionsList();
      }
    }, (error: any) => {
      this.closeModel();
      this.spinner.hide()
      this.toastr.error(error.message, 'Error!');
    });
    return
  }

  changeRegionStatus(region: any) {
    let postData = {
      _id: region._id,
      status: region.status ? 0 : 1
    }
    // HERE WE CAN CALL API FOR SAVING DATA
    this.subRegionsService.saveSubRegionInfo(postData).subscribe((dataRes: any) => {
      if (dataRes.status === 200) {
        dataRes = dataRes.data;
        this.spinner.hide();
        this.toastr.success('Sub Region status has been changed successfully.', 'Success!');
        let index = this.subRegionsList.findIndex(x => x._id === dataRes._id);
        if (index) {
          this.subRegionsList[index].status = dataRes.status;
        }
      }
    }, (error: any) => {
      this.spinner.hide()
      this.toastr.error(error.message, 'Error!');
    });
  }

  deleteSubRegion() {
    this.spinner.show();
    this.subRegionsService.deleteSubRegion(this.subRegionsInfo).subscribe(
      (dataRes) => {
        if (dataRes.status === 200) {
          this.closeModel();
          this.spinner.hide();
          this.getSubRegionsList();
          this.toastr.success('Sub Region deleted successfully.', 'Success');
        }
      },
      (error) => {
        this.closeModel();
        this.spinner.hide();
        this.toastr.error(
          'There are some server error.Please check connection.', 'Error'
        );
      }
    );
  }

}
