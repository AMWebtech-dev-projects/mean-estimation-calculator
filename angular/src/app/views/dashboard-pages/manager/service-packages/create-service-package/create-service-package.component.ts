import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import {
  AlertService,
  GlobalService,
  JwtService,
  ManageBundlesService,
  ManageServicesService,
  ServicePackagesService,
} from '../../../../../shared-ui';
import { Subject } from 'rxjs';
import {
  servicePackages,
  validationFields,
} from '../models/servicePackages.model';
import { Router } from '@angular/router';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-service-package',
  templateUrl: './create-service-package.component.html',
  styleUrls: ['./create-service-package.component.scss'],
})
export class CreateServicePackageComponent implements OnInit {
  title = 'Create Service Package | Estimation Calculator';
  servicePackagesInfo: servicePackages = new servicePackages();
  servicePackagesForm: any = new FormGroup({});
  servicePackagesList: any[] = [];
  manageServicesList: any[] = [];
  checkserviceExists = false;
  dtTrigger: Subject<any> = new Subject();
  config: any = {};
  timeFrameBundleValues: any[] = [];
  typeList: any[] = [];
  requiredValidation: validationFields = new validationFields();

  constructor(
    private router: Router,
    private bundlesService: ManageBundlesService,
    private jwtService: JwtService,
    private manageService: ManageServicesService,
    private servicePackagesService: ServicePackagesService,
    private alertService: AlertService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private globalService: GlobalService,
    private fb: FormBuilder
  ) {
    this.getManageServicesList();
  }

  ngOnInit(): void {
    this.config = this.jwtService.getConfig();
    this.timeFrameBundleValues = this.config.timeFrameBundle;
    this.typeList = this.config.type;
    this.validateForm();
  }

  validateForm() {
    this.servicePackagesForm = this.fb.group({
      _id: '',
      servicePackage: [
        '',
        [Validators.required, Validators.minLength(5), Validators.maxLength(35)]
      ],
      serviceId: [
        '',
        [Validators.required]
      ],
      essential: this.fb.group({
        timeFrame: [
          '',
          [Validators.required]
        ],
        total: [
          0,
          [Validators.required, Validators.min(1)]
        ],
        fixed: [
          0,
          [Validators.required]
        ],
        recursive: [
          0,
          [Validators.required]
        ]
      }),
      professional: this.fb.group({
        timeFrame: [
          '',
          [Validators.required]
        ],
        total: [
          0,
          [Validators.required, Validators.min(1)]
        ],
        fixed: [
          0,
          [Validators.required]
        ],
        recursive: [
          0,
          [Validators.required]
        ]
      }),
      enterprise: this.fb.group({
        timeFrame: [
          '',
          [Validators.required]
        ],
        total: [
          0,
          [Validators.required, Validators.min(1)]
        ],
        fixed: [
          0,
          [Validators.required]
        ],
        recursive: [
          0,
          [Validators.required]
        ]
      }),
      filterBundlesList: this.fb.array(
        [],
        [Validators.required, Validators.minLength(1)]
      ),
      status: 1
    })
    // this.servicePackagesForm.get("servicePackage").valueChanges.subscribe((val: any) => {
    //   console.log("val========", val);
    //   if (val) {
    //     this.servicePackagesForm.get("serviceId").enable();
    //   } else {
    //     this.servicePackagesForm.get("serviceId").disable();
    //   }
    // });
  }

  get invalidForm() {
    return this.servicePackagesForm.controls
  }

  checkValid(key: string) {
    if (this.servicePackagesForm.get(key) && this.servicePackagesForm.get(key).valid) {
      return 'text-primary';
    } else {
      return 'text-danger';
    }
  }

  invalidCheck(key: string) {
    if (this.servicePackagesForm.get(key) && this.servicePackagesForm.get(key).invalid) {
      return true;
    } else {
      return false;
    }
  }

  getManageServicesList() {
    this.manageService.getManageServices({ status: 1 }).subscribe(
      (dataRes: any) => {
        this.spinner.show();
        if (dataRes.status === 200) {
          this.spinner.hide();
          dataRes = dataRes.data;
          this.manageServicesList = dataRes;
          // console.log("this.manageServicesList", this.manageServicesList);
        }
      },
      (error: any) => {
        this.spinner.hide();
        this.toastr.error(error.message, 'Error!');
      }
    );
  }

