import { Component, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { NgxSpinnerService } from 'ngx-spinner';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import {
  serviceModules,
  validationFields,
} from './models/serviceModules.model';
import {
  AlertService,
  GlobalService,
  ServiceModulesService,
} from '../../../../shared-ui';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
var self: any | undefined = {};

@Component({
  selector: 'app-service-modules',
  templateUrl: './service-modules.component.html',
  styleUrls: ['./service-modules.component.scss'],
})
export class ServiceModulesComponent implements OnInit {
  subject: Subject<any> = new Subject();
  title = 'Manage Service Modules | Estimation Calculator';
  serviceModulesInfo: serviceModules = new serviceModules();
  serviceModulesform: any = new FormGroup({});
  serviceModulesList: any[] = [];
  checkserviceExists = false;
  @ViewChild(DataTableDirective, { static: false })
  datatableElement: any = DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  config: any = {};

  @ViewChild('addEditServiceModal', { static: false })
  public addEditServiceModal: any = ModalDirective;
  @ViewChild('deleteServiceModal', { static: false })
  public deleteServiceModal: any = ModalDirective;
  requiredValidation: validationFields = new validationFields();

  inValidateCheck: any = {
    timeRequired: false,
  };

  constructor(
    private serviceModulesService: ServiceModulesService,
    private alertService: AlertService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private globalService: GlobalService,
    private fb: FormBuilder
  ) {
    this.getServiceModulesList();
  }

  ngOnInit(): void {
    self = this;
    this.dtOptions = {
      responsive: true,
      scrollX: true,
      scrollY: '350px',
      scrollCollapse: true,
      columnDefs: [
        {
          targets: 3,
          orderable: false,
          searchable: false,
        },
        {
          targets: 5,
          orderable: false,
          searchable: false,
        },
        {
          targets: 6,
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
    this.serviceModulesform = this.fb.group({
      _id: '',
      serviceModule: [
        '',
        [Validators.required, Validators.minLength(10)]
      ],
      timeRequired: [
        '',
        [Validators.required, Validators.min(2)]
      ],
      summary: [
        '',
        [Validators.required, Validators.minLength(10), Validators.maxLength(200)]
      ],
      status: 1
    },
      {
        validators: this.serviceExistValidator
      })
  }

  checkvalidation(key: any) {
    if (this.serviceModulesform.get(key) && this.serviceModulesform.get(key).valid) {
      return 'text-primary';
    } else {
      return 'text-danger';
    }
  }


  get invalidForm() {
    return this.serviceModulesform.controls
  }

  serviceExistValidator() {
    self.checkserviceExists = false;
    if (self.serviceModulesform.get('serviceModule')) {
      let serviceInfo: any = {
        serviceModule: self.serviceModulesform.get('serviceModule').value,
        _id: self.serviceModulesform.get('_id').value,
      }
      if (serviceInfo.serviceModule) {
        if (self.serviceModulesList.length) {
          let foundService = self.serviceModulesList.find((x: any) => {
            if (serviceInfo._id) {
              return (
                serviceInfo._id !== x._id &&
                x.serviceModule.toLowerCase() ===
                serviceInfo.serviceModule.toLowerCase()
              );
            } else {
              return (
                x.serviceModule.toLowerCase() ===
                serviceInfo.serviceModule.toLowerCase()
              );
            }
          });
          if (foundService) {
            self.checkserviceExists = true;
            return { invalid: true }
          } else {
            return null
          }
        } else {
          return null
        }
      } else {
        return null
      }
    } else {
      return null;
    }
  }

  getServiceModulesList() {
    this.serviceModulesService.getServiceModules().subscribe(
      (dataRes: any) => {
        this.spinner.show();
        if (dataRes.status === 200) {
          this.spinner.hide();
          // console.log('serviceModulesList', dataRes);
          this.datatableElement.dtInstance.then(
            (dtInstance: DataTables.Api) => {
              dtInstance.destroy();
              this.dtTrigger.next();
              this.serviceModulesList = dataRes.data;
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
    this.addEditServiceModal.hide();
    this.deleteServiceModal.hide();
    this.validateForm();
  }

  showAddEditModal(serviceModulesInfo?: any) {
    this.alertService.clear();
    this.validateForm();
    this.checkserviceExists = false;
    if (serviceModulesInfo && serviceModulesInfo._id) {
      this.serviceModulesform.reset(serviceModulesInfo);
    }
    this.addEditServiceModal.show();
  }

  showDeleteModal(serviceModulesInfo: any) {
    this.serviceModulesInfo = serviceModulesInfo;
    this.deleteServiceModal.show();
  }


  patternMatchCheck(timeRequiredValue: any, validateType: string) {
    if (timeRequiredValue) {
      const validate = this.globalService.patternMatchRegex(
        timeRequiredValue,
        validateType
      );
      console.log('validate', validate);
      this.inValidateCheck[validateType] = validate;
    } else {
      this.inValidateCheck[validateType] = false;
    }
  }



  addService() {
    const self = this;
    const ObjectKeys = Object.keys(this.requiredValidation);
    let postData = JSON.parse(JSON.stringify(self.serviceModulesInfo));
    const found = ObjectKeys.filter((obj: any) => {
      return !postData[obj];
    });
    this.spinner.show();
    if (found.length) {
      this.alertService.clear();
      this.alertService.error('*Please Fill All Fields are mandatory.');
      this.spinner.hide();
      return false;
    }
    let PostData = JSON.parse(JSON.stringify(this.serviceModulesInfo));
    this.serviceModulesService.saveServiceInfo(PostData).subscribe(
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
          this.getServiceModulesList();
        }
      },
      (error: any) => {
        this.spinner.hide();
        this.toastr.error(error.message, 'Error!');
      }
    );
    return;
  }

  changeServiceStatus(module: any) {
    let postData = {
      _id: module._id,
      status: module.status ? 0 : 1,
    };
    // HERE WE CAN CALL API FOR SAVING DATA
    this.serviceModulesService.saveServiceInfo(postData).subscribe(
      (dataRes: any) => {
        if (dataRes.status === 200) {
          this.spinner.hide();
          dataRes = dataRes.data;
          this.toastr.success(
            'Service status has been changed successfully.',
            'Success!'
          );
          let index = this.serviceModulesList.findIndex(
            (x) => x._id === dataRes._id
          );
          if (index) {
            this.serviceModulesList[index].status = dataRes.status;
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
    this.serviceModulesService.deleteService(this.serviceModulesInfo).subscribe(
      (dataRes) => {
        if (dataRes.status === 200) {
          this.closeModel();
          this.spinner.hide();
          this.getServiceModulesList();
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
