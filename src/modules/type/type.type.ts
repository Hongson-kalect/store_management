export type CreateTypeParams = {
  name: string;
  describe: string;
  category: 'building' | 'food' | 'item';
};

export type EditTypeParams = {
  id: number;
  name: string;
  describe: string;
  category: 'building' | 'food' | 'item';
};
