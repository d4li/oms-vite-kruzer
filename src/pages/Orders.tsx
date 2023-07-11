import OrderForm from '@/components/Orders/Form';
import TableOrdersList from '@/components/Orders/TableOrdersList';
import { useLocation, useParams } from 'react-router-dom';

const OrdersPage: React.FC = () => {
  const { pathname } = useLocation(),
    { id } = useParams();

  if (pathname == '/orders/new' || id) return <OrderForm />;

  return <TableOrdersList />;
};

export default OrdersPage;
