import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import clsx from 'clsx';
import useToggle from '@/hooks/useToggle';
import ToggleNavigation from '../ToggleNavigation';
import styles from './../../theme.module.scss';

interface NavSidebarProps {
  children?: React.ReactNode;
}
const NavSidebar: React.FC<NavSidebarProps> = ({ children }) => {
  const { opened, toggle } = useToggle(),
    location = useLocation();

  useEffect(() => {
    if (opened && window.innerWidth < 768) toggle();
  }, [location]);

  return (
    <aside
      className={clsx({ [styles.sidebar]: true, [styles.opened]: opened })}>
      {children}
      <ToggleNavigation handleClick={toggle} />
    </aside>
  );
};

export default NavSidebar;
