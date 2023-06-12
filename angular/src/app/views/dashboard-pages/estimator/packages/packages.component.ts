import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ModalDirective } from 'ngx-bootstrap/modal';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

import {
  AlertService,
  GlobalService,
  ManageServicesService,
  RegionsService,
  SavedProposalService,
  ServicePackagesService,
  SubRegionsService,
  validationFields,
} from '../../../../shared-ui';
import { packages } from './models/package.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-packages',
  templateUrl: './packages.component.html',
  styleUrls: ['./packages.component.scss']
})
export class PackagesComponent implements OnInit {

  title = 'Packages Calculation | Estimation Calculator';
  packageInfo: packages = new packages();
  manageServicesList: any[] = [];
  subRegionsList: any[] = [];
  servicePackagesList: any[] = [];
  radioSelected: any;
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
    private servicePackagesService: ServicePackagesService,
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
      this.packageInfoIdData(id);
      this.getRegionDetail();
    }
  }

  ngOnInit(): void {
    this.globalService.getPageTitle(this.title);
  }

  packageInfoIdData(id: any) {
    this.savedProposalService.getProposal({ _id: id }).subscribe(
      (dataRes: any) => {
        if (dataRes.status === 200) {
          dataRes = dataRes.data[0];
          this.packageInfo = JSON.parse(dataRes.estimationData);
          this.spinner.hide();
        }
        this.getSelecteditem();
      },
      (error: any) => {
        this.spinner.hide();
        this.toastr.error(error.message, 'Error!');
      }
    );
  }

  getSelecteditem() {
    this.radioSelected = this.packageInfo.filterPackagesList.find(Item => Item._id === this.packageInfo.selectedPackage._id);
    // console.log('this.radioSelected ', this.radioSelected);
    // this.packageInfo.selectedPackage = JSON.stringify(radioSelected);
    this.calculation();
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
              this.packageInfo.region = Object.assign({}, ...dataRes);
            } else {
              this.packageInfo.region = {};
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
      this.packageInfo.region = {};
      this.calculation();
    }
  }

  filterPackagesByService(serviceId?: string) {
    if (serviceId) {
      this.packageInfo.selectedService = this.manageServicesList.find(
        (service) => serviceId === service._id
      );
      let wherObj = { serviceId: serviceId };
      this.servicePackagesService.getservicePackages(wherObj).subscribe(
        (dataRes: any) => {
          this.spinner.show();
          if (dataRes.status === 200) {
            this.spinner.hide();
            dataRes = dataRes.data;
            if (dataRes.length) {
              this.packageInfo.filterPackagesList = dataRes;
              // console.log('this.packageInfo.filterPackagesList',this.packageInfo.filterPackagesList);
            } else {
              this.packageInfo.filterPackagesList = [];
              this.packageInfo.selectedPackage = '';
              this.toastr.warning(
                'There are no packages of this service.',
                'Warning!');
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
      this.packageInfo.filterPackagesList = [];
      this.packageInfo.selectedPackage = '';
      this.calculation();
      this.toastr.warning('Please select any service.', 'Warning!');
    }
  }

  calculation(serviceId?: string) {
    if (serviceId) {
      this.packageInfo.selectedService = this.manageServicesList.find(
        (service) => serviceId === service._id
      );
    }
    if (this.packageInfo.selectedPackageId && this.packageInfo.filterPackagesList.length) {
      this.packageInfo.selectedPackage = this.packageInfo.filterPackagesList.find(
        (service) => this.packageInfo.selectedPackageId === service._id
      );
    }
    this.packageInfo.validate = this.validateForm();
  }

  validateForm() {
    const validate =
      this.packageInfo.regionId &&
        this.packageInfo.region._id && this.packageInfo.selectedPackage && this.packageInfo.serviceId ? true : false;
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
    let PostData = JSON.parse(JSON.stringify(this.packageInfo));
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
    let PostData = JSON.parse(JSON.stringify(this.packageInfo));
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
