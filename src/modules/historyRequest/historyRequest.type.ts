import { User } from 'src/typeOrm/entities/User';

export type CreateHistoryParams = {
  user?: User;
  url: string;
  params: string;
};
