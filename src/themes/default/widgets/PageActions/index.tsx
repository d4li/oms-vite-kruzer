import { useThemeContext } from '@/themes/default/context/ThemeContext';
import styles from '@/themes/default/theme.module.scss';

const PageActions: React.FC = () => {
  const { pageActions } = useThemeContext();

  if (pageActions)
    return (
      <div className={styles.pageActions}>
        {pageActions.map(({ buttonItem }, index) => {
          if (buttonItem) {
            return <div key={index}>{buttonItem}</div>;
          }
        })}
      </div>
    );
  return null;
};

export default PageActions;
