import { useThemeContext } from './context/ThemeContext';
import Logo from './widgets/Logo';
import Navigation from './widgets/Navigation';
import PageTitle from './widgets/PageTitle';
import PageActions from './widgets/PageActions';
import NavSidebar from './widgets/NavSidebar';
import Loading from '@/components/Loading';
import styles from './theme.module.scss';

type Props = {
  children?: React.ReactNode;
};
const ThemeDefault: React.FC<Props> = ({ children }) => {
  const { isReady, isLoading } = useThemeContext();
  return (
    <div className={styles.mainTheme}>
      <NavSidebar>
        <Logo title="OMS" description="Order management system" />
        <Navigation />
      </NavSidebar>
      <section className={styles.content}>
        {isReady ? (
          <>
            <div className={styles.headerContent}>
              <PageTitle />
              <PageActions />
            </div>
            <article className={styles.innerContent}>
              {!isLoading ? children : <Loading />}
            </article>
          </>
        ) : (
          <Loading />
        )}
      </section>
    </div>
  );
};

export default ThemeDefault;
