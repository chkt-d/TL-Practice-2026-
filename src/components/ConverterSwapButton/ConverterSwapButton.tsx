import styles from './ConverterSwapButton.module.scss';
import { ArrowIcon } from '../ConverterArrowIcon/ConverterArrowIcon';

type swapButtonProps = {
  onCurrencySwap: () => void;
};

export const SwapButton = ({ onCurrencySwap }: swapButtonProps) => {
  return (
    <button className={styles.button} type="button" onClick={onCurrencySwap}>
      <ArrowIcon direction="up" />
      <ArrowIcon direction="down" />
    </button>
  );
};
