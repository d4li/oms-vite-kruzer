import styles from './../../theme.module.scss';
import { Arrow_Left } from '@/utils/icons';

interface IToggleButton {
  handleClick?: () => void;
}

const ToggleNavigation: React.FC<IToggleButton> = ({ handleClick }) => {
  return (
    <div className={styles.toggleButton} onClick={handleClick}>
      <Arrow_Left />
    </div>
  );
};

export default ToggleNavigation;
