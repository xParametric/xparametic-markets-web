import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Market } from 'models/market';
import * as marketService from 'services/Polkamarkets/market';

export interface MarketInitialState {
  market: Market;
  isLoading: boolean;
  error: any;
}

const initialState: MarketInitialState = {
  market: {
    id: '',
    slug: '',
    category: '',
    subcategory: '',
    imageUrl: '',
    title: '',
    volume: 0,
    shares: 0,
    liquidity: 0,
    liquidityPrice: 0,
    expiresAt: '',
    state: 'open',
    resolvedOutcomeId: -1,
    oracleSource: '',
    outcomes: [
      {
        id: '-1',
        marketId: '',
        title: '',
        price: 0,
        change: {
          type: '',
          chartData: []
        },
        priceCharts: [],
        shares: 0
      },
      {
        id: '-2',
        marketId: '',
        title: '',
        price: 0,
        change: {
          type: '',
          chartData: []
        },
        priceCharts: [],
        shares: 0
      }
    ]
  },
  isLoading: false,
  error: null
};

const marketSlice = createSlice({
  name: 'market',
  initialState,
  reducers: {
    request: state => ({
      ...state,
      isLoading: true
    }),
    success: {
      reducer: (state, action: PayloadAction<Market>) => ({
        ...state,
        market: action.payload,
        isLoading: false
      }),
      prepare: (market: Market) => {
        return {
          payload: {
            ...market,
            outcomes: market.outcomes.map(outcome => ({
              ...outcome,
              price: Number(outcome.price.toFixed(3))
            }))
          }
        };
      }
    },
    error: (state, action) => ({
      ...state,
      market: initialState.market,
      isLoading: false,
      error: action.payload
    }),
    marketSelected: {
      reducer: (state, action: PayloadAction<Market>) => ({
        ...state,
        market: action.payload
      }),
      prepare: (market: Market) => {
        return {
          payload: {
            ...market,
            outcomes: market.outcomes.map(outcome => ({
              ...outcome,
              price: Number(outcome.price.toFixed(3))
            }))
          }
        };
      }
    },
    clearMarket: state => ({
      ...state,
      market: initialState.market
    }),
    changeOutcomePrice: (state, action) => ({
      ...state,
      market: {
        ...state.market,
        outcomes: state.market.outcomes.map((outcome, index) =>
          index === action.payload.outcomeId
            ? { ...outcome, price: action.payload.outcomePrice }
            : outcome
        )
      }
    })
  }
});

export default marketSlice.reducer;

const {
  request,
  success,
  error,
  marketSelected,
  clearMarket,
  changeOutcomePrice
} = marketSlice.actions;

export { marketSelected, clearMarket, changeOutcomePrice };

export function getMarket(marketSlug: string) {
  return async dispatch => {
    dispatch(request());
    try {
      const response = await marketService.getMarket(marketSlug);
      const { data } = response;
      dispatch(success(data));
    } catch (err) {
      dispatch(error(err));
    }
  };
}
