export class manageServices {
  _id?: string;
  serviceName: string = '';
  expertise: number = 0;
  teamSize?: number;
  hourlyPrice?: number;
  monthlyPrice?: number;
  pagePrice?: number;
  devicePrice?: number;
  discount?: number;
  status: number = 1;
}

// just use it for validation
export class validationFields {
  serviceName: string = '';
  expertise: string = '';
  teamSize: string = '';
  hourlyPrice: string = '';
  monthlyPrice: string = '';
  pagePrice: string = '';
  devicePrice: string = '';
  discount: string = '';
}
