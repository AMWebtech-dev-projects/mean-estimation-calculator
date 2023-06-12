import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ModalDirective } from 'ngx-bootstrap/modal';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

import {
  AlertService,
  GlobalService,
  JwtService,
  ManageBundlesService,
  ManageServicesService,
  RegionsService,
  SavedProposalService,
  ServiceModulesService,
  SubRegionsService,
  validationFields,
} from '../../../../shared-ui';
import { serviceModule } from './models/module.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-service-module',
  templateUrl: './user-service-module.component.html',
  styleUrls: ['./user-service-module.component.scss']
})
export class UserServiceModuleComponent implements OnInit {

  title = 'Service ModulesWise Calculation | Estimation Calculator';
  userServiceModule: serviceModule = new serviceModule();
  manageServicesList: any[] = [];
  subRegionsList: any[] = [];
  servicePackagesList: any[] = [];
  usersCount: any[] = [];
  requiredValidation: validationFields = new validationFields();

  @ViewChild('hourlyTemplate') hourlyTemplate!: ElementRef;

  @ViewChild('saveCalculationModal', { static: false })
  public saveCalculationModal: any = ModalDirective;

  @ViewChild('estimatorPdfModal', { static: false })
  public estimatorPdfModal: any = ModalDirective;

  DateRange: any = {
    minDate: new Date(),
    maxDate: new Date()
  }

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private savedProposalService: SavedProposalService,
    private manageService: ManageServicesService,
    private subRegionsService: SubRegionsService,
    private regionsService: RegionsService,
    private serviceModulesService: ServiceModulesService,
    private jwtService: JwtService,
    private alertService: AlertService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private globalService: GlobalService
  ) {
    this.DateRange.minDate.setDate(this.DateRange.minDate.getDate());
    this.DateRange.maxDate.setDate(this.DateRange.minDate.getDate() + 20);

    this.getManageServicesList();
    this.getSubRegionsList();
    this.getServiceModulesList();
    let id = this.activatedRoute.snapshot.params.id;
    if (id) {
      this.userServiceModuleIdData(id);
      this.getRegionDetail();
    }
  }

  ngOnInit(): void {
    this.globalService.getPageTitle(this.title);
    this.usersCount = this.jwtService.getConfig().usersCount;
  }

  userServiceModuleIdData(id: any) {
    this.savedProposalService.getProposal({ _id: id }).subscribe(
      (dataRes: any) => {
        if (dataRes.status === 200) {
          dataRes = dataRes.data[0];
          this.userServiceModule = JSON.parse(dataRes.estimationData);
          this.spinner.hide();
        }
      },
      (error: any) => {
        this.spinner.hide();
        this.toastr.error(error.message, 'Error!');
      }
    );
  }

  getManageServicesList() {
    this.manageService.getManageServices({ status: 1 }).subscribe(
      (dataRes: any) => {
        this.spinner.show();
        if (dataRes.status === 200) {
          this.spinner.hide();
          dataRes = dataRes.data;
          this.manageServicesList = dataRes;
        }
      },
      (error: any) => {
        this.spinner.hide();
        this.toastr.error(error.message, 'Error!');
      }
    );
  }

  getSubRegionsList() {
    this.subRegionsService.getSubRegionsList().subscribe(
      (dataRes: any) => {
        this.spinner.show();
        if (dataRes.status === 200) {
          this.spinner.hide();
          dataRes = dataRes.data;
          this.subRegionsList = dataRes;
          // console.log('subRegionsList', this.subRegionsList);
          this.spinner.hide();
        }
      },
      (error: any) => {
        this.spinner.hide();
        this.toastr.error(error.message, 'Error!');
      }
    );
  }

  getRegionDetail(subRegionId?: string) {
    if (subRegionId) {
      const subRegionInfo = this.subRegionsList.find((subReg) => subReg._id === subRegionId);
      let wherObj = { _id: subRegionInfo.regionId, status: 1 };
      this.regionsService.getRegionsList(wherObj).subscribe(
        (dataRes: any) => {
          this.spinner.show();
          if (dataRes.status === 200) {
            this.spinner.hide();
            dataRes = dataRes.data;
            // console.log('RegiondataResponse == ', dataRes);
            if (dataRes.length) {
              this.userServiceModule.region = Object.assign({}, ...dataRes);
            } else {
              this.userServiceModule.region = {};
            }
          }
          this.calculation();
        },
        (error: any) => {
          this.spinner.hide();
          this.toastr.error(error.message, 'Error!');
        }
      );
    } else {
      this.userServiceModule.region = {};
      this.calculation();
    }
  }

  getServiceModulesList() {
    this.serviceModulesService.getServiceModules().subscribe((dataRes: any) => {
      this.spinner.show();
      if (dataRes.status === 200) {
        this.spinner.hide();
        dataRes = dataRes.data;
        if (dataRes.length) {
          dataRes.map((obj: any) => {
            obj.isSelected = false;
            obj.unit = 1;
          });
          this.userServiceModule.clone.serviceModulesList = dataRes;
          // this.userServiceModule.userwise = [JSON.parse(JSON.stringify(this.userServiceModule.clone))];
        } else {
          this.userServiceModule.clone.serviceModulesList = [];
          this.toastr.warning(
            'There are no modules of this service.',
            'Warning!'
          );
        }
      }
    }, (error: any) => {
      this.spinner.hide()
      this.toastr.error(error.message, 'Error!');
    });
  }

  userwiseCollection() {
    if (this.userServiceModule.userCount) {
      this.userServiceModule.userwise = [];
      for (let i = 0; i < this.userServiceModule.userCount; i++) {
        this.userServiceModule.userwise.push(JSON.parse(JSON.stringify(this.userServiceModule.clone)));
      }
      this.calculation();
    } else {
      this.userServiceModule.userwise = [];
      this.calculation();
    }
  }

  filterPackagesByService(serviceId?: string) {
    if (serviceId) {
      this.userServiceModule.selectedService = this.manageServicesList.find(
        (service) => serviceId === service._id
      );
      this.calculation();
    } else {
      this.calculation();
      this.toastr.warning('Please select any service.', 'Warning!');
    }
  }

  calculation(serviceId?: string) {
    if (serviceId) {
      this.userServiceModule.selectedService = this.manageServicesList.find(
        (service) => serviceId === service._id
      );
    }
    let totalModuleDays = 0;
    this.userServiceModule.userwise.map((item: any) => {
      if (item.userType) {
        item.serviceModulesList.map(
          (x: any) => {
            if (x.unit && x.isSelected) {
              totalModuleDays += Number(x.timeRequired * x.unit)
            }
          });
      }
    });
    this.userServiceModule.totalModuleDays = totalModuleDays;

    const approx_Days = this.jwtService.getConfig().approx_Days
    let approxDayCal: any = approx_Days.find((dayCondition: any) =>
      dayCondition.greaterThan <= totalModuleDays && dayCondition.lessThan >= totalModuleDays);
    this.userServiceModule.approxDayCal = Math.round(totalModuleDays / approxDayCal.divideValDays);

    let totalModuleDaysWithPrice = totalModuleDays * this.userServiceModule.selectedService.hourlyPrice * this.userServiceModule.currencies.currencyFactor * this.userServiceModule.region.regionFactor;

    const finalPrice = totalModuleDaysWithPrice;
    const discountPrice = (finalPrice * this.userServiceModule.discount) / 100;
    const finalPriceWithDiscount = (finalPrice - discountPrice);

    this.userServiceModule.finalPriceWithDiscount = (Math.round(finalPriceWithDiscount * 100) / 100
    ).toFixed(2);
    this.userServiceModule.validate = this.validateForm();
  }

  validateForm() {
    const validate =
      this.userServiceModule.regionId &&
        this.userServiceModule.totalModuleDays &&
        this.userServiceModule.region._id &&
        this.userServiceModule.approxDayCal &&
        this.userServiceModule.serviceId &&
        this.userServiceModule.finalPriceWithDiscount ? true : false;
    return validate;
  }

  calculationModal() {
    this.alertService.clear();
    this.saveCalculationModal.show();
  }

  closeModel() {
    this.saveCalculationModal.hide();
    this.estimatorPdfModal.hide();
  }

  showCalculationInPdf() {
    let PostData = JSON.parse(JSON.stringify(this.userServiceModule));
    const ObjectKeys = Object.keys(this.requiredValidation);
    const found = ObjectKeys.filter((obj: any) => {
      return !PostData[obj];
    });
    if (found.length) {
      this.alertService.clear();
      this.alertService.error('*Please Fill All Fields are mandatory.');
      this.spinner.hide();
      return false;
    }
    this.alertService.clear();
    this.saveCalculationModal.hide();
    this.estimatorPdfModal.show();
    return;
  }

  downloadAsPDF() {
    this.spinner.show();
    const input = document.getElementById('hourlyTemplate');
    const pdf: any = new jsPDF('p', 'mm', 'a4');
    pdf.html(input, { html2canvas: { scale: 0.198 } }).then(() => {
      pdf.save('download.pdf');
      this.closeModel();
      this.saveProposal();
      this.router.navigate(['/saved-proposal']);
    });
  }

  saveProposal() {
    const self = this;
    this.spinner.show();
    let PostData = JSON.parse(JSON.stringify(this.userServiceModule));
    let postProposal: any = {
      projectName: PostData.projectName,
      prospectName: PostData.prospectName,
      type: PostData.type,
      tags: PostData.tags,
      expiryDate: PostData.expiryDate,
      status: PostData.status,
      estimationData: JSON.stringify(PostData),
    };
    delete postProposal.prospectName;
    delete postProposal.expiryDate;
    this.savedProposalService.saveProposal(postProposal).subscribe(
      (dataRes: any) => {
        if (dataRes.status === 200) {
          this.spinner.hide();
          this.toastr.success(dataRes.message, 'Success!');
          dataRes = dataRes.data;
        }
      },
      (error: any) => {
        this.spinner.hide();
        this.toastr.error(error.message, 'Error!');
      }
    );
    return;
  }
}
