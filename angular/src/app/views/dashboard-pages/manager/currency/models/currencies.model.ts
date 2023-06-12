export class currencies {
  _id?: string;
  currencyName: string = '';
  currencyFactor: number = 0.1;
  currencySymbol: string = '';
  status: number = 1;
}
// just use it for validation
export class validationFields {
  currencyName: string = '';
  currencyFactor: string = '';
  currencySymbol: string = '';
}
