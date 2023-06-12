import { Component, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { NgxSpinnerService } from 'ngx-spinner';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { manageBundles, validationFields } from './models/manageBundles.model';
import { AlertService, GlobalService, JwtService, ManageBundlesService, ManageServicesService } from '../../../../shared-ui';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
var self: any | undefined = {}
@Component({
  selector: 'app-manage-bundles',
  templateUrl: './manage-bundles.component.html',
  styleUrls: ['./manage-bundles.component.scss']
})
export class ManageBundlesComponent implements OnInit {

  title = 'Manage Service Bundles | Estimation Calculator';
  manageBundlesInfo: manageBundles = new manageBundles();
  manageBundlesForm: any = new FormGroup({});
  manageBundlesList: any[] = [];
  manageServicesList: any[] = [];
  checkbundleExists = false;
  @ViewChild(DataTableDirective, { static: false })
  datatableElement: any = DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  config: any = {};
  typeList: any[] = [];
  filterService_id: string = '';
  @ViewChild('addEditBundleServiceModal', { static: false, })
  public addEditBundleServiceModal: any = ModalDirective;
  @ViewChild('deleteBundleServiceModal', { static: false })
  public deleteBundleServiceModal: any = ModalDirective;
  requiredValidation: validationFields = new validationFields();

  constructor(
    private jwtService: JwtService,
    private bundlesService: ManageBundlesService,
    private manageService: ManageServicesService,
    private alertService: AlertService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private globalService: GlobalService,) {
    this.getManageServicesList();
    this.getBundlesList();
  }

  ngOnInit(): void {
    self = this;
    this.config = this.jwtService.getConfig();
    this.typeList = this.config.type;
    this.dtOptions = {
      responsive: true,
      scrollX: true,
      scrollY: '350px',
      scrollCollapse: true,
      columnDefs: [{
        targets: 6,
        orderable: false,
        searchable: false,
      }, {
        targets: 7,
        orderable: false,
        searchable: false,
      },],
    };
    this.globalService.getPageTitle(this.title);
    this.validateForm();
  }

  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }

  validateForm() {
    this.manageBundlesForm = this.fb.group({
      _id: '',
      serviceBundle: [
        '',
        [Validators.required, Validators.minLength(3)]
      ],
      serviceId: [
        '',
        [Validators.required]
      ],
      servicePrice: [
        '',
        [Validators.required, Validators.min(1)]
      ],
      type: [
        '',
        [Validators.required]
      ],
      status: 1
    },
      {
        validators: this.bundleExistValidator
      }
    )
  }

  checkvalidation(key: any) {
    if (this.manageBundlesForm.get(key) && this.manageBundlesForm.get(key).value) {
      return 'text-primary';
    } else {
      return 'text-danger';
    }
  }

  get invalidForm() {
    return this.manageBundlesForm.controls
  }


  getManageServicesList() {
    this.manageService.getManageServices({ status: 1 }).subscribe((dataRes: any) => {
      this.spinner.show();
      if (dataRes.status === 200) {
        this.spinner.hide();
        dataRes = dataRes.data;
        this.manageServicesList = dataRes;
        // console.log("this.manageServicesList", this.manageServicesList);
      }
    }, (error: any) => {
      this.spinner.hide()
      this.toastr.error(error.message, 'Error!');
    });
  }

  showServiceName(serviceId: any) {
    if (this.manageServicesList && this.manageServicesList.length) {
      let foundServiceName = this.manageServicesList.find(x => x._id === serviceId);
      if (foundServiceName) {
        return foundServiceName.serviceName;
      } else {
        return '';
      }
    } else {
      return '';
    }
  }

  getBundlesList() {
    let wherObj: any = {};
    if (this.filterService_id) {
      wherObj.serviceId = this.filterService_id
    }
    this.bundlesService.getBundlesList(wherObj).subscribe((dataRes: any) => {
      this.spinner.show();
      if (dataRes.status === 200) {
        this.spinner.hide();
        dataRes = dataRes.data;
        this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
          dtInstance.destroy();
          this.dtTrigger.next();
          this.manageBundlesList = dataRes;
          // console.log('manageBundlesList',this.manageBundlesList);
          this.spinner.hide();
        });
      }
    }, (error: any) => {
      this.spinner.hide()
      this.toastr.error(error.message, 'Error!');
    });
  }

  showType(typeValue: any) {
    if (this.typeList && this.typeList.length) {
      let type: any = this.typeList.find(x => x.value === typeValue);
      if (type) {
        return type.label;
      } else {
        return '';
      }
    } else {
      return '';
    }
  }

  closeModel() {
    this.addEditBundleServiceModal.hide();
    this.deleteBundleServiceModal.hide();
    this.validateForm()
  }

  showAddEditModal(manageBundlesInfo?: any) {
    this.alertService.clear();
    this.validateForm()
    this.checkbundleExists = false;
    if (manageBundlesInfo && manageBundlesInfo._id) {
      this.manageBundlesForm.reset(manageBundlesInfo)
    }
    this.addEditBundleServiceModal.show();
  }

  showDeleteModal(manageBundlesInfo: any) {
    this.manageBundlesInfo = manageBundlesInfo;
    this.deleteBundleServiceModal.show();
  }



  bundleExistValidator() {
    self.checkbundleExists = false;
    if (self.manageBundlesForm.get('serviceBundle')) {
      let serviceBundleInfo: any = {
        serviceBundle: self.manageBundlesForm.get('serviceBundle').value,
        _id: self.manageBundlesForm.get('_id').value
      }
      if (serviceBundleInfo.serviceBundle) {
        if (self.manageBundlesList.length) {
          let foundBundleService = self.manageBundlesList.find((x: any) => {
            if (serviceBundleInfo._id) {
              return serviceBundleInfo._id !== x._id && x.serviceBundle.toLowerCase() === serviceBundleInfo.serviceBundle.toLowerCase()
            } else {
              return x.serviceBundle.toLowerCase() === serviceBundleInfo.serviceBundle.toLowerCase()
            }
          });
          if (foundBundleService) {
            self.checkbundleExists = true;
            return { invalid: true }
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
      return null
    }
  }

  addService() {
    this.alertService.clear();
    if (this.manageBundlesForm.invalid) {
      this.alertService.error("*Please Fill All Fields are mandatory.");
      return false;
    }
    let PostData = JSON.parse(JSON.stringify(this.manageBundlesForm.value));
    if (!PostData._id) {
      delete PostData._id;
    }
    this.spinner.show();
    this.bundlesService.saveServiceInfo(PostData).subscribe((dataRes: any) => {
      if (dataRes.status === 200) {
        this.spinner.hide();
        this.toastr.success(dataRes.message, 'Success!');
        dataRes = dataRes.data;
        this.closeModel();
        console.log('dataRes', dataRes);
        // if (!regionPostData._id) {
        //   this.regionsList.unshift(dataRes);
        // } else {
        //   let index = this.regionsList.findIndex(x => x._id === dataRes._id);
        //   if (index) {
        //     this.regionsList[index] = dataRes;
        //   }
        // }
        this.getBundlesList();
      }
    }, (error: any) => {
      this.spinner.hide()
      this.toastr.error(error.message, 'Error!');
    });
    return
  }

  changeServiceStatus(manageBundle: any) {
    let postData = {
      _id: manageBundle._id,
      status: manageBundle.status ? 0 : 1
    }
    // HERE WE CAN CALL API FOR SAVING DATA
    this.bundlesService.saveServiceInfo(postData).subscribe((dataRes: any) => {
      if (dataRes.status === 200) {
        dataRes = dataRes.data;
        this.spinner.hide();
        this.toastr.success('Service Bundle status has been changed successfully.', 'Success!');
        let index = this.manageBundlesList.findIndex(x => x._id === dataRes._id);
        if (index) {
          this.manageBundlesList[index].status = dataRes.status;
        }
      }
    }, (error: any) => {
      this.spinner.hide()
      this.toastr.error(error.message, 'Error!');
    });
  }

  deleteService() {
    this.spinner.show();
    this.bundlesService.deleteService(this.manageBundlesInfo).subscribe(
      (dataRes) => {
        if (dataRes.status === 200) {
          this.closeModel();
          this.spinner.hide();
          this.getBundlesList();
          this.toastr.success(dataRes.message, 'Success');
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
