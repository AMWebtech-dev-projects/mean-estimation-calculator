import { environment } from '../../../../../../environments/environment';

export class user {
  _id?: string;
  userName: string = '';
  email: string = '';
  status: number = 1;
  user_type: number = environment.role.userRole;
}

// just use it for blank field validation
export class validationFields {
  userName: string = '';
  email: string = '';
  user_type: string = '';
}
