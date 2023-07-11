import { createContext, useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { getOrders } from '@/services/order';
import { useProductContext } from '@/providers/Product';
import { IOrder, IOrderContext } from './types';

export const OrderContext = createContext<IOrderContext>({} as IOrderContext);

export interface IOrderProvider {
  children: React.ReactNode;
}
export const OrderProvider = ({ children }: IOrderProvider) => {
  const [isReady, setIsReady] = useState<boolean>(false),
    [orders, setOrders] = useState<IOrder[] | null>(null),
    { products } = useProductContext();

  useEffect(() => {
    setIsReady(true);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (products) {
        const response = await getOrders();
        setTimeout(() => {
          setOrders(response!);
        }, 2000);
      }
    };

    fetchData();
  }, [products]);

  const //Actions
    addOrder = (order: IOrder) => {
      setOrders([...orders!, { ...order }]);
      toast.success('Pedido adicionado com sucesso!');
    },
    editOrder = (orderId: string, order: IOrder) => {
      let index = orders!.findIndex(ord => ord.id == orderId);
      orders![index] = { id: orderId, ...order };

      setOrders(orders);
      toast.success('Pedido alterado com sucesso!');
    },
    removeOrders = (ids: number[]) => {
      if (orders && orders.length)
        setOrders(
          orders.filter(ord => {
            if (!ids.includes(Number(ord.id))) return ord;
          })
        );
      toast.success(
        `${
          ids.length === 1
            ? '1 Pedido foi excluído'
            : `${ids.length} Pedidos foram excluídos!`
        }`
      );
    };

  return (
    <OrderContext.Provider
      value={{
        isReady,
        orders,
        actions: { addOrder, editOrder, removeOrders },
      }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrderContext = () => {
  const context = useContext(OrderContext);
  return context;
};
