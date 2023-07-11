import { IOrder } from '@/providers/Order/types';
import { products } from './product';

export const getOrders = async () => {
  try {
    return orders.slice(0, 3);
  } catch (error) {
    return null;
  }
};

export const orders: IOrder[] = [
  {
    id: 1,
    customer: 'Cliente teste',
    products: [{ ...products[0], quantity: 3 }],
  },
];
