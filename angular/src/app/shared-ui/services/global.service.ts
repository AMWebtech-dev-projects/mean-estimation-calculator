import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { JwtService, UsersService } from '..';
import { environment } from '../../../environments/environment';
import { ApiService } from './api.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class GlobalService {
  private subject = new Subject<any>();

  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
    private router: Router,
    private titleService: Title,
    private apiService: ApiService,
    private httpClient: HttpClient
  ) { }

  patternMatchRegex(inputVal: any, InputType: string) {
    let RegEx: any = '';
    if (InputType === 'email') {
      RegEx = new RegExp('^[ A-Za-z0-9_/#&+-]*$');
      // RegEx = new RegExp('^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$');
    } else if (InputType === 'phoneNumber') {
      RegEx = new RegExp('^((\\+91-?)|0)?[0-9]{10}$');
    } else if (InputType === 'strongPasswordCheck') {
      RegEx = new RegExp(
        '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*[^A-Za-z0-9])(?=.*?[0-9]).{8,}$'
      );
    }
    // else if (InputType === 'timeRequired') {
    //   RegEx = new RegExp('^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$');
    // }
    const validRex = RegEx.test(inputVal);
    return validRex;
  }

  getLoadingLabel(): Observable<any> {
    return this.subject.asObservable();
  }

  setLoadingLabel(action: string) {
    this.subject.next({ text: action });
  }

  sendActionChildToParent(action: string) {
    this.subject.next({ text: action });
  }

  getActionChildToParent(): Observable<any> {
    return this.subject.asObservable();
  }

  authentication() {
    const userInfo = this.jwtService.loggedUserInfo;
    if (userInfo && userInfo.email) {
      const loginInfo = {
        email: userInfo.email,
      };
      this.usersService.authentication(loginInfo).subscribe(
        (data) => {
          if (!data.currentUser) {
            this.jwtService.destroyToken();
            this.sendActionChildToParent('Logout');
            this.router.navigate(['/login']);
          }
        },
        (error) => { }
      );
    }
  }

  logOut() {
    this.sendActionChildToParent('loggedOut');
    const userInfo = this.jwtService.loggedUserInfo;
    if (userInfo && userInfo.email) {
      const loginInfo = {
        email: userInfo.email,
      };
      this.usersService.logout().subscribe(
        (data) => { },
        (error) => { }
      );
    }
  }

  getPageTitle(title: any) {
    this.titleService.setTitle(title);
  }

}
