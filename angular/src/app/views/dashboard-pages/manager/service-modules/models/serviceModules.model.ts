export class serviceModules {
  _id?: string;
  serviceModule: string = '';
  timeRequired?: number;
  summary: string = '';
  status: number = 1;
}
// just use it for validation
export class validationFields {
  serviceModule: string = '';
  timeRequired: string = '';
  summary: string = '';
}
