export interface IProduct {
  id: number | string;
  title: string;
  description: string;
  quantity?: number;
  price: number;
  status?: boolean;
}

export interface IProductState {
  products: IProduct[] | null;
  isReady: boolean;
}

export interface IProductActions {
  addProduct: (product: IProduct) => void;
  editProduct: (productId: string, product: IProduct) => void;
  removeProducts: (ids: number[]) => void;
  addProducts: (products: IProduct[]) => void;
}

export interface IProductContext extends IProductState {
  actions: IProductActions;
}
