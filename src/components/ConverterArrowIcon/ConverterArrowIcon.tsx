import styles from './ConverterArrowIcon.module.scss';
import arrowIcon from '../../icons/ArrowIcon.svg';

type ArrowIconProps = {
  direction?: 'up' | 'down';
};

export const ArrowIcon = ({ direction = 'up' }: ArrowIconProps) => (
  <img src={arrowIcon} className={`${styles.arrow} ${direction === 'down' ? styles.arrowDown : ''}`}></img>
);
