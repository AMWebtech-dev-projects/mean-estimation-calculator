import { Component, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { NgxSpinnerService } from 'ngx-spinner';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { servicePackages } from '../models/servicePackages.model';
import {
  AlertService,
  GlobalService,
  ManageServicesService,
  ServicePackagesService,
} from '../../../../../shared-ui';
import { Router } from '@angular/router';

@Component({
  selector: 'app-overview-service-package',
  templateUrl: './overview-service-package.component.html',
  styleUrls: ['./overview-service-package.component.scss'],
})
export class OverviewServicePackageComponent implements OnInit {
  title = 'Manage Service Packages | Estimation Calculator';
  servicePackagesInfo: servicePackages = new servicePackages();
  servicePackagesList: any[] = [];
  @ViewChild(DataTableDirective, { static: false })
  datatableElement: any = DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  createPackageshow = false;
  manageServicesList: any[] = [];

  @ViewChild('deletePackageModal', { static: false })
  public deletePackageModal: any = ModalDirective;

  constructor(
    private router: Router,
    private servicePackagesService: ServicePackagesService,
    private alertService: AlertService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private globalService: GlobalService,
    private manageService: ManageServicesService
  ) { }

  ngOnInit(): void {
    this.getServicePackagesList();
    this.getManageServicesList();
    this.dtOptions = {
      responsive: true,
      scrollX: true,
      scrollY: '350px',
      scrollCollapse: true,
      columnDefs: [
        {
          targets: 7,
          orderable: false,
          searchable: false,
        },
        {
          targets: 8,
          orderable: false,
          searchable: false,
        },
      ],
    };
    this.globalService.getPageTitle(this.title);
  }

  ngAfterViewInit(): void {
    this.dtTrigger.next();
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

  getServicePackagesList() {
    this.servicePackagesService.getservicePackages().subscribe(
      (dataRes: any) => {
        this.spinner.show();
        if (dataRes.status === 200) {
          this.spinner.hide();
          // console.log('servicePackagesList', dataRes);
          this.datatableElement.dtInstance.then(
            (dtInstance: DataTables.Api) => {
              dtInstance.destroy();
              this.dtTrigger.next();
              this.servicePackagesList = dataRes.data;
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

  createPackage() {
    // this.router.navigate(['service-packages/createServicePackage']); // navigate to other page
    this.createPackageshow = true;
  }

  changeServiceStatus(packageInfo: any) {
    let postData = {
      _id: packageInfo._id,
      status: packageInfo.status ? 0 : 1,
    };
    // HERE WE CAN CALL API FOR SAVING DATA
    this.servicePackagesService.saveServicePackage(postData).subscribe(
      (dataRes: any) => {
        if (dataRes.status === 200) {
          this.spinner.hide();
          dataRes = dataRes.data;
          this.toastr.success(
            'Service status has been changed successfully.',
            'Success!'
          );
          let index = this.servicePackagesList.findIndex(
            (x) => x._id === dataRes._id
          );
          if (index) {
            this.servicePackagesList[index].status = dataRes.status;
          }
        }
      },
      (error: any) => {
        this.spinner.hide();
        this.toastr.error(error.message, 'Error!');
      }
    );
  }

  showDeleteModal(packageInfo: any) {
    this.servicePackagesInfo = packageInfo;
    this.deletePackageModal.show();
  }

  closeModel() {
    this.deletePackageModal.hide();
  }

  deleteService() {
    this.spinner.show();
    this.servicePackagesService
      .deleteService(this.servicePackagesInfo)
      .subscribe(
        (dataRes) => {
          if (dataRes.status === 200) {
            this.closeModel();
            this.spinner.hide();
            this.getServicePackagesList();
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
  showServiceName(serviceId: any) {
    if (this.manageServicesList && this.manageServicesList.length) {
      let foundServiceName = this.manageServicesList.find(
        (x) => x._id === serviceId
      );
      if (foundServiceName) {
        return foundServiceName.serviceName;
      } else {
        return '';
      }
    } else {
      return '';
    }
  }
}
