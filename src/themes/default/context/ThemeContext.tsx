import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useLocation, useRouteLoaderData } from 'react-router-dom';
import useRouteId from '@/hooks/useDataPathname';
import { IRouterData } from '@/routes';
import { IThemeContext, IThemeProvider } from './types';

export const ThemeContext = createContext<IThemeContext>({} as IThemeContext);

export const ThemeProvider = ({ children }: IThemeProvider) => {
  const [isLoading, setIsLoading] = useState<boolean>(false),
    [isReady, setIsReady] = useState<boolean>(false),
    [pageTitle, setPageTitle] = useState<string>(''),
    [pageActions, setPageActions] = useState<object[]>([]);

  const { pathname } = useLocation(),
    routeId = useRouteId(),
    routerData = useRouteLoaderData(routeId) as IRouterData;

  useEffect(() => {
    setIsReady(true);
  }, []);

  useEffect(() => {
    const { pageTitle, actionButtons } = routerData;
    changePageTitle(pageTitle);
    setPageActions(actionButtons ?? []);
  }, [pathname]);

  const //Actions
    changePageTitle = useCallback((title: string) => {
      setPageTitle(title);
    }, []);

  return (
    <ThemeContext.Provider
      value={{
        pageTitle,
        pageActions,
        isReady,
        isLoading,
        actions: { changePageTitle, setPageActions, setIsLoading },
      }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  return context;
};
