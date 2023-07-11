export interface IThemePageActions {
  action?: string;
  buttonItem?: React.ReactNode;
}

export interface IThemeState {
  pageTitle: string;
  pageActions?: IThemePageActions[];
  isReady: boolean;
  isLoading: boolean;
}

export interface IThemeActions {
  changePageTitle: (title: string) => void;
  setPageActions: (actionButtons: object[]) => void;
  setIsLoading: (status: boolean) => void;
}

export interface IThemeContext extends IThemeState {
  actions: IThemeActions;
}
export interface IThemeProvider {
  children: React.ReactNode;
}
