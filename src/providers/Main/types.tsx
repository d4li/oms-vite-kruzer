export interface IMainState {
  isReady: boolean;
}

export interface IMainActions {
  // addMain: (product: IMain) => void;
  // editMain: (productId: string, product: IMain) => void;
  // addMains: (products: IMain[]) => void;
}

export interface IMainContext extends IMainState {
  actions: IMainActions;
}
