import { User } from 'src/typeOrm/entities/User';

export type CreateLoginHistoryParams = {
  user?: User;
  token?: string;
  device: string;
  ipAddress: string;
};
