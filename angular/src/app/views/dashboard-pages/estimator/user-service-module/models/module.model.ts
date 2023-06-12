import { environment } from '../../../../../../environments/environment';
import { commanKeys } from '../../../../../shared-ui';

export class serviceModule extends commanKeys {
  userCount: number = 0;
  type: string = environment.calculationType.module;
  clone: any = {
    userType: '',
    serviceModulesList: [],
  }
  userwise: any = [];
  totalModuleDays: number = 0
  approxDayCal: number = 0
  finalPriceWithDiscount: any = 0;
}
