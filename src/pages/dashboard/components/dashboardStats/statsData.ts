import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import AttachMoneyOutlinedIcon from '@material-ui/icons/AttachMoneyOutlined';
import TrendingUpOutlinedIcon from '@material-ui/icons/TrendingUpOutlined';

import { SaleStatsData } from '../../types';
import { SvgIconProps } from '@material-ui/core';

interface StatFields {
  label: string;
  id: string;
  currency: boolean;
  Icon: (props: SvgIconProps) => JSX.Element;
  value: number;
}
export const statsData = ({
  webRevenue,
  storeRevenue,
  saleCount,
  soldProductCount
}: SaleStatsData): StatFields[] => [
  {
    label: 'Revenue (store)',
    id: 'revenue',
    currency: true,
    Icon: AttachMoneyOutlinedIcon,
    value: storeRevenue
  },
  {
    label: 'Revenue (web)',
    id: 'profit',
    currency: true,
    Icon: AttachMoneyOutlinedIcon,
    value: webRevenue
  },
  {
    label: 'Products Sold',
    id: 'itemsSold',
    currency: false,
    Icon: ShoppingCartOutlinedIcon,
    value: soldProductCount
  },
  {
    label: 'Sale Count',
    id: 'saleCount',
    currency: false,
    Icon: TrendingUpOutlinedIcon,
    value: saleCount
  }
];
