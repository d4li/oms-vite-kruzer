import styles from './logo.module.scss';

interface ILogo {
  title: string;
  description: string;
}

const Logo = ({ title, description }: ILogo) => {
  return (
    <div className={styles.mainLogo}>
      <h1 className={styles.title}>{title}</h1>
      <span className={styles.description}>{description}</span>
    </div>
  );
};

export default Logo;
