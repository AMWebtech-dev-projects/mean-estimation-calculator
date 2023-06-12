import { environment } from '../../../../../../environments/environment';
import { commanKeys } from '../../../../../shared-ui';

export class bundles extends commanKeys {
  type: string = environment.calculationType.bundle;
  filterBundlesList: any[] = [];
  timeFrameId: any = '';
  timeFrame: any = '';
  finalPriceWithDiscount: any = 0;
}
