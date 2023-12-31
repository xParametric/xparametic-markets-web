import { ReactNode } from 'react';

import type { IconProps } from 'components/Icon';

export type Currency = {
  name: string;
  ticker: string;
  symbol: string;
  icon: ReactNode;
  iconName: IconProps['name'];
};

export type Token = {
  name: string;
  symbol: string;
  ticker: string;
  address: string;
  decimals: number;
  wrapped: boolean;
  iconName: IconProps['name'];
};
