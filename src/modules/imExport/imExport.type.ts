export type CreateImExportParams = {
  name: string;
  time: number;
  quantitys: number[];
  costs: number[];
  type: string;
  isSuccess: boolean;
  describe?: string;
  providerId: number;
  items: (string | number)[];
  buildingId: number;
  roleId: number;
};
