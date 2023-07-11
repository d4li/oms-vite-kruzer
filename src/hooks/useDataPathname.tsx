import { useLocation } from 'react-router-dom';

const useRouteId = () => {
  const { pathname } = useLocation();
  let path = pathname;

  if (pathname.match(/\/edit\/\d+/)) path = pathname.replace(/\/\d+/, '');

  return path
    .split('/')
    .filter((a) => a)
    .join('-');
};

export default useRouteId;
