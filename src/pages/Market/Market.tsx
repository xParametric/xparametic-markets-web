import { useCallback, useEffect, useRef, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import dayjs from 'dayjs';
import type { Action } from 'redux/ducks/polkamarkets';
import { Container } from 'ui';
import Spinner from 'ui/Spinner';

import { ArrowLeftIcon } from 'assets/icons';

import {
  Tabs,
  Table,
  Text,
  Button,
  SEO,
  VoteArrows,
  AlertMini
} from 'components';

import { useAppDispatch, useAppSelector, useNetwork } from 'hooks';

import MarketAnalytics from './MarketAnalytics';
import MarketChart from './MarketChart';
import MarketChartViewSelector from './MarketChartViewSelector';
import MarketHead from './MarketHead';
import MarketNews from './MarketNews';
import MarketStats from './MarketStats';
import { formatMarketPositions, formatSEODescription } from './utils';

export default function Market() {
  const history = useHistory();
  const network = useNetwork();
  const params = useParams<Record<'marketId', string>>();
  const dispatch = useAppDispatch();
  const { market, ...marketProps } = useAppSelector(state => state.market);
  const actions = useAppSelector(state => state.polkamarkets.actions);
  const bondActions = useAppSelector(state => state.polkamarkets.bondActions);
  const [tab, setTab] = useState('positions');
  const [retries, setRetries] = useState(0);
  const handleBack = useCallback(async () => {
    const { pages } = await import('config');
    const { reset } = await import('redux/ducks/trade');
    const { closeRightSidebar } = await import('redux/ducks/ui');

    dispatch(closeRightSidebar());
    history.push(pages.home.pathname);
    dispatch(reset());
  }, [dispatch, history]);
  const tableItems = formatMarketPositions<Action>(
    actions.filter(action => action.marketId === -market?.id),
    bondActions.filter(action => action.questionId === market?.questionId),
    market,
    market.currency.symbol || market.currency.ticker,
    network
  );

  useEffect(() => {
    (async function handleMarket() {
      const { reset } = await import('redux/ducks/trade');
      const { openTradeForm } = await import('redux/ducks/ui');
      const { getMarket, setChartViewType } = await import(
        'redux/ducks/market'
      );

      dispatch(openTradeForm());
      dispatch(reset());
      dispatch(getMarket(params.marketId));
      dispatch(setChartViewType('marketOverview'));
    })();
  }, [dispatch, params.marketId, retries]);
  useEffect(() => {
    async function handleHome() {
      const { pages } = await import('config');

      history.push(`${pages.home.pathname}?m=f`);
      window.location.reload();
    }

    if (!marketProps.isLoading && marketProps.error) {
      if (marketProps.error.response.status === 404) handleHome();
      else if (retries < 3) setRetries(prevRetries => prevRetries + 1);
      else handleHome();
    }
  }, [history, marketProps.error, marketProps.isLoading, retries]);

  if (!market || market.id === '' || marketProps.isLoading) return <Spinner />;
  return (
    <>
      <SEO
        title={market.title}
        description={formatSEODescription(
          market.category,
          market.subcategory,
          market.expiresAt
        )}
        image={market.bannerUrl}
      />
      <Container className="pm-p-market">
        <div className="pm-p-market__analytics">
          <MarketAnalytics
            liquidity={market.liquidity}
            volume={market.volume}
            expiration={dayjs(market.expiresAt)
              .utc()
              .format('YYYY-MM-DD HH:mm UTC')}
          />
        </div>
        <div className="pm-p-market__market">
          <MarketHead
            isVerified={market.verified}
            section={market.category}
            subsection={market.subcategory}
            imageUrl={market.imageUrl}
            description={market.title}
          />
          <div className="pm-p-market__actions">
            <VoteArrows
              key={market.slug}
              size="md"
              marketId={market.id}
              marketNetworkId={market.networkId}
              marketSlug={market.slug}
              votes={market.votes}
            />
            <Button variant="outline" size="sm" onClick={handleBack}>
              <ArrowLeftIcon />
              Back to Markets
            </Button>
          </div>
        </div>
        {market.tradingViewSymbol && (
          <div className="pm-p-market__view">
            <MarketChartViewSelector />
          </div>
        )}
        <div className="pm-p-market__charts">
          <MarketChart />
        </div>
        <div className="pm-p-market__stats">
          <MarketStats market={market} />
        </div>
        {market.resolutionSource && (
          <div className="pm-p-market__source">
            <Text
              as="p"
              scale="tiny"
              fontWeight="semibold"
              style={{ margin: '0.8rem 0rem' }}
              color="lighter-gray"
            >
              Resolution source:{' '}
              <a
                href={market.resolutionSource}
                target="_blank"
                className="tiny semibold text-primary"
                rel="noreferrer"
              >
                {market.resolutionSource}
              </a>
            </Text>
          </div>
        )}
        <div className="pm-p-market__tabs">
          <Tabs value={tab} onChange={setTab}>
            <Tabs.TabPane tab="Positions" id="positions">
              {network.network.id !== market.networkId.toString() ? (
                <AlertMini
                  styles="outline"
                  variant="information"
                  description={`Switch network to ${market.network.name} and see your market positions.`}
                />
              ) : (
                <Table
                  columns={tableItems.columns}
                  rows={tableItems.rows}
                  isLoadingData={marketProps.isLoading}
                  emptyDataDescription="You have no positions."
                />
              )}
            </Tabs.TabPane>
            <Tabs.TabPane tab="News (Beta)" id="news">
              {market.news?.length ? (
                <MarketNews news={market.news} />
              ) : (
                <AlertMini
                  styles="outline"
                  variant="information"
                  description="There's no news to be shown."
                />
              )}
            </Tabs.TabPane>
          </Tabs>
        </div>
      </Container>
    </>
  );
}
