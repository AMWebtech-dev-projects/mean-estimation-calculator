import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Input } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CurrenciesService, JwtService } from '..';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-estimator-card',
  templateUrl: './estimator-card.component.html',
  styleUrls: ['./estimator-card.component.scss']
})
export class EstimatorCardComponent implements OnInit {
  @Input() calculationData: any = {};
  @Output() callParentCalculation = new EventEmitter();
  @Output() calculationModal = new EventEmitter();
  currenciesList: any[] = [];
  typeList: any[] = [];
  calculationType: any = environment.calculationType;
  enableDiscount: boolean = false; // hidden by default
  enableCurrency: boolean = false; // hidden by default

  constructor(private currenciesService: CurrenciesService,
    private jwtService: JwtService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getCurrenciesList();
    this.typeList = this.jwtService.getConfig().type;
  }

  callCalculation() {
    // this method emits the value
    this.callParentCalculation.emit();
  }

  discountLimit() {
    if (this.calculationData.discount) {
      if (this.calculationData.discount > this.calculationData.selectedService.discount) {
        this.toastr.error(' Max Discount Reached!');
      } else {
        this.toastr.success('Discount Applied!');
      }
    }
  }

  openCalculationModal() {
    // this method emits the value
    this.calculationModal.emit();
  }

  getCurrenciesList() {
    this.currenciesService.getCurrenciesList().subscribe((dataRes: any) => {
      if (dataRes.status === 200) {
        this.currenciesList = dataRes.data;
      }
    }, (error: any) => {
      this.toastr.error(error.message, 'Error!');
    });
  }

  toggleShow(value: string) {
    if (value == 'discount') {
      this.enableDiscount = true;
    } else {
      this.enableCurrency = true;
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

  roundOffPrice(bundleInfo: any) {
    if (bundleInfo.type === 2) {
      return (Math.round(bundleInfo.servicePrice * this.calculationData.timeFrame.factor
        * this.calculationData.currencies.currencyFactor * this.calculationData.region.regionFactor * this.calculationData.timeFrame.label * 100) / 100).toFixed(2);
    } else {
      return (Math.round(bundleInfo.servicePrice * this.calculationData.currencies.currencyFactor * this.calculationData.region.regionFactor * 100) / 100).toFixed(2)
    }
  }
}
