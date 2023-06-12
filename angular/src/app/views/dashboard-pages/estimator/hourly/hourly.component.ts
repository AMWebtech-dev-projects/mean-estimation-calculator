import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ModalDirective } from 'ngx-bootstrap/modal';
import jsPDF from 'jspdf';

import {
  AlertService,
  GlobalService,
  JwtService,
  ManageServicesService,
  RegionsService,
  SavedProposalService,
  SubRegionsService,
  validationFields
} from '../../../../shared-ui';
import { hourly } from './models/hourly.model';
import { Options } from '@angular-slider/ngx-slider';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-hourly',
  templateUrl: './hourly.component.html',
  styleUrls: ['./hourly.component.scss'],
})
export class HourlyComponent implements OnInit {
  title = 'Hourly Calculation | Estimation Calculator';
  hourlyInfo: hourly = new hourly();
  manageServicesList: any[] = [];
  subRegionsList: any[] = [];
  hourlyWiseConfig: any = {};
  requiredValidation: validationFields = new validationFields();
  optionsHourly: Options = {
    floor: 5,
    ceil: 40,
    autoHideLimitLabels: true,
    showSelectionBar: true,
  };
  optionsWeekly: Options = {
    floor: 1,
    ceil: 52,
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
      this.hourlyInfoIdData(id);
      this.getRegionDetail();
    }
  }

  hourlyInfoIdData(id: any) {
    this.savedProposalService.getProposal({ _id: id }).subscribe(
      (dataRes: any) => {
        // this.spinner.show();
        if (dataRes.status === 200) {
          dataRes = dataRes.data[0];
          this.hourlyInfo = JSON.parse(dataRes.estimationData);
          // var pair = { hourId:  dataRes._id };
          // this.hourlyInfo = { ...this.hourlyInfo, ...pair };
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
    this.hourlyWiseConfig = this.jwtService.getConfig().hourlyCalculation;
    this.optionsHourly.floor = this.hourlyWiseConfig.weeklyhours.min;
    this.optionsHourly.ceil = this.hourlyWiseConfig.weeklyhours.max;
    this.optionsWeekly.floor = this.hourlyWiseConfig.timeFrameInWeeks.min;
    this.optionsWeekly.ceil = this.hourlyWiseConfig.timeFrameInWeeks.max;
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
      // console.log('subRegionInfo ++',subRegionInfo);
      let wherObj = { _id: subRegionInfo.regionId, status: 1 };
      this.regionsService.getRegionsList(wherObj).subscribe(
        (dataRes: any) => {
          this.spinner.show();
          if (dataRes.status === 200) {
            this.spinner.hide();
            dataRes = dataRes.data;
            // console.log('RegiondataResponse == ', dataRes);
            if (dataRes.length) {
              this.hourlyInfo.region = Object.assign({}, ...dataRes);
            } else {
              this.hourlyInfo.region = {};
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
      this.hourlyInfo.region = {};
      this.calculation();
    }
  }

  calculation(serviceId?: string) {
    if (serviceId) {
      this.hourlyInfo.selectedService = this.manageServicesList.find(
        (service) => serviceId === service._id
      );
    }
    let timeIndex = this.hourlyInfo.hourly * this.hourlyInfo.weeks;
    this.hourlyInfo.timeIndex = timeIndex;
    let expertiseIndex = this.hourlyInfo.selectedService.expertise ** 2; // ES6 syntax
    let rateIndex =
      this.hourlyInfo.selectedService.hourlyPrice * (expertiseIndex / 100);
    /*console.log("timeIndex ====", timeIndex)
     console.log("expertiseIndex ====", expertiseIndex)
     console.log("rateIndex ====", rateIndex) */

    let rateOffered = 1;
    if (timeIndex > 600) {
      rateOffered = rateIndex * 0.8;
    } else if (timeIndex > 400) {
      rateOffered = rateIndex * 0.9;
    } else if (timeIndex < 200) {
      rateOffered = rateIndex * 1.25;
    } else {
      rateOffered = rateIndex * 1;
    }

    const finalPrice =
      rateOffered *
      this.hourlyInfo.region.regionFactor *
      this.hourlyInfo.currencies.currencyFactor;
    const discountPrice = (finalPrice * this.hourlyInfo.discount) / 100;
    const finalPriceWithDiscount = finalPrice - discountPrice;
    this.hourlyInfo.finalPriceWithDiscount = (
      Math.round(finalPriceWithDiscount * 100) / 100
    ).toFixed(2);
    this.hourlyInfo.totalCost = Math.round(
      (finalPriceWithDiscount * this.hourlyInfo.timeIndex * 100) / 100
    ).toFixed(2);
    this.hourlyInfo.validate = this.validateForm();
  }

  calculationModal() {
    this.alertService.clear();
    this.saveCalculationModal.show();
  }

  closeModel() {
    this.saveCalculationModal.hide();
    this.estimatorPdfModal.hide();
  }

  validateForm() {
    const validate =
      this.hourlyInfo.regionId &&
        this.hourlyInfo.region._id &&
        this.hourlyInfo.selectedService &&
        this.hourlyInfo.hourly &&
        this.hourlyInfo.totalCost &&
        this.hourlyInfo.weeks
        ? true
        : false;
    return validate;
  }

  showCalculationInPdf() {
    let PostData = JSON.parse(JSON.stringify(this.hourlyInfo));
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
    let PostData = JSON.parse(JSON.stringify(this.hourlyInfo));
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

  /*  public downloadAsPDF(): void {
     let DATA = document.getElementById('hourlyTemplate') as HTMLCanvasElement;
     html2canvas(DATA, { scale: 2 }).then((canvas) => {
       // let fileHeight = canvas.height * fileWidth / canvas.width;
       const FILEURI: any = canvas.toDataURL();
       let PDF = new jsPDF('p', 'mm', 'a4');
       PDF.addImage(FILEURI, 'JPEG', 0, 0, 210, 297);
       PDF.save('angular-demo.pdf');
       this.closeModel();
       this.router.navigate(['/saved-proposal']);
     });
   } */

  // public downloadAsPDF() {
  //   let DATA = document.getElementById('hourlyTemplate') as HTMLCanvasElement;
  //   var canvas = document.createElement("canvas");
  //   html2canvas(DATA).then(canvas => {
  //     var data = canvas.toDataURL();
  //     console.log('FILEURI', data);
  //     var docDefinition:any = {
  //       content: [{
  //         image: data,
  //         width: 550,
  //         height: 800,
  //         // fit: '50',
  //         alignment: 'center',
  //       }],
  //     };
  //     pdfMake.createPdf(docDefinition).download("Score_Details.pdf");
  //   });
  // }
}
