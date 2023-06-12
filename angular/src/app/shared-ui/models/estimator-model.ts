import { environment } from '../../../environments/environment';
import * as moment from 'moment';

export class commanKeys {
  _id?: string;
  regionId: string = '';
  region: any = {};
  serviceId: string = '';
  selectedService: any = '';
  discount: any = 0;
  validate: boolean = false;
  currencies: currencyObject = { currencyFactor: 1, currencySymbol: '$' };
  projectName: string = '';
  prospectName: string = '';
  tags: string = '';
  todayDate: any = moment().format('DD/MM/YYYY');
  expiryDate: any = moment().add(20, 'days').format('DD/MM/YYYY');
  status: number = 1;
  estimationData: any = {};
}

export interface currencyObject {
  currencyFactor: number;
  currencySymbol: string;
}

export class validationFields {
  projectName: string = '';
  prospectName: string = '';
  type: string = '';
  tags: string = '';
  expiryDate: string = '';
}
