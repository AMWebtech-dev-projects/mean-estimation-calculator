import {
  Component,
  OnInit,
  ViewEncapsulation,
  HostListener,
} from '@angular/core';
import { navItems } from '../../nav';
import { currentUser, GlobalService, JwtService } from '../../shared-ui';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../../environments/environment';
declare var $: any;

@Component({
  selector: 'app-dashboard-layout',
  templateUrl: './dashboard-layout.component.html',
  styleUrls: ['./dashboard-layout.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DashboardLayoutComponent implements OnInit {
  // class for desktop version
  addDesktopClass: boolean = true;
  subscription: Subscription = new Subscription();
  fixedHeader: boolean = true;
  showScroll: boolean = true;
  loadingListings: boolean = false;
  showScrollHeight = 100;
  hideScrollHeight = 10;
  // class for mobile version
  addMobClass: boolean = false;
  currentUser: currentUser = new currentUser();
  navItems: any = [];
  constructor(
    private jwtService: JwtService,
    private router: Router,
    private globalService: GlobalService,
    private toastr: ToastrService
  ) {}
  ngOnInit(): void {
    this.currentUser = this.jwtService.getCurrentUser();
    this.subscription = this.globalService
      .getActionChildToParent()
      .subscribe((message) => {
        if (message) {
          this.currentUser = this.jwtService.getCurrentUser();
        }
      });
    if (this.currentUser.user_type === environment.role.adminRole) {
      this.navItems = navItems;
    } else {
      this.navItems = [navItems[1]];
    }
  }

  toggleClass() {
    if (window.innerWidth > 992) {
      // add and remove class on desktop version
      if (!this.addDesktopClass) {
        this.addDesktopClass = true;
      } else {
        this.addMobClass = false;
        this.addDesktopClass = false;
      }
    } else {
      // add and remove class on mobile version
      if (this.addMobClass) {
        this.addMobClass = false;
      } else {
        this.addMobClass = true;
      }
    }
  }

  logout() {
    this.jwtService.destroyToken();
    this.globalService.logOut();
    this.router.navigate(['/login']);
    this.toastr.success('You have logged out successfully. ', 'Success');
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (
      (window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop) > this.showScrollHeight
    ) {
      this.showScroll = true;
      this.fixedHeader = true;
    } else if (
      this.showScroll &&
      (window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop) < this.hideScrollHeight
    ) {
      this.showScroll = false;
      this.fixedHeader = false;
    }
  }

  scrollToTop() {
    $('html, body').animate({ scrollTop: 0 }, 600);
  }
}
