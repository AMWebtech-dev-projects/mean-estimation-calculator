import { environment } from '../../../../../../environments/environment';
import { commanKeys } from '../../../../../shared-ui';

export class hourly extends commanKeys {
  hourly: number = 20;
  weeks: number = 12;
  type: string = environment.calculationType.hourly;
  rateOffered: number = 0;
  finalPriceWithDiscount: any = 0;
  timeIndex: number = 0;
  totalCost: any = 0;
}
