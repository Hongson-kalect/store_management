import { User } from 'src/typeOrm/entities/User';

export type CreateBuildingParams = {
  user: User;
  name: string;
  title: string;
  describe: string;
  address: string;
  email: string;
  phone: string;
  openTime: string[]; //JSON of array to have different time depend on day [8:00-12:00,8:00-12:00,8:00-12:00,8:00-12:00,...] for open on all day of week, [8:00-12:00, 10:00-12:00, ..., close] for close on weekend
  bussinessTypes: number[];
};
