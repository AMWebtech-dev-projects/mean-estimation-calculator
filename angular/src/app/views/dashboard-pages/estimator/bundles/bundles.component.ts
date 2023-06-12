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
  SubRegionsService,
  validationFields,
} from '../../../../shared-ui';
import { bundles } from './models/bundles.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-bundles',
  templateUrl: './bundles.component.html',
  styleUrls: ['./bundles.component.scss']
})
export class BundlesComponent implements OnInit {

  title = 'Bundles Calculation | Estimation Calculator';
  serviceInfo: bundles = new bundles();
  manageServicesList: any[] = [];
  subRegionsList: any[] = [];
  timeFrameBundleValues: any[] = [];
  typeList: any[] = [];
  Selectedbundles: any[] = [];
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
    private bundlesService: ManageBundlesService,
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
      this.serviceInfoIdData(id);
      this.getRegionDetail();
    }
  }

  ngOnInit(): void {
    this.globalService.getPageTitle(this.title);
    this.timeFrameBundleValues = this.jwtService.getConfig().timeFrameBundle;
    this.typeList = this.jwtService.getConfig().type;
  }

  serviceInfoIdData(id: any) {
    this.savedProposalService.getProposal({ _id: id }).subscribe(
      (dataRes: any) => {
        if (dataRes.status === 200) {
          dataRes = dataRes.data[0];
          this.serviceInfo = JSON.parse(dataRes.estimationData);
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
              this.serviceInfo.region = Object.assign({}, ...dataRes);
            } else {
              this.serviceInfo.region = {};
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
      this.serviceInfo.region = {};
      this.calculation();
    }
  }

  filterListByService(serviceId?: string) {
    this.spinner.show();
    if (serviceId) {
      this.serviceInfo.selectedService = this.manageServicesList.find((service) => service._id === serviceId);
      let wherObj = { serviceId: serviceId };
      // console.log('wherObj ==', wherObj);
      this.bundlesService.getBundlesList(wherObj).subscribe(
        (dataRes: any) => {
          this.serviceInfo.serviceId = serviceId;
          if (dataRes.status === 200) {
            this.spinner.hide();
            dataRes = dataRes.data;
            if (dataRes.length) {
              dataRes.map((obj: any) => {
                obj.isSelected = false;
              });
              this.serviceInfo.filterBundlesList = dataRes;
              // console.log('this.serviceInfo.filterBundlesList',this.serviceInfo.filterBundlesList);
            } else {
              this.serviceInfo.filterBundlesList = [];
              this.toastr.warning(
                'There are not bundles of this service.',
                'Warning!'
              );
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
      this.serviceInfo.filterBundlesList = [];
      this.calculation();
      this.toastr.warning('Please select any service.', 'Warning!');
    }
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

  onChangeofOptions(timeFrameId: any) {
    if (timeFrameId && this.timeFrameBundleValues.length) {
      this.serviceInfo.timeFrame = this.timeFrameBundleValues.find(
        (obj: any) => obj.id === timeFrameId
      );
    }
    this.calculation();
  }

  calculation(serviceId?: string) {
    if (serviceId) {
      this.serviceInfo.selectedService = this.manageServicesList.find(
        (service) => serviceId === service._id
      );
    }

    let bundlesRecursive = this.serviceInfo.filterBundlesList.filter(
      (obj: any) => obj.isSelected && Number(obj.type) === 2
    );
    let bundlesFixed = this.serviceInfo.filterBundlesList.filter(
      (obj: any) => obj.isSelected && Number(obj.type) === 1
    );

    let totalRecursiveBundlePrice = 0;
    let totalFixedBundlePrice = 0;

    bundlesRecursive.map(
      (x) => (totalRecursiveBundlePrice += Number(x.servicePrice))
    );

    bundlesFixed.map(
      (x) => (totalFixedBundlePrice += Number(x.servicePrice))
    );

    const finalPrice =
      totalRecursiveBundlePrice *
      this.serviceInfo.timeFrame.label *
      this.serviceInfo.timeFrame.factor +
      totalFixedBundlePrice;

    const discountPrice = (finalPrice * this.serviceInfo.discount) / 100;
    const finalPriceWithDiscount = finalPrice - discountPrice;
    this.serviceInfo.finalPriceWithDiscount = finalPriceWithDiscount * this.serviceInfo.currencies.currencyFactor * this.serviceInfo.region.regionFactor;

    this.serviceInfo.finalPriceWithDiscount = (
      Math.round(this.serviceInfo.finalPriceWithDiscount * 100) / 100
    ).toFixed(2);

    // console.log("bundlesRecursive======", bundlesRecursive);
    // console.log("bundlesFixed======", bundlesFixed);
    // console.log("finalPrice======", finalPrice);
    // console.log('finalPriceWithDiscount', this.serviceInfo.finalPriceWithDiscount);
    this.serviceInfo.validate = this.validateForm();
  }

  validateForm() {
    this.Selectedbundles = this.serviceInfo.filterBundlesList.filter((obj: any) => obj.isSelected);
    const validate =
      this.serviceInfo.regionId &&
        this.serviceInfo.region._id &&
        this.serviceInfo.selectedService && this.serviceInfo.filterBundlesList.length && this.Selectedbundles.length && this.serviceInfo.timeFrameId ? true : false;
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
    let PostData = JSON.parse(JSON.stringify(this.serviceInfo));
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
    let PostData = JSON.parse(JSON.stringify(this.serviceInfo));
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
