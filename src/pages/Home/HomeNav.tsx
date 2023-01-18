import { useCallback } from 'react';

import { setSorter } from 'redux/ducks/markets';
import { useMedia } from 'ui';

import { Button, CreateMarket, Feature, Filter, Icon } from 'components';

import { useAppDispatch } from 'hooks';
import useMarkets from 'hooks/useMarkets';

import HomeNavSearch from './HomeNavSearch';
import { filters } from './utils';

type HomeNavProps = {
  onFilterClick(): void;
};

export default function HomeNav({ onFilterClick }: HomeNavProps) {
  const isDesktop = useMedia('(min-width: 1024px)');
  const dispatch = useAppDispatch();
  const markets = useMarkets();
  const handleSelectedFilter = useCallback(
    (filter: { value: string | number; optionalTrigger?: string }) => {
      dispatch(
        setSorter({ value: filter.value, sortBy: filter.optionalTrigger })
      );
    },
    [dispatch]
  );

  return (
    <>
      <Button
        variant="outline"
        size="sm"
        className="pm-p-home__navigation__actions"
        onClick={onFilterClick}
        disabled={markets.state !== 'success'}
        {...(!isDesktop && { 'aria-label': 'Filter' })}
      >
        <Icon name="Filter" />
        {isDesktop && 'Filter'}
      </Button>
      <HomeNavSearch />
      <Filter
        description="Sort by"
        defaultOption="expiresAt"
        options={filters}
        onChange={handleSelectedFilter}
        className="pm-p-home__navigation__actions"
      />
      {isDesktop && (
        <Feature name="regular">
          <CreateMarket />
        </Feature>
      )}
    </>
  );
}
