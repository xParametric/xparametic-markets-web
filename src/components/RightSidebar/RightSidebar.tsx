import { useAppSelector } from 'hooks';

import LiquidityForm from '../LiquidityForm';
import TradeForm from '../TradeForm';

function RightSidebar() {
  const tradeFormVisible = useAppSelector(state => state.trade.visible);
  const liquidityFormVisible = useAppSelector(state => state.liquidity.visible);

  if (tradeFormVisible)
    return (
      <div className="pm-l-right-sidebar">
        <TradeForm />
      </div>
    );

  if (liquidityFormVisible)
    return (
      <div className="pm-l-right-sidebar">
        <LiquidityForm />
      </div>
    );

  return null;
}

RightSidebar.displayName = 'RightSidebar';

export default RightSidebar;
