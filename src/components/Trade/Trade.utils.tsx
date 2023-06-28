/* eslint-disable import/prefer-default-export */
import { roundNumber } from 'helpers/math';

import Icon from '../Icon';
import Text from '../Text';
import styles from './Trade.module.scss';

type ProbabilityRowRenderArgs = {
  from: number;
  to: number;
};

function probabilityRowRender({ from, to }: ProbabilityRowRenderArgs) {
  return (
    <div className="flex-row align-center gap-2">
      <Text as="span" scale="caption" fontWeight="bold">
        {roundNumber(from * 100, 2)}%
      </Text>
      <Icon
        name="Arrow"
        size="sm"
        dir="right"
        className={styles.detailsProbabilityArrow}
      />
      <Text as="strong" scale="caption" fontWeight="bold">
        {roundNumber(to * 100, 2)}%
      </Text>
    </div>
  );
}

function formatTradeDetails({ type, price, maxStake, maxROI, shares, ticker }) {
  return [
    {
      key: 'probability',
      title: 'Probability',
      value: { from: price, to: price },
      render: probabilityRowRender
    },
    type === 'buy'
      ? {
          key: 'payout',
          title: 'Max Payout',
          value: `${roundNumber(maxStake, 3)} ${ticker} (+${roundNumber(
            maxROI,
            2
          )}%)`
        }
      : {
          key: 'shares',
          title: 'Shares sold',
          value: roundNumber(shares, 3)
        }
  ];
}

export { formatTradeDetails };
