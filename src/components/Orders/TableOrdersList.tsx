import { useEffect, useState } from 'react';
import { Link, useNavigate, useRouteLoaderData } from 'react-router-dom';
import { useOrderContext } from '@/providers/Order';
import { useThemeContext } from '@/themes/default/context/ThemeContext';
import useRouteId from '@/hooks/useDataPathname';
import Loading from '@/components/Loading';
import { ButtonNew } from '@/components/Button';
import { Close_Icon } from '@/utils/icons';

const TableOrdersList: React.FC = () => {
  const {
      orders,
      isReady,
      actions: { removeOrders },
    } = useOrderContext(),
    {
      actions: { setPageActions },
    } = useThemeContext(),
    [ordersSelected, setOrdersSelected] = useState<number[]>([]),
    routeId = useRouteId(),
    { actionButtons } = useRouteLoaderData(routeId) as { actionButtons: [] },
    navigate = useNavigate();

  useEffect(() => {
    if (orders?.length && ordersSelected.length)
      ordersSelected.map((id, index) => {
        if (!orders.find(prd => prd.id === id)) delete ordersSelected[index];
      });

    setOrdersSelected([...ordersSelected.filter(id => id !== undefined)]);
  }, [orders]);

  useEffect(() => {
    if (ordersSelected.length && orders?.length) {
      setPageActions([
        {
          action: 'delete',
          title: 'Excluir',
          buttonItem: (
            <ButtonNew
              label="Delete"
              icon={<Close_Icon />}
              onClick={handleDelete}
              status="error"
            />
          ),
        },
      ]);
    } else {
      setPageActions(actionButtons);
    }
  }, [ordersSelected]);

  const //handlers
    handleSelect = (id: number) => {
      if (ordersSelected.length && ordersSelected.includes(id)) {
        setOrdersSelected([...ordersSelected.filter(prod => prod !== id)]);
      } else {
        setOrdersSelected([...ordersSelected, id]);
      }
    },
    handleDelete = () => {
      if (ordersSelected.length) return removeOrders(ordersSelected);
      return;
    };

  if (!isReady) return <Loading />;

  return (
    <div className="relative overflow-x-auto sm:rounded-lg">
      <table className="min-w-full table-auto text-gray-500 responsive">
        <thead className="text-gray-700 text-sm uppercase bg-gray-200">
          <tr>
            <th scope="col" className="py-3">
              <span className="sr-only">Excluir</span>
            </th>
            <th className="text-left py-2 px-4 sm:w-[100%]">Cliente</th>
            <th className="text-left py-2 px-1">Price</th>
            <th className="py-2 px-4">Status</th>
            <th scope="col" className="px-6 py-3">
              <span className="sr-only">Editar</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {orders ? (
            orders.map((order, index) => (
              <tr
                key={index}
                className="border-b hover:bg-gray-200 cursor-pointer">
                <td className="text-right py-6 pl-6 pr-3">
                  <input
                    type="checkbox"
                    name="orders[]"
                    onChange={() => handleSelect(Number(order.id))}
                  />
                </td>
                <td
                  data-label="Customer"
                  className="text-left py-2 px-4"
                  onClick={() => navigate(`/orders/edit/${order.id}`)}>
                  {order.customer}
                </td>
                <td data-label="Price" className="text-right py-2 px-1">
                  <span className="text-right">
                    {/* {moneyMask(order.price.toString())} */}
                  </span>
                </td>
                <td data-label="Status" className="text-center py-2 px-4">
                  {order.status ? 'Active' : 'Pending'}
                </td>
                <td className="text-right py-2 px-6">
                  <Link
                    to={`/orders/edit/${order.id}`}
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                    Editar
                  </Link>
                </td>
              </tr>
            ))
          ) : (
            <TableLoading />
          )}
        </tbody>
      </table>
      {isReady && orders && !orders.length ? (
        <h1 className="text-center mt-6">Nenhum pedido encontrado!</h1>
      ) : null}
    </div>
  );
};

export default TableOrdersList;

const TableLoading = () => {
  const { isReady, orders } = useOrderContext();

  if (isReady && !orders)
    return (
      <>
        <tr className="border-b">
          <td className="text-center py-2 px-4">
            <span className="loadingComponent loadingComponent--text"></span>
          </td>
          <td className="text-left py-2 px-4">
            <span className="loadingComponent loadingComponent--text"></span>
          </td>
          <td className="text-right py-2 px-1">
            <span className="text-right">
              <span className="loadingComponent loadingComponent--text"></span>
            </span>
          </td>
          <td className="text-center py-2 px-4">
            <span className="loadingComponent loadingComponent--text"></span>
          </td>
          <td className="text-right py-2 px-1">
            <span className="loadingComponent loadingComponent--text"></span>
          </td>
        </tr>

        <tr className="border-b">
          <td className="text-center py-2 px-4">
            <span className="loadingComponent loadingComponent--text"></span>
          </td>
          <td className="text-left py-2 px-4">
            <span className="loadingComponent loadingComponent--text"></span>
          </td>
          <td className="text-right py-2 px-1">
            <span className="text-right">
              <span className="loadingComponent loadingComponent--text"></span>
            </span>
          </td>
          <td className="text-center py-2 px-4">
            <span className="loadingComponent loadingComponent--text"></span>
          </td>
          <td className="text-right py-2 px-1">
            <span className="loadingComponent loadingComponent--text"></span>
          </td>
        </tr>

        <tr className="border-b">
          <td className="text-center py-2 px-4">
            <span className="loadingComponent loadingComponent--text"></span>
          </td>
          <td className="text-left py-2 px-4">
            <span className="loadingComponent loadingComponent--text"></span>
          </td>
          <td className="text-right py-2 px-1">
            <span className="text-right">
              <span className="loadingComponent loadingComponent--text"></span>
            </span>
          </td>
          <td className="text-center py-2 px-4">
            <span className="loadingComponent loadingComponent--text"></span>
          </td>
          <td className="text-right py-2 px-1">
            <span className="loadingComponent loadingComponent--text"></span>
          </td>
        </tr>

        <tr className="border-b">
          <td className="text-center py-2 px-4">
            <span className="loadingComponent loadingComponent--text"></span>
          </td>
          <td className="text-left py-2 px-4">
            <span className="loadingComponent loadingComponent--text"></span>
          </td>
          <td className="text-right py-2 px-1">
            <span className="text-right">
              <span className="loadingComponent loadingComponent--text"></span>
            </span>
          </td>
          <td className="text-center py-2 px-4">
            <span className="loadingComponent loadingComponent--text"></span>
          </td>
          <td className="text-right py-2 px-1">
            <span className="loadingComponent loadingComponent--text"></span>
          </td>
        </tr>
      </>
    );

  return null;
};
