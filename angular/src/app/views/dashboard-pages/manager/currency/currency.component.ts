import { Component, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { NgxSpinnerService } from 'ngx-spinner';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subject } from 'rxjs';
import { currencies, validationFields } from './models/currencies.model';
import { AlertService, GlobalService, CurrenciesService } from '../../../../shared-ui';
import { debounceTime, map, tap } from 'rxjs/operators';
import { AbstractControl, AsyncValidatorFn, FormBuilder, FormControl, ValidationErrors, Validators } from '@angular/forms';

@Component({
  selector: 'app-currency',
  templateUrl: './currency.component.html',
  styleUrls: ['./currency.component.scss']
})
export class CurrencyComponent implements OnInit {
  subject: Subject<any> = new Subject();

  title = 'Manage Currencies | Estimation Calculator';
  currenciesInfo: currencies = new currencies();
  currenciesForm: any = new FormControl({});
  currenciesList: any[] = [];
  currencySymbolExists = false;
  @ViewChild(DataTableDirective, { static: false })
  datatableElement: any = DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  @ViewChild('showAddEditCurrencyModal', { static: false, })
  public showAddEditCurrencyModal: any = ModalDirective;
  @ViewChild('deleteCurrencyModal', { static: false })
  public deleteCurrencyModal: any = ModalDirective;
  requiredValidation: validationFields = new validationFields();

  constructor(private currenciesService: CurrenciesService,
    private alertService: AlertService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private globalService: GlobalService,) {
    this.getCurrenciesList();
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
    this.globalService.getPageTitle(this.title);
    this.subject
      .pipe(debounceTime(1500))
      .subscribe(() => {
        console.log("test", this.currenciesInfo);
        if (this.currenciesInfo.currencyFactor && (this.currenciesInfo.currencyFactor > 0 && this.currenciesInfo.currencyFactor <= 100)) {
          this.currenciesInfo.currencyFactor = this.currenciesInfo.currencyFactor;
        } else {
          this.currenciesInfo.currencyFactor = 0.1;
        }
      }
      );
    this.validatorForm();
  }

  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }

  validatorForm() {
    this.currenciesForm = this.fb.group({
      _id: '',
      currencyName: [
        '',
        [Validators.required, Validators.minLength(3)]
      ],
      currencyFactor: [
        0.1,
        [Validators.required, Validators.min(0), Validators.max(1000)]
      ],
      currencySymbol: [
        '',
        [Validators.required],
        [this.currencySymbolExistValidator()]
      ],
      status: 1
    })
  }

  currencySymbolExistValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return this.currenciesService.currencyAlreadyExists({
        currencySymbol: control.value,
        _id: this.currenciesForm?.value?._id
      }).pipe(
        map((data: any) => {
          return data.status === 200 ? { currencySymbolExists: true } : null;
        })
      )
    }
  }

  getCurrenciesList() {
    this.currenciesService.getCurrenciesList().subscribe((dataRes: any) => {
      this.spinner.show();
      if (dataRes.status === 200) {
        this.spinner.hide();
        this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
          dtInstance.destroy();
          this.dtTrigger.next();
          this.currenciesList = dataRes.data;
          this.spinner.hide();
        });
      }
    }, (error: any) => {
      this.spinner.hide()
      this.toastr.error(error.message, 'Error!');
    });
  }

  closeModel() {
    this.showAddEditCurrencyModal.hide();
    this.deleteCurrencyModal.hide();
    this.validatorForm()
  }

  showAddEditModal(currenciesInfoValue?: any) {
    this.alertService.clear();
    this.validatorForm()
    if (currenciesInfoValue && currenciesInfoValue._id) {
      this.currenciesForm.reset(currenciesInfoValue)
      this.currenciesForm.controls['currencySymbol'].enable()
    }
    this.showAddEditCurrencyModal.show();
  }

  showCurrencyDeleteModal(currency: any) {
    this.currenciesInfo = currency;
    this.deleteCurrencyModal.show();
  }

  checkvalidation(key: any) {
    if (this.currenciesForm.get(key) && this.currenciesForm.get(key).valid) {
      return 'text-primary';
    } else {
      return 'text-danger';
    }
  }

  get invalidForm() {
    return this.currenciesForm.controls
  }

  factorValidation() {
    this.subject.next();
  }



  addCurrency() {
    this.alertService.clear();
    if (!this.currenciesForm.valid) {
      this.alertService.error("*Please Fill All Fields are mandatory.");
      return false;
    }
    this.spinner.show();
    let currencyPostData = JSON.parse(JSON.stringify(this.currenciesForm.value));
    if (!currencyPostData._id) {
      delete currencyPostData._id;
    }
    this.currenciesService.saveCurrencyInfo(currencyPostData).subscribe((dataRes: any) => {
      if (dataRes.status === 200) {
        this.spinner.hide();
        this.toastr.success(dataRes.message, 'Success!');
        dataRes = dataRes.data;
        this.closeModel();
        // if (!currencyPostData._id) {
        //   this.currenciesList.unshift(dataRes);
        // } else {
        //   let index = this.currenciesList.findIndex(x => x._id === dataRes._id);
        //   if (index) {
        //     this.currenciesList[index] = dataRes;
        //   }
        // }
        this.getCurrenciesList();
      }
    }, (error: any) => {
      this.spinner.hide()
      this.toastr.error(error.message, 'Error!');
    });
    return
  }

  changeCurrencyStatus(currency: any) {
    let postData = {
      _id: currency._id,
      status: currency.status ? 0 : 1
    }
    // HERE WE CAN CALL API FOR SAVING DATA
    this.currenciesService.saveCurrencyInfo(postData).subscribe((dataRes: any) => {
      if (dataRes.status === 200) {
        dataRes = dataRes.data;
        this.spinner.hide();
        this.toastr.success('Currency status has been changed successfully.', 'Success!');
        let index = this.currenciesList.findIndex(x => x._id === dataRes._id);
        if (index) {
          this.currenciesList[index].status = dataRes.status;
        }
      }
    }, (error: any) => {
      this.spinner.hide()
      this.toastr.error(error.message, 'Error!');
    });
  }

  deleteCurrency() {
    this.spinner.show();
    this.currenciesService.deleteCurrency(this.currenciesInfo).subscribe(
      (dataRes) => {
        if (dataRes.status === 200) {
          this.closeModel();
          this.spinner.hide();
          this.getCurrenciesList();
          this.toastr.success('Currency deleted successfully.', 'Success');
        }
      },
      (error) => {
        this.closeModel();
        this.spinner.hide();
        this.toastr.error(
          'There are some server error.Please check connection.', 'Error'
        );
      }
    );
  }
}
