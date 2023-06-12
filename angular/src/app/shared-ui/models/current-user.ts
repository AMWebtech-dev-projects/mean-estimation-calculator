import { environment } from '../../../environments/environment';

export class currentUser {
  _id?: string;
  userName: string = '';
  email: string = '';
  status: number = 1;
  userPhoto?: string = '';
  user_type: number = environment.role.userRole;
}
