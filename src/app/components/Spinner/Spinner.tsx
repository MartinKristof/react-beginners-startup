import { FC } from 'react';
import styles from './Spinner.module.css';

export const Spinner: FC = () => (
  <div className={styles.wrapper}>
    <div className={styles.loader} />
  </div>
);
