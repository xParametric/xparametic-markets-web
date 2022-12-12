import { useState, useMemo, memo } from 'react';

import { isEmpty } from 'lodash';
import { setFilter } from 'redux/ducks/portfolio';
import { useGetMarketsByIdsQuery } from 'services/Polkamarkets';
import { useMedia } from 'ui';

import { ButtonGroup, PortfolioMarketTable, Filter } from 'components';

import { useAppSelector, useAppDispatch, useNetwork } from 'hooks';

import { formatMarketPositions } from './utils';

function TabsFilter() {
  const dispatch = useAppDispatch();

  function handleChangeFilter(newFilter: { value: string; name: string }) {
    dispatch(setFilter(newFilter.value));
  }

  return (
    <Filter
      description="Filter:"
      defaultOption="open"
      options={[
        { value: 'open', name: 'Open' },
        { value: 'resolved', name: 'Resolved' }
      ]}
      onChange={handleChangeFilter}
      className="portfolio-tabs__header-filter"
    />
  );
}

const PortfolioTabsFilter = memo(TabsFilter);

function PortfolioTabs() {
  const { network } = useNetwork();
  const [currentTab, setCurrentTab] = useState('marketPositions');
  const isDesktop = useMedia('(min-width: 1024px)');
  const {
    portfolio,
    actions,
    marketsWithActions,
    marketsWithBonds,
    isLoading
  } = useAppSelector(state => state.polkamarkets);

  const positionsTypo = isDesktop ? ' Positions' : '';
  const { portfolio: isLoadingPortfolio, actions: isLoadingActions } =
    isLoading;

  const marketsIds = [...marketsWithActions, ...marketsWithBonds];

  const { data: markets, isLoading: isLoadingMarkets } =
    useGetMarketsByIdsQuery(
      {
        ids: marketsIds,
        networkId: network.id
      },
      {
        skip: isLoadingActions || isEmpty(marketsIds)
      }
    );

  const marketPositions = useMemo(
    () => formatMarketPositions(portfolio, actions, markets),
    [actions, markets, portfolio]
  );

  return (
    <div className="portfolio-tabs">
      <div className="portfolio-tabs__header">
        <ButtonGroup
          defaultActiveId="marketPositions"
          buttons={[
            {
              id: 'marketPositions',
              name: `Market${positionsTypo}`,
              color: 'default'
            }
          ]}
          onChange={setCurrentTab}
          style={{ width: 'fit-content' }}
        />
        <PortfolioTabsFilter />
      </div>
      <div className="portfolio-tabs__content">
        {currentTab === 'marketPositions' ? (
          <PortfolioMarketTable
            rows={marketPositions.rows}
            headers={
              isDesktop
                ? marketPositions.headers
                : marketPositions.headers.filter(
                    header =>
                      header.key === 'market' ||
                      header.key === 'outcome' ||
                      header.key === 'profit'
                  )
            }
            isLoadingData={
              isLoadingMarkets || isLoadingPortfolio || isLoadingActions
            }
          />
        ) : null}
      </div>
    </div>
  );
}

export default PortfolioTabs;
