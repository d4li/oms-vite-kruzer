import { ButtonLink } from '@/components/Button';
import styles from './navigation.module.scss';

const Navigation: React.FC = () => {
  return (
    <nav className={styles.nav}>
      <ul>
        <li>
          <ButtonLink activeClassName={styles.active} label="Home" path="/" />
        </li>
        <li>
          <ButtonLink
            activeClassName={styles.active}
            label="Meus Produtos"
            path="/products"
          />
        </li>
        <li>
          <ButtonLink
            activeClassName={styles.active}
            label="Meus Pedidos"
            path="/orders"
          />
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
