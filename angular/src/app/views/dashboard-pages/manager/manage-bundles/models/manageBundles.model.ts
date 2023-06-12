export class manageBundles {
  _id?: string;
  serviceBundle: string = '';
  serviceId: string = '';
  type: number = 1;
  servicePrice?: number;
  status: number = 1;
}
// just use it for validation
export class validationFields {
  serviceBundle: string = '';
  serviceId: string = '';
  type: string = '';
  servicePrice: string = '';
}
