import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { toast } from 'react-toastify';
import { getProducts } from '@/services/product';
import { IProduct, IProductContext } from './types';

export const ProductContext = createContext<IProductContext>(
  {} as IProductContext
);

export interface IProductProvider {
  children: React.ReactNode;
}
export const ProductProvider = ({ children }: IProductProvider) => {
  const [isReady, setIsReady] = useState<boolean>(false),
    [products, setProducts] = useState<IProduct[] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getProducts();
      setTimeout(() => {
        setProducts(response!);
      }, 1000);
      setIsReady(true);
    };
    fetchData();
  }, []);

  const //Actions
    addProduct = (product: IProduct) => {
      setProducts([...products!, { ...product }]);
      toast.success('Produto adicionado com sucesso!');
    },
    editProduct = (productId: string, product: IProduct) => {
      let index = products!.findIndex(prod => prod.id == productId);
      products![index] = { ...product };

      setProducts(products);
      toast.success('Produto alterado com sucesso!');
    },
    removeProducts = (ids: number[]) => {
      if (products && products.length)
        setProducts(
          products.filter(prd => {
            if (!ids.includes(Number(prd.id))) return prd;
          })
        );
      toast.success(
        `${
          ids.length === 1
            ? '1 Produto foi excluído'
            : `${ids.length} Produtos foram excluídos!`
        }`
      );
    },
    addProducts = useCallback((products: IProduct[]) => {
      setProducts(products);
      console.log(products);
    }, []);

  return (
    <ProductContext.Provider
      value={{
        isReady,
        products,
        actions: { addProduct, addProducts, editProduct, removeProducts },
      }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProductContext = () => {
  const context = useContext(ProductContext);
  return context;
};
