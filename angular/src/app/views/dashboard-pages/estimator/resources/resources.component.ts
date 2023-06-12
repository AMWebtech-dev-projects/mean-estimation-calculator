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
  ManageServicesService,
  RegionsService,
  SavedProposalService,
  SubRegionsService,
  validationFields,
} from '../../../../shared-ui';
import { resource } from './models/resources.model';
import { Options } from '@angular-slider/ngx-slider';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-resources',
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.scss'],
})
export class ResourcesComponent implements OnInit {
  title = 'Resources Calculation | Estimation Calculator';
  resourceInfo: resource = new resource();
  manageServicesList: any[] = [];
  subRegionsList: any[] = [];
  hourlyWiseConfig: any = {};
  requiredValidation: validationFields = new validationFields();
  optionsResources: Options = {
    floor: 1,
    ceil: 20,
    autoHideLimitLabels: true,
    showSelectionBar: true,
  };
  optionsMonthly: Options = {
    floor: 1,
    ceil: 12,
    autoHideLimitLabels: true,
    showSelectionBar: true,
  };

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
    let id = this.activatedRoute.snapshot.params.id;
    if (id) {
      this.resourceInfoIdData(id);
      this.getRegionDetail();
    }
  }

  resourceInfoIdData(id: any) {
    this.savedProposalService.getProposal({ _id: id }).subscribe(
      (dataRes: any) => {
        // this.spinner.show();
        if (dataRes.status === 200) {
          dataRes = dataRes.data[0];
          this.resourceInfo = JSON.parse(dataRes.estimationData);
          this.spinner.hide();
        }
      },
      (error: any) => {
        this.spinner.hide();
        this.toastr.error(error.message, 'Error!');
      }
    );
  }

  ngOnInit(): void {
    this.globalService.getPageTitle(this.title);
    this.hourlyWiseConfig = this.jwtService.getConfig().resourcesCalculation;
    this.optionsResources.floor = this.hourlyWiseConfig.resources.min;
    this.optionsResources.ceil = this.hourlyWiseConfig.resources.max;
    this.optionsMonthly.floor = this.hourlyWiseConfig.timeFrameInMonths.min;
    this.optionsMonthly.ceil = this.hourlyWiseConfig.timeFrameInMonths.max;
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
      const subRegionInfo = this.subRegionsList.find((subReg) => subReg._id === subRegionId)
      let wherObj = { _id: subRegionInfo.regionId, status: 1 };
      this.regionsService.getRegionsList(wherObj).subscribe(
        (dataRes: any) => {
          this.spinner.show();
          if (dataRes.status === 200) {
            this.spinner.hide();
            dataRes = dataRes.data;
            // console.log('RegiondataResponse == ', dataRes);
            if (dataRes.length) {
              this.resourceInfo.region = Object.assign({}, ...dataRes);
            } else {
              this.resourceInfo.region = {};
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
      this.resourceInfo.region = {};
      this.calculation();
    }
  }

  calculation(serviceId?: string) {
    if (serviceId) {
      this.resourceInfo.selectedService = this.manageServicesList.find(
        (service) => serviceId === service._id
      );
    }
    let timeIndex = this.resourceInfo.resources * this.resourceInfo.months;
    this.resourceInfo.timeIndex = timeIndex;
    let rateIndex =
      (this.resourceInfo.selectedService.monthlyPrice *
        this.resourceInfo.selectedService.expertise) /
      10;
    /*console.log("timeIndex ====", timeIndex)
     console.log("rateIndex ====", rateIndex) */
    //  let rateOffered = 1;
    let rateOffered = rateIndex;

    if (timeIndex > 59) {
      rateOffered = rateIndex * 0.7;
    } else if (timeIndex > 23) {
      rateOffered = rateIndex * 0.8;
    } else if (timeIndex > 10) {
      rateOffered = rateIndex * 0.9;
    }

    const finalPrice =
      rateOffered *
      this.resourceInfo.region.regionFactor *
      this.resourceInfo.currencies.currencyFactor;
    const discountPrice = (finalPrice * this.resourceInfo.discount) / 100;
    const finalPriceWithDiscount = finalPrice - discountPrice;
    // this.resourceInfo.finalPriceWithDiscount = finalPriceWithDiscount;
    this.resourceInfo.finalPriceWithDiscount = (
      Math.round(finalPriceWithDiscount * 100) / 100
    ).toFixed(2);

    // const totalMonthlyCost = finalPriceWithDiscount * this.resourceInfo.resources;
    // this.resourceInfo.totalMonthlyCost = totalMonthlyCost;
    this.resourceInfo.totalMonthlyCost = Math.round(
      (finalPriceWithDiscount * this.resourceInfo.resources * 100) / 100
    ).toFixed(2);

    const totalProjectCost =
      finalPriceWithDiscount *
      this.resourceInfo.resources *
      this.resourceInfo.months;
    this.resourceInfo.totalProjectCost = totalProjectCost;
    this.resourceInfo.validate = this.validateForm();
  }

  validateForm() {
    const validate =
      this.resourceInfo.regionId &&
        this.resourceInfo.region._id &&
        this.resourceInfo.selectedService &&
        this.resourceInfo.resources &&
        this.resourceInfo.totalMonthlyCost &&
        this.resourceInfo.totalProjectCost &&
        this.resourceInfo.months
        ? true
        : false;
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
    let PostData = JSON.parse(JSON.stringify(this.resourceInfo));
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

  saveProposal() {
    const self = this;
    this.spinner.show();
    let PostData = JSON.parse(JSON.stringify(this.resourceInfo));
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
}
