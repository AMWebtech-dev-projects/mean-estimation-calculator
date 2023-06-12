import { environment } from '../../../../../../environments/environment';
import { commanKeys } from '../../../../../shared-ui';

export class packages extends commanKeys {
  selectedPackageId: any = '';
  selectedPackage: any = '';
  filterPackagesList: any[] = [];
  type: string = environment.calculationType.package;
  timeFrame: any = "";
  finalPriceWithDiscount: any = 0;
}
