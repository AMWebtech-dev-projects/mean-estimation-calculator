import { Component, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { NgxSpinnerService } from 'ngx-spinner';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { GlobalService, SavedProposalService } from '../../../../shared-ui';
import { Router } from '@angular/router';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-saved-proposal',
  templateUrl: './saved-proposal.component.html',
  styleUrls: ['./saved-proposal.component.scss']
})
export class SavedProposalComponent implements OnInit {
  subject: Subject<any> = new Subject();
  title = 'Manage Proposal | Estimation Calculator';
  proposalsList: any[] = [];
  @ViewChild(DataTableDirective, { static: false })
  datatableElement: any = DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  savedProposalInfo: any = {}
  calculationType: any = environment.calculationType;

  @ViewChild('deleteProposalModal', { static: false })
  public deleteProposalModal: any = ModalDirective;

  constructor(
    private router: Router,
    private savedProposalService: SavedProposalService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private globalService: GlobalService
  ) {
    this.getProposalList();
  }

  ngOnInit(): void {
    this.dtOptions = {
      responsive: true,
      scrollX: true,
      scrollY: '350px',
      scrollCollapse: true,
      columnDefs: [
        {
          targets: 3,
          orderable: false,
          "visible": false,
          searchable: true,
        },
        {
          targets: 5,
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

  getProposalList() {
    this.savedProposalService.getProposal({ status: 1 }).subscribe(
      (dataRes: any) => {
        this.spinner.show();
        if (dataRes.status === 200) {
          this.spinner.hide();
          this.datatableElement.dtInstance.then(
            (dtInstance: DataTables.Api) => {
              dtInstance.destroy();
              this.dtTrigger.next();
              this.proposalsList = dataRes.data;
              // console.log('this.proposalsList', this.proposalsList);
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

  editProposal(proposalInfo: any) {
    this.savedProposalInfo = proposalInfo;
    if (this.savedProposalInfo) {
      if (this.savedProposalInfo.type === this.calculationType.hourly) {
        this.router.navigate(['/hourly', this.savedProposalInfo._id]); // navigate to hourlyWise page;
      } else if (this.savedProposalInfo.type === this.calculationType.resources) {
        this.router.navigate(['/resources', this.savedProposalInfo._id]); // navigate to resourceWise;
      } else if (this.savedProposalInfo.type === this.calculationType.bundle) {
        this.router.navigate(['/bundles', this.savedProposalInfo._id]); // navigate to bundleWise;
      } else if (this.savedProposalInfo.type === this.calculationType.package) {
        this.router.navigate(['/packages', this.savedProposalInfo._id]); // navigate to packageWise;
      }
    }
  }

  showDeleteModal(proposalInfo: any) {
    this.savedProposalInfo = proposalInfo;
    this.deleteProposalModal.show();
  }

  closeModel() {
    this.deleteProposalModal.hide();
  }

  deleteProposal() {
    this.spinner.show();
    this.savedProposalService
      .deleteProposal(this.savedProposalInfo)
      .subscribe(
        (dataRes) => {
          if (dataRes.status === 200) {
            this.closeModel();
            this.spinner.hide();
            this.getProposalList();
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
