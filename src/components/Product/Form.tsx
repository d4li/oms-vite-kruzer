import { Form, useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useProductContext } from '@/providers/Product';
import { ValidationSchema, schema } from './schema';

import styles from '@/components/Form/form.module.scss';
import { moneyMask } from '@/utils/currency/numberToCurrency';
import Loading from '@/components/Loading';
import { ButtonNew } from '@/components/Button';

const NewProduct = () => {
  const {
    products,
    isReady,
    actions: { addProduct, editProduct },
  } = useProductContext();
  const navigate = useNavigate();
  let { id } = useParams();
  let productEdit;

  if (id && products) {
    productEdit = products.find(product => product.id == id);
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ValidationSchema>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: any) => {
    console.log('data', data);
    if (data) {
      if (id) {
        editProduct(id, {
          ...data,
          category: "men's clothing",
          image: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
        });
      } else {
        addProduct({
          id: products!.length + 1,
          ...data,
          category: "men's clothing",
          image: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
        });
      }
    }
    return navigate('/products');
  };

  if (id && !isReady) return <Loading />;

  return (
    <Form onSubmit={handleSubmit(onSubmit)} method="post">
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className={styles.mainField}>
          <label>
            Titulo <span className={styles.req}>*</span>
          </label>
          <input
            type="text"
            placeholder="Titulo do produto"
            defaultValue={productEdit?.title}
            {...register('title')}
          />
          {errors && errors.title?.message && (
            <p role="alert">{errors.title.message}</p>
          )}
        </div>
        <div className={styles.mainField}>
          <label>
            Descrição <span className={styles.req}>*</span>
          </label>
          <input
            type="text"
            placeholder="Descrição do produto"
            defaultValue={productEdit?.description}
            {...register('description')}
          />
          {errors && errors.description?.message && (
            <p role="alert">{errors.description.message}</p>
          )}
        </div>
        <div className={styles.mainField}>
          <label>
            Preço <span className={styles.req}>*</span>
          </label>
          <input
            type="tel"
            placeholder="R$ 0,00"
            defaultValue={productEdit?.price.toLocaleString('pt-br', {
              style: 'currency',
              currency: 'BRL',
            })}
            {...register('price', {
              onChange: event => {
                const { value } = event.target;
                event.target.value = moneyMask(value);
              },
            })}
          />
          {errors && errors.price?.message && (
            <p role="alert">{errors.price.message}</p>
          )}
        </div>
      </div>
      <div className="sm:w-fit w-full">
        <ButtonNew label={!id ? 'Adicionar' : 'Salvar'} />
      </div>
    </Form>
  );
};

export default NewProduct;
