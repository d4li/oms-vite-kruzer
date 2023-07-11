import { FormEvent, useEffect, useState } from 'react';
import { Form, useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useProductContext } from '@/providers/Product';
import { useOrderContext } from '@/providers/Order';

import { ButtonNew } from '@/components/Button';
import { Add_Icon } from '@/utils/icons';
import Loading from '@/components/Loading';
import { ValidationSchema, schema } from './schema';

import styles from '@/components/Form/form.module.scss';
import TableProductList from './TableProductList';
import { IOrder } from '@/providers/Order/types';
import { IProduct } from '@/providers/Product/types';

const OrderForm = () => {
  const { products } = useProductContext(),
    {
      orders,
      isReady,
      actions: { addOrder, editOrder },
    } = useOrderContext(),
    { id } = useParams(),
    [selectValue, setSelectValue] = useState(''),
    [orderItens, setOrderItens] = useState<IProduct[]>([]),
    [orderEdit, setOrderEdit] = useState<IOrder | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isDirty },
  } = useForm<ValidationSchema>({
    resolver: zodResolver(schema),
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (orders && orders.length && id && !orderEdit) {
      setOrderEdit({ ...orders.find(ord => ord.id == id) } as IOrder);
    }
  }, [id, orders, orderItens]);

  useEffect(() => {
    if (orderEdit && orderEdit.products) setOrderItens([...orderEdit.products]);
  }, [orderEdit]);

  const addItem = (productId: string) => {
      let index = orderItens.findIndex(item => item.id == productId);
      if (index > -1) {
        orderItens[index].quantity! += 1;
        setOrderItens([...orderItens]);
      } else {
        let newItem = {
          ...products!.find(prod => prod.id == productId),
          quantity: 1,
        } as IProduct;
        setOrderItens([...orderItens, newItem]);
      }

      if (orderEdit && orderEdit.customer)
        setValue('customer', orderEdit!.customer, { shouldDirty: true });
    },
    removeItem = (e: FormEvent, productId: number | string) => {
      e.preventDefault();

      let product = { ...orderItens.find(item => item.id == productId) };
      if (product) {
        if (product.quantity! > 1) {
          product.quantity = product.quantity! - 1;
          setOrderItens([
            ...orderItens.filter(ord => ord.id !== productId),
            product,
          ] as IProduct[]);
        } else {
          setOrderItens([...orderItens.filter(ord => ord.id !== productId)]);
        }

        setValue('customer', orderEdit!.customer, { shouldDirty: true });
      }
    },
    onSubmit = (data: any) => {
      console.log('data', data);

      if (id) {
        editOrder(id, {
          ...data,
          products: orderItens,
        });
      } else {
        addOrder({
          id: orders!.length + 1,
          ...data,
          products: orderItens,
        });
      }
      return navigate('/orders');
    };

  if ((id && !isReady) || !products || !orders) return <Loading />;

  return (
    <Form onSubmit={handleSubmit(onSubmit)} method="post">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className={styles.mainField}>
          <label>
            Cliente <span className={styles.req}>*</span>
          </label>
          <input
            type="text"
            placeholder="Nome do cliente"
            defaultValue={orderEdit?.customer}
            {...register('customer')}
          />
          {errors && errors.customer?.message && (
            <p role="alert">{errors.customer.message}</p>
          )}
        </div>
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className={styles.mainField}>
            <label>
              Produto <span className={styles.req}>*</span>
            </label>
            <select
              defaultValue=""
              {...register('products', {
                onChange: e => setSelectValue(e.target.value),
              })}>
              <option value="" disabled>
                Selecionar produto
              </option>
              {products &&
                products.length &&
                products!.map(prod => (
                  <option key={prod.id} value={prod.id}>
                    {prod.title}
                  </option>
                ))}
            </select>
          </div>
          <div className={styles.mainField}>
            <label></label>
            <ButtonNew
              icon={<Add_Icon />}
              onClick={() => addItem(selectValue)}
              disabled={selectValue === ''}
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4 mb-6">
        <TableProductList products={orderItens} removeItem={removeItem} />
      </div>
      <div className="sm:w-fit w-full">
        <ButtonNew
          label={!id ? 'Enviar pedido' : 'Salvar'}
          disabled={!isDirty || !orderItens.length}
        />
      </div>
    </Form>
  );
};

export default OrderForm;