  filterListByService(serviceId?: string) {
    console.log("serviceId======", serviceId);
    // let servicePackage = this.servicePackagesInfo.servicePackage;
    let servicePackage = this.servicePackagesForm.get('servicePackage').value
    this.validateForm();
    if (serviceId) {
      let wherObj = { serviceId: serviceId };
      // console.log('wherObj ==', wherObj);
      this.bundlesService.getBundlesList(wherObj).subscribe(
        (dataRes: any) => {
          this.spinner.show();
          // this.servicePackagesInfo = new servicePackages();
          // this.servicePackagesInfo.servicePackage = servicePackage;
          // this.servicePackagesInfo.serviceId = serviceId;
          this.servicePackagesForm.get('serviceId').setValue(serviceId)
          this.servicePackagesForm.get('servicePackage').setValue(servicePackage)
          // this.articleForm.get('full_picture').setValue(this.imageURL);
          if (dataRes.status === 200) {
            this.spinner.hide();
            dataRes = dataRes.data;
            if (dataRes.length) {
              /*  
              1 We can use thing as well for minimum array element
              dataRes.map((item: any) => {
                 this.getFBList.push(new FormControl(item))
               }) */

              // it will be use bulk array
              /* 2 let formData: any = this.servicePackagesForm.controls;
              let preKeySet: any = {}
              Object.keys(formData).map((keyVal) => {
                preKeySet[keyVal] = formData[keyVal]
              })
              preKeySet.filterBundlesList = this.fb.array(dataRes);
              this.servicePackagesForm = this.fb.group(preKeySet); */

              // 3 less code solution
              // https://javascript.plainenglish.io/6-different-ways-to-set-values-for-reactive-forms-a0686f3dca0a
              this.servicePackagesForm.controls['filterBundlesList'] = this.fb.array(dataRes);
              this.servicePackagesForm.value.filterBundlesList = dataRes;

              // this.servicePackagesInfo.filterBundlesList = dataRes;
              // this.servicePackagesForm.get('filterBundlesList').setValue(dataRes)
              // this.servicePackagesForm.controls["filterBundlesList"].setValue(dataRes);
              // this.servicePackagesForm.patchValue({ filterBundlesList: dataRes });
              // this.servicePackagesForm = this.fb.group({
              //   filterBundlesList: this.fb.array(dataRes)
              // });
              // let formData: any = this.servicePackagesForm.value;
              // formData.filterBundlesList = this.fb.array(dataRes);
              // console.log("formData", formData);
              // setTimeout(() => {
              //   this.servicePackagesForm.value = this.servicePackagesForm.reset(formData);
              // });
              this.setResetTimeFrame();

            } else {
              this.toastr.warning(
                'There are not bundles of this service.',
                'Warning!'
              );
            }
          }
        },
        (error: any) => {
          this.spinner.hide();
          this.toastr.error(error.message, 'Error!');
        }
      );
    } else {
      // this.servicePackagesInfo = new servicePackages();
      this.servicePackagesForm.get('serviceId').setValue(serviceId)
      this.servicePackagesForm.get('servicePackage').setValue(servicePackage)
      // this.servicePackagesInfo.servicePackage = servicePackage;
      this.toastr.warning('Please select any service.', 'Warning!');
    }
  }

  get getFBList(): FormArray {
    return this.servicePackagesForm.get('filterBundlesList') as FormArray;
  }

  setResetTimeFrame(timeframeKey?: any) {
    let servicePackagesInfo: any = { ...this.servicePackagesInfo };
    this.getFBList.controls.map((obj: any) => {
      if (timeframeKey) {
        if (!servicePackagesInfo[timeframeKey].timeFrame) {
          obj.value[timeframeKey] = false;
        }
      } else {
        obj.value.essential = false;
        obj.value.professional = false;
        obj.value.enterprise = false;
      }
    });
    if (timeframeKey) {
      // this.servicePackagesForm.controls[timeframeKey]['timeFrame'].enable();
      this.calculations(timeframeKey);
    }
  }

  calculations(key: any) {
    let fixed = 0;
    let recursive = 0;
    this.getFBList.controls.map((obj: any) => {
      obj = obj.value;
      if (obj[key]) {
        if (obj.type === 1) {
          fixed = fixed + obj.servicePrice;
        } else {
          recursive = recursive + obj.servicePrice;
        }
      }
    });
    let servicePackagesInfo: any = { ...this.servicePackagesForm.value };
    // console.log("servicePackagesInfo", servicePackagesInfo);
    servicePackagesInfo[key].fixed = fixed;
    servicePackagesInfo[key].recursive = recursive;
    let recursiveDivide = recursive * servicePackagesInfo[key].timeFrame.factor;
    servicePackagesInfo[key].total = Math.round(fixed + recursiveDivide);
    this.servicePackagesForm.reset(servicePackagesInfo);
    // this.servicePackagesInfo = { ...servicePackagesInfo };
    // setTimeout(() => {
    //   this.servicePackagesForm.value = this.servicePackagesForm.reset(servicePackagesInfo);
    // });
  }

  showType(typeValue: any) {
    if (this.typeList && this.typeList.length) {
      let type: any = this.typeList.find((x) => x.value === typeValue);
      if (type) {
        return type.label;
      } else {
        return '';
      }
    } else {
      return '';
    }
  }
  createPackage() {
    /*  const invalid = [];
     const controls = this.servicePackagesForm.controls;
     for (const name in controls) {
       if (controls[name].invalid) {
         invalid.push(name);
       }
     }
     console.log("invalid==========", invalid); */

    this.alertService.clear();
    if (this.servicePackagesForm.invalid) {
      this.alertService.error('*Please Fill All Fields are mandatory.');
      return false
    }

    this.spinner.show();
    // let PostData = JSON.parse(JSON.stringify(this.servicePackagesInfo));
    let PostData = JSON.parse(JSON.stringify(this.servicePackagesForm.value));
    let postPackage: any = {
      servicePackage: PostData.servicePackage,
      serviceId: PostData.serviceId,
      essential: PostData.essential.total,
      professional: PostData.professional.total,
      enterprise: PostData.enterprise.total,
      status: PostData.status,
      packageData: JSON.stringify(PostData),
    };
    this.servicePackagesService.saveServicePackage(postPackage).subscribe(
      (dataRes: any) => {
        if (dataRes.status === 200) {
          this.spinner.hide();
          this.toastr.success(dataRes.message, 'Success!');
          dataRes = dataRes.data;
          this.reloadCurrentPage();
        }
      },
      (error: any) => {
        this.spinner.hide();
        this.toastr.error(error.message, 'Error!');
      }
    );
    return;
  }

  reloadCurrentPage() {
    let currentUrl = this.router.url;
    this.router
      .navigateByUrl('/RefreshComponent', { skipLocationChange: true })
      .then(() => {
        this.router.navigate([currentUrl]);
      });
  }
}
