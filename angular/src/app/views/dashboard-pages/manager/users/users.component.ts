import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { DataTableDirective } from 'angular-datatables';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../../../environments/environment';
import { AlertService, GlobalService, UsersService } from '../../../../shared-ui';
import { user, validationFields } from './models/user.model';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  title = 'Manage Users | Estimation Calculator';
  userInfo: user = new user();
  userForm: any = new FormGroup({});
  userRoles: any = environment.role;
  usersList: any[] = [];
  @ViewChild(DataTableDirective, { static: false })
  datatableElement: any = DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  newUserAlready = false;
  @ViewChild('showAddEditUserModal', { static: false, })
  public showAddEditUserModal: any = ModalDirective;
  @ViewChild('deleteUserModal', { static: false })
  public deleteUserModal: any = ModalDirective;
  requiredValidation: validationFields = new validationFields();

  inValidateCheck: any = {
    email: false,
    emailExits: true,
  };

  constructor(
    private globalService: GlobalService,
    private usersService: UsersService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private alertService: AlertService,
    private fb: FormBuilder
  ) {
    this.getUsersList();
  }

  ngOnInit(): void {
    this.dtOptions = {
      responsive: true,
      scrollX: true,
      scrollY: '350px',
      scrollCollapse: true,
      columnDefs: [{
        targets: 5,
        orderable: false,
        searchable: false,
      }, {
        targets: 6,
        orderable: false,
        searchable: false,
      },],
    };
    this.userRoles = Object.keys(this.userRoles) //convert object to array
    this.globalService.getPageTitle(this.title);
    this.validateForm();
  }

  validateForm() {
    this.userForm = this.fb.group({
      _id: '',
      userName: [
        '',
        [Validators.required, Validators.minLength(3)]
      ],
      email: [
        { value: '', disabled: false },
        [Validators.required, Validators.minLength(3),],
        [this.emailExistValidator()]
      ],
      status: 1,
      user_type: environment.role.userRole
    })

  }

  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }

  emailExistValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return this.usersService.emailAlreadyExists({ email: control.value + environment.emaildomain }).pipe(
        map((data: any) => {
          return data.status === 200 ? { emailExists: true } : null;
        })
      );
    };
  }

  getUsersList() {
    this.usersService.getUsersList().subscribe((dataRes: any) => {
      this.spinner.show();
      if (dataRes.status == 200) {
        this.spinner.hide();
        this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
          dtInstance.destroy();
          this.dtTrigger.next();
          this.usersList = dataRes.data;
          this.spinner.hide();
        });
        // console.log("userList",this.usersList);
      }
    }, (error: any) => {
      this.spinner.hide()
      this.toastr.error(error.message, 'Error!');
    });
  }


  checkvalidation(formType: any) {
    if (
      this.userForm.get(formType) &&
      this.userForm.get(formType).invalid
    ) { return 'text-danger'; } else { return 'text-success'; }
  }

  get invalidform() {
    return this.userForm.controls;
  }


  showAddEditModal(userInfoValue?: any) {
    this.validateForm();
    this.alertService.clear();
    if (userInfoValue && userInfoValue._id) {
      // this.userForm.value = this.userForm.reset(userInfoValue)
      this.userForm.reset(userInfoValue)
      setTimeout(() => {
        this.userForm.controls['email'].disable()
      });
    } else {
      setTimeout(() => {
        this.userForm.controls['email'].enable()
      });
    }
    this.showAddEditUserModal.show();
  }

  closeModel() {
    this.showAddEditUserModal.hide();
    this.deleteUserModal.hide();
    this.validateForm();
  }

  showUserDeleteModal(user: any) {
    this.userInfo = user;
    this.deleteUserModal.show();
  }

  addUser() {
    this.alertService.clear();
    if (this.userForm.invalid) {
      this.alertService.error('*Please Fill All Fields are mandatory.');
      return false
    }
    let userPostData = Object.assign({}, this.userForm.value); //IT BROKES TWO WAY DATABINDING
    if (!userPostData._id) {
      userPostData.email = userPostData.email + environment.emaildomain;
      delete userPostData._id;
    }
    // HERE WE CAN CALL API FOR SAVING DATA
    this.spinner.show();
    this.usersService.saveUserInfo(userPostData).subscribe((dataRes: any) => {
      console.log("dataRes", dataRes);
      if (dataRes.status === 200) {
        this.spinner.hide();
        this.toastr.success(dataRes.message, 'Success!');
        dataRes = dataRes.data;
        this.closeModel();
        // if (!userPostData._id) {
        //   this.usersList.unshift(dataRes);
        // } else {
        //   let index = this.usersList.findIndex(x => x._id === dataRes._id);
        //   if (index) {
        //     this.usersList[index] = dataRes;
        //   }
        // }
        this.getUsersList();
      }
    }, (error: any) => {
      this.spinner.hide()
      this.toastr.error(error.message, 'Error!');
    });
    return
  }

  deleteUser() {
    this.spinner.show();
    this.usersService.deleteUser(this.userInfo).subscribe(
      (dataRes) => {
        if (dataRes.status === 200) {
          this.closeModel();
          this.spinner.hide();
          this.getUsersList();
          this.toastr.success('User deleted successfully.', 'Success');
        }
      },
      (error) => {
        this.closeModel();
        this.spinner.hide();
        this.toastr.error(
          'There are some server error. Please check connection.',
          'Error'
        );
      }
    );
  }

  changeUserStatus(user: any) {
    let postData = {
      _id: user._id,
      status: user.status ? 0 : 1
    }
    // HERE WE CAN CALL API FOR SAVING DATA
    this.usersService.saveUserInfo(postData).subscribe((dataRes: any) => {
      if (dataRes.status === 200) {
        dataRes = dataRes.data;
        this.spinner.hide();
        this.toastr.success('User status has been changed successfully.', 'Success!');
        let index = this.usersList.findIndex(x => x._id === dataRes._id);
        if (index) {
          this.usersList[index].status = dataRes.status;
        }
      }
    }, (error: any) => {
      this.spinner.hide()
      this.toastr.error(error.message, 'Error!');
    });
  }
}
