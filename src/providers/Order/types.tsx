import { IProduct } from '../Product/types';

export interface IOrder {
  id?: number | string;
  customer: string;
  products: IProduct[];
  quantity?: number;
  amount?: number;
  status?: boolean;
}

export interface IOrderState {
  orders: IOrder[] | null;
  isReady: boolean;
}

export interface IOrderActions {
  addOrder: (order: IOrder) => void;
  editOrder: (orderId: string, order: IOrder) => void;
  removeOrders: (ids: number[]) => void;
}

export interface IOrderContext extends IOrderState {
  actions: IOrderActions;
}
