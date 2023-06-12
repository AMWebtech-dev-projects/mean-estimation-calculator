export class servicePackages {
  _id?: string;
  servicePackage: string = '';
  serviceId: string = '';
  essential: any = {
    timeFrame: "",
    total: 0,
    fixed: 0,
    recursive: 0,
  };
  professional: any = {
    timeFrame: "",
    total: 0,
    fixed: 0,
    recursive: 0,
  };
  enterprise: any = {
    timeFrame: "",
    total: 0,
    fixed: 0,
    recursive: 0,
  };
  status: number = 1;
  filterBundlesList: any[] = [];
}

// just use it for validation
export class validationFields {
  servicePackage: string = '';
  serviceId: string = '';
  essential: string = '';
  professional: string = '';
  enterprise: string = '';
}
