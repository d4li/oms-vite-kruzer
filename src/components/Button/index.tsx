import { Link, To, useLocation } from 'react-router-dom';
import styles from './button.module.scss';
import clsx from 'clsx';
import { ButtonHTMLAttributes } from 'react';

interface IButtonProps {
  activeClassName?: string;
  label?: string;
  path: To | string;
  children?: React.ReactNode | string;
  icon?: React.ReactNode | string;
}
export const ButtonLink: React.FC<IButtonProps> = ({
  children,
  activeClassName,
  label,
  path,
  icon,
}) => {
  const { pathname } = useLocation();
  const classButton = clsx({
    [styles.btn]: true,
    [styles['btn--link']]: true,
    [styles.active]:
      (path !== '/' && pathname.startsWith(path)) ||
      (pathname == path && !activeClassName),
    ...(activeClassName && pathname == path && { [activeClassName]: true }),
  });

  return (
    <Link to={path} className={classButton} title={label}>
      {icon}
      <span>{children ?? label}</span>
    </Link>
  );
};

export interface IButtonSubmit extends ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
  icon?: React.ReactNode | string;
  type?: 'submit' | 'reset' | 'button';
  status?: undefined | 'error' | 'success' | 'warning';
  onClick?: () => void;
}

export const ButtonNew: React.FC<IButtonSubmit> = ({
  label,
  icon,
  onClick,
  status,
  type,
  ...props
}) => {
  const classButton = clsx({
    [styles.btn]: true,
    [styles['btn--button']]: true,
    ...(status && { [styles[status]]: true }),
  });

  const handleClick = (e: React.MouseEvent) => {
    console.log('handleClick');
    if (onClick) {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <button
      className={classButton}
      type={type}
      onClick={handleClick}
      {...props}>
      {icon}
      <span>{label}</span>
    </button>
  );
};
