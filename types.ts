export interface User {
  _id: string;
  name: string;
  role: string;
  phone: number;
}

export interface Price {
  _id: string;
  sell: number;
  buy: number;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}