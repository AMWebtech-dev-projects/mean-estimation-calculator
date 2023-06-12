import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { GlobalService } from '../../../../../shared-ui';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  title = 'Dashboard | Estimation Calculator';

  constructor(
    private spinner: NgxSpinnerService,
    private globalService: GlobalService
  ) { }

  ngOnInit(): void {
    this.globalService.getPageTitle(this.title);
    /** spinner starts on init */
    this.spinner.show();

    setTimeout(() => {
      /** spinner ends after 3 seconds */
      this.spinner.hide();
    }, 1000);
  }
}
