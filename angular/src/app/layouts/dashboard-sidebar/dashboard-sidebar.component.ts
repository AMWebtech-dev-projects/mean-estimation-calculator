import { Component, Input, OnInit } from '@angular/core';
import { Event, NavigationEnd, Router } from '@angular/router';
@Component({
  selector: 'app-dashboard-sidebar',
  templateUrl: './dashboard-sidebar.component.html',
  styleUrls: ['./dashboard-sidebar.component.scss'],
})
export class DashboardSidebarComponent implements OnInit {
  currentUrl: any;
  @Input() navItems: any;
  navigationItems: any;
  constructor(private route: Router) {
    this.route.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.currentUrl = event.url;
        setTimeout(() => {
          this.getCurrentNav();
        });
      }
    });
  }
  ngOnInit() {
    this.navigationItems = this.navItems;
  }

  getCurrentNav() {
    this.navigationItems = this.navItems;
    const self = this;
    // console.log('self.currentUrl', self.currentUrl);
    self.navigationItems.filter((element: any) => {
      if (self.currentUrl === element.url) {
        element.showHide = true;
        element.class = 'active';
      }
      if (element.children && element.children.length) {
        const childactive = element.children.filter((childElement: any) => {
          childElement.class = '';
          return (
            '/' + self.currentUrl.split('/')[1] === childElement.url ||
            self.currentUrl === childElement.url
          );
          // return self.currentUrl === childElement.url;
        });
        if (childactive.length) {
          element.class = 'active';
          const index = element.children.indexOf(childactive[0]);
          element.children[index].class = 'active';
          element.showHide = true;
        } else {
          element.showHide = false;
          element.class = '';
        }
      }
    });
  }

  addSubmenu(parentIndex: any, childIndex?: any) {
    this.navigationItems.filter((element: any) => {
      if (this.navigationItems[parentIndex].name !== element.name) {
        element.showHide = false;
        element.class = '';
        this.checkChildMenu(element, childIndex);
      } else {
        if (childIndex >= 0) {
          this.checkChildMenu(element, childIndex);
          this.navigationItems[parentIndex].children[childIndex].class =
            'active';
        }
      }
    });
    this.navigationItems[parentIndex].class = 'active';
    if (!this.navigationItems[parentIndex].showHide || childIndex >= 0) {
      this.navigationItems[parentIndex].showHide = true;
    } else {
      this.navigationItems[parentIndex].showHide = false;
      this.navigationItems[parentIndex].class = '';
    }
    if (!this.navigationItems[parentIndex].children) {
      this.navigationItems[parentIndex].class = 'active';
    }
  }

  checkChildMenu(element: any, childIndex: any) {
    if (childIndex >= 0) {
      if (element.children && element.children.length) {
        element.children.filter((childElement: any) => {
          childElement.showHide = false;
          childElement.class = '';
        });
      }
    }
  }
}
