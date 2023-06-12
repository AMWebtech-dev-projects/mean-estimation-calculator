import { Component, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { NgxSpinnerService } from 'ngx-spinner';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subject } from 'rxjs';
import {
  manageServices,
  validationFields,
} from './models/manageServices.model';
import {
  AlertService,
  GlobalService,
  JwtService,
  ManageServicesService,
} from '../../../../shared-ui';
import { AbstractControl, AsyncValidatorFn, FormBuilder, FormControl, ValidationErrors, Validators } from '@angular/forms';
import { map } from 'rxjs/operators';

var self: any | undefined = this;

@Component({
  selector: 'app-manage-services',
  templateUrl: './manage-services.component.html',
  styleUrls: ['./manage-services.component.scss'],
})
export class ManageServicesComponent implements OnInit {
  title = 'Manage Services | Estimation Calculator';
  manageServicesInfo: manageServices = new manageServices();
  manageServicesForm: any = new FormControl({});
  manageSList: any[] = [];
  checkserviceExists = false;
  @ViewChild(DataTableDirective, { static: false })
  datatableElement: any = DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  config: any = {};
  expertiseList: any[] = [];
  @ViewChild('addEditManageServiceModal', { static: false })
  public addEditManageServiceModal: any = ModalDirective;
  @ViewChild('deleteManageServiceModal', { static: false })
  public deleteManageServiceModal: any = ModalDirective;
  requiredValidation: validationFields = new validationFields();

  constructor(
    private jwtService: JwtService,
    private manageService: ManageServicesService,
    private alertService: AlertService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private globalService: GlobalService
  ) {
    this.getManageServicesList();
  }

  ngOnInit(): void {
    self = this;
    this.config = this.jwtService.getConfig();
    this.expertiseList = this.config.expertise;
    this.dtOptions = {
      responsive: true,
      scrollX: true,
      scrollY: '350px',
      scrollCollapse: true,
      autoWidth: false,
      columnDefs: [
        {
          targets: 10,
          orderable: false,
          searchable: false,
        },
        {
          targets: 11,
          orderable: false,
          searchable: false,
        },
      ],
    };
    this.globalService.getPageTitle(this.title);
    this.validateForm();
  }

  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }

  validateForm() {
    this.manageServicesForm = this.fb.group({
      _id: '',
      serviceName: [
        '',
        [Validators.required, Validators.minLength(3)],
        // [this.serviceExistValidator()]
      ],
      expertise: [
        '',
        [Validators.required]
      ],
      teamSize: [
        '',
        [Validators.required]
      ],
      hourlyPrice: [
        '',
        [Validators.required]
      ],
      monthlyPrice: [
        '',
        [Validators.required]
      ],
      pagePrice: [
        '',
        [Validators.required]
      ],
      devicePrice: [
        '',
        Validators.required
      ],
      discount: [
        '',
        [Validators.required]
      ],
      status: 1
    },
      { validators: this.serviceExistValidator }
    )
  }

  checkvalidation(key: any) {
    if (this.manageServicesForm.get(key) && this.manageServicesForm.get(key).valid) {
      return 'text-primary';
    } else {
      return 'text-danger';
    }
  }

  get invalidForm() {
    return this.manageServicesForm.controls
  }

  serviceExistValidator() {
    self.checkserviceExists = false;
    if (self.manageServicesForm.get('serviceName')) {
      let serviceInfo: any = {
        serviceName: self.manageServicesForm.get('serviceName').value,
        _id: self.manageServicesForm.get('_id').value,
      }
      if (serviceInfo.serviceName) {
        if (self.manageSList && self.manageSList.length) {
          let foundService = self.manageSList.find((x: any) => {
            if (serviceInfo._id) {
              return (
                serviceInfo._id !== x._id &&
                x.serviceName.toLowerCase() ===
                serviceInfo.serviceName.toLowerCase()
              );
            } else {
              return (
                x.serviceName.toLowerCase() ===
                serviceInfo.serviceName.toLowerCase()
              );
            }
          });
          if (foundService) {
            self.checkserviceExists = true;
            return { invalid: true };
          } else {
            return null;
          }
        } else {
          return null;
        }
      } else {
        return null;
      }
    } else {
      return null;
    }
  }


  getManageServicesList() {
    this.manageService.getManageServices().subscribe(
      (dataRes: any) => {
        this.spinner.show();
        if (dataRes.status === 200) {
          this.spinner.hide();
          this.datatableElement.dtInstance.then(
            (dtInstance: DataTables.Api) => {
              dtInstance.destroy();
              this.dtTrigger.next();
              this.manageSList = dataRes.data;
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

  showExpertiseName(expertiseValue: any) {
    if (this.expertiseList && this.expertiseList.length) {
      let expertise: any = this.expertiseList.find(
        (x) => x.value === expertiseValue
      );
      if (expertise) {
        return expertise.label;
      } else {
        return '';
      }
    } else {
      return '';
    }
  }

  closeModel() {
    this.addEditManageServiceModal.hide();
    this.deleteManageServiceModal.hide();
    this.validateForm();
  }

  showAddEditModal(manageServicesInfo?: any) {
    this.alertService.clear();
    this.validateForm();
    this.checkserviceExists = false;
    if (manageServicesInfo && manageServicesInfo._id) {
      this.manageServicesForm.reset(manageServicesInfo)
    }
    this.addEditManageServiceModal.show();
  }

  showDeleteModal(manageServicesInfo: any) {
    this.manageServicesInfo = manageServicesInfo;
    this.deleteManageServiceModal.show();
  }

  addService() {
    this.alertService.clear();
    if (!this.manageServicesForm.valid) {
      this.alertService.error("*Please Fill All Fields are mandatory.");
      return false;
    }
    this.spinner.show()
    let PostData = JSON.parse(JSON.stringify(this.manageServicesForm.value));
    if (!PostData._id) {
      delete PostData._id
    }
    this.manageService.saveServiceInfo(PostData).subscribe(
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
          this.getManageServicesList();
        }
      },
      (error: any) => {
        this.spinner.hide();
        this.toastr.error(error.message, 'Error!');
      }
    );
    return;
  }

  changeServiceStatus(service: any) {
    let postData = {
      _id: service._id,
      status: service.status ? 0 : 1,
    };
    // HERE WE CAN CALL API FOR SAVING DATA
    this.manageService.saveServiceInfo(postData).subscribe(
      (dataRes: any) => {
        if (dataRes.status === 200) {
          this.spinner.hide();
          dataRes = dataRes.data;
          this.toastr.success(
            'Service status has been changed successfully.',
            'Success!'
          );
          let index = this.manageSList.findIndex(
            (x) => x._id === dataRes._id
          );
          if (index) {
            this.manageSList[index].status = dataRes.status;
          }
        }
      },
      (error: any) => {
        this.spinner.hide();
        this.toastr.error(error.message, 'Error!');
      }
    );
  }

  deleteService() {
    this.spinner.show();
    this.manageService.deleteService(this.manageServicesInfo).subscribe(
      (dataRes) => {
        if (dataRes.status === 200) {
          this.closeModel();
          this.spinner.hide();
          this.getManageServicesList();
          this.toastr.success(dataRes.message, 'Success');
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
