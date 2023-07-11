import HomePage from '@/pages/Home';
import NewProduct from '@/components/Product/Form';
import TableList from '@/components/Product/TableList';
import { ButtonLink } from '@/components/Button';
import { Add_Icon } from '@/utils/icons';
import App from './App';
import OrdersPage from './pages/Orders';

export interface IActionsButtons {
  action?: string;
  icon?: React.ReactNode | string;
  title?: string;
  path: string;
}

export interface IRouterData {
  pageTitle: string;
  actionButtons: IActionsButtons[];
}

const routes = [
  {
    path: '/',
    element: <App />,
    children: [
      {
        id: '',
        index: true,
        element: <HomePage />,
        loader: async () => {
          return {
            pageTitle: 'Home',
          };
        },
      },
      {
        path: 'products',
        children: [
          {
            id: 'products',
            index: true,
            element: <TableList />,
            loader: async () => {
              return {
                pageTitle: 'Meus Produtos',
                actionButtons: [
                  {
                    action: 'new',
                    buttonItem: (
                      <ButtonLink
                        path="/products/new"
                        icon={<Add_Icon />}
                        label="Adicionar produto"
                      />
                    ),
                  },
                ],
              };
            },
          },
          {
            id: 'products-new',
            path: 'new',
            element: <NewProduct />,
            loader: async () => {
              return {
                pageTitle: 'Novo Produto',
              };
            },
          },
          {
            id: 'products-edit',
            path: 'edit/:id',
            element: <NewProduct />,
            loader: async () => {
              return {
                pageTitle: 'Editar Produto',
              };
            },
          },
        ],
      },
      {
        path: 'orders',
        children: [
          {
            id: 'orders',
            index: true,
            element: <OrdersPage />,
            loader: async () => {
              return {
                pageTitle: 'Meus Pedidos',
                actionButtons: [
                  {
                    action: 'new',
                    buttonItem: (
                      <ButtonLink
                        path="/orders/new"
                        icon={<Add_Icon />}
                        label="Adicionar pedido"
                      />
                    ),
                  },
                ],
              };
            },
          },
          {
            id: 'orders-new',
            path: 'new',
            element: <OrdersPage />,
            loader: async () => {
              return {
                pageTitle: 'Novo Pedido',
              };
            },
          },
          {
            id: 'orders-edit',
            path: 'edit/:id',
            element: <OrdersPage />,
            loader: async () => {
              return {
                pageTitle: 'Editar Pedido',
              };
            },
          },
        ],
      },
      {
        path: '*',
        element: <h1>Not Found!</h1>,
      },
    ],
  },
];
export default routes;
