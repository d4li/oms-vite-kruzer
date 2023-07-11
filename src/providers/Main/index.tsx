import { createContext, useContext, useState } from 'react';
import { IMainContext } from './types';

export const MainContext = createContext<IMainContext>({} as IMainContext);

export interface IMainProvider {
  children: React.ReactNode;
}
export const MainProvider = ({ children }: IMainProvider) => {
  const [isReady, setIsReady] = useState<boolean>(false);

  // const //Actions
  //   addMain = (product: IMain) => {
  //     console.log(products);
  //     setMains([...products, { ...product }]);
  //     console.log(products.length);
  //     toast.success('Produto adicionado com sucesso!');
  //   },
  //   editMain = (productId: string, product: IMain) => {
  //     let index = products.findIndex(prod => prod.id == productId);
  //     products[index] = { ...product };

  //     setMains(products);
  //     toast.success('Produto alterado com sucesso!');
  //   },
  //   addMains = useCallback((products: IMain[]) => {
  //     setMains(products);
  //     console.log(products);
  //   }, []);

  return (
    <MainContext.Provider
      value={{
        isReady,
        actions: { setIsReady },
      }}>
      {children}
    </MainContext.Provider>
  );
};

export const useMainContext = () => {
  const context = useContext(MainContext);
  return context;
};
