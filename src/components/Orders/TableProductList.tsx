import { moneyMask } from '@/utils/currency/numberToCurrency';
import { Remove_Icon } from '@/utils/icons';
import { IProduct } from '@/providers/Product/types';

import styles from '@/components/Button/button.module.scss';
import { FormEvent } from 'react';

interface TableProductsOrder {
  products: IProduct[];
  removeItem: (e: FormEvent, productIndex: number | string) => void;
}
const TableList: React.FC<TableProductsOrder> = ({ products, removeItem }) => {
  return (
    <div className="relative overflow-x-auto sm:rounded-lg">
      <table className="min-w-full table-auto text-gray-500 responsive">
        <thead className="text-gray-700 text-sm uppercase bg-gray-200">
          <tr>
            <th scope="col" className="px-6 py-3">
              <span className="sr-only">Edit</span>
            </th>
            <th className="text-left py-2 px-4">ID</th>
            <th className="text-left py-2 px-4 w-[100%]">Nome do Produto</th>
            <th className="text-left py-2 px-4">Qtd</th>
            <th className="text-left py-2 px-4">Valor</th>
          </tr>
        </thead>
        <tbody>
          {products.length
            ? products.map((product, index) => (
                <tr
                  key={index}
                  className="border-b hover:bg-gray-200 cursor-pointer">
                  <td className="text-right py-2 px-6">
                    <button
                      className={styles.btn}
                      onClick={e => removeItem(e, product.id)}>
                      <Remove_Icon />
                    </button>
                  </td>
                  <td data-label="id" className="text-center py-2 px-4">
                    {product.id}
                  </td>
                  <td data-label="Title" className="text-left py-2 px-4">
                    {product.title}
                  </td>
                  <td data-label="Quantity" className="text-center py-2 px-1">
                    <span className="text-right">{product.quantity}x</span>
                  </td>
                  <td data-label="Price" className="text-right py-2 px-4">
                    <span className="text-right">
                      {moneyMask(product.price.toString())}
                    </span>
                  </td>
                </tr>
              ))
            : null}
        </tbody>
      </table>
      {!products.length && (
        <div className="text-center p-4">
          <h1>Nenhum produto foi adicionado ao pedido</h1>
        </div>
      )}
    </div>
  );
};

export default TableList;
