import { ButtonLink } from '@/components/Button';
import styles from './navigation.module.scss';

const Navigation: React.FC = () => {
  return (
    <nav className={styles.nav}>
      <ul>
        <li>
          <ButtonLink label="Home" path="/" />
        </li>
        <li>
          <ButtonLink label="Meus Produtos" path="/products" />
        </li>
        <li>
          <ButtonLink label="Meus Pedidos" path="/orders" />
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
