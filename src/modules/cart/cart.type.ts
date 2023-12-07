import { User } from 'src/typeOrm/entities/User';

export type CreateCartParams = {
  name?: string;
  describe?: string;
  quantity: number;
  isConfirm: boolean;
  user: User;
  item: number;
};
