import { useThemeContext } from '../../context/ThemeContext';
import styles from '../../theme.module.scss';

const PageTitle: React.FC = () => {
  const { pageTitle } = useThemeContext();

  return (
    <h1 className={styles.pageTitle}>{pageTitle ?? 'Página não encontrada'}</h1>
  );
};

export default PageTitle;
