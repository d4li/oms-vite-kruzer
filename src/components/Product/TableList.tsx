import { useEffect, useState } from 'react';
import { Link, useNavigate, useRouteLoaderData } from 'react-router-dom';
import { moneyMask } from '@/utils/currency/numberToCurrency';
import { Close_Icon } from '@/utils/icons';
import { ButtonNew } from '@/components/Button';
import Loading from '@/components/Loading';
import { useThemeContext } from '@/themes/default/context/ThemeContext';
import { useProductContext } from '@/providers/Product';
import useRouteId from '@/hooks/useDataPathname';

const TableList: React.FC = () => {
  const routeId = useRouteId(),
    {
      actions: { setPageActions },
    } = useThemeContext(),
    {
      products,
      isReady,
      actions: { removeProducts },
    } = useProductContext(),
    { actionButtons } = useRouteLoaderData(routeId) as { actionButtons: [] },
    navigate = useNavigate(),
    [productsSelected, setProductsSelected] = useState<number[]>([]);

  useEffect(() => {
    if (products?.length && productsSelected.length)
      productsSelected.map((id, index) => {
        if (!products.find(prd => prd.id === id))
          delete productsSelected[index];
      });

    setProductsSelected([...productsSelected.filter(id => id !== undefined)]);
  }, [products]);

  useEffect(() => {
    if (productsSelected.length && products?.length) {
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
  }, [productsSelected]);

  const //handlers
    handleSelect = (id: number) => {
      if (productsSelected.length && productsSelected.includes(id)) {
        setProductsSelected([...productsSelected.filter(prod => prod !== id)]);
      } else {
        setProductsSelected([...productsSelected, id]);
      }
    },
    handleDelete = () => {
      if (productsSelected.length) return removeProducts(productsSelected);
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
            {/* <th className="text-left py-2 px-4">ID</th> */}
            <th className="text-left py-2 px-4 sm:w-[100%]">Title</th>
            <th className="text-left py-2 px-1">Price</th>
            <th className="py-2 px-4">Status</th>
            <th scope="col" className="px-6 py-3">
              <span className="sr-only">Editar</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {products ? (
            products.map((product, index) => (
              <tr key={index} className="border-b hover:bg-gray-200">
                <td className="text-right py-6 pl-6 pr-3">
                  <input
                    type="checkbox"
                    name="products[]"
                    onChange={() => handleSelect(Number(product.id))}
                  />
                </td>
                {/* <td data-label="id" className="text-center py-2 px-4">
                  {product.id}
                </td> */}
                <td
                  data-label="Title"
                  className="text-left py-2 px-4 cursor-pointer"
                  onClick={() => navigate(`/products/edit/${product.id}`)}>
                  {product.title}
                </td>
                <td data-label="Price" className="text-right py-6 px-1">
                  <span className="text-right">
                    {moneyMask(product.price.toString())}
                  </span>
                </td>
                <td data-label="Status" className="text-center py-6 px-4">
                  {product.status ? 'Inactive' : 'Active'}
                </td>
                <td className="text-right py-6 px-6">
                  <Link
                    to={`/products/edit/${product.id}`}
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
      {isReady && products && !products.length ? (
        <h1 className="text-center mt-6">Nenhum produto encontrado!</h1>
      ) : null}
    </div>
  );
};

export default TableList;

const TableLoading = () => {
  const { products, isReady } = useProductContext();

  if (isReady && !products)
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
