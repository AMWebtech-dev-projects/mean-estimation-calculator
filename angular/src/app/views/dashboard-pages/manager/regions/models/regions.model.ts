export class regions {
  _id?: string;
  regionName: string = '';
  regionFactor: number = 0.1;
  status: number = 1;
}

// just use it for validation
export class validationFields {
  regionName: string = '';
  regionFactor: string = '';
}
