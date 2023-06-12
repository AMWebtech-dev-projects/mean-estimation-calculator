import { environment } from '../../../../../../environments/environment';
import { commanKeys } from '../../../../../shared-ui';

export class resource extends commanKeys {
  resources: number = 5;
  months: number = 3;
  type: string = environment.calculationType.resources;
  rateOffered: number = 0;
  finalPriceWithDiscount: any = 0;
  timeIndex: number = 0;
  totalMonthlyCost: any = 0;
  totalProjectCost: any = 0;
  totalCost: number = 0;
  totalHours: number = 0;
}
