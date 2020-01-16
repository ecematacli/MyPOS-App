import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import AttachMoneyOutlinedIcon from '@material-ui/icons/AttachMoneyOutlined';
import TrendingUpOutlinedIcon from '@material-ui/icons/TrendingUpOutlined';
import StoreIcon from '@material-ui/icons/Store';

const warningBoxShadow = {
  boxShadow: '0 10px -12px rgba(#000, 16, 0.42)'
};

export const STAT_PROPS = [
  {
    label: 'Revenue',
    id: 'revenue',
    currency: true,
    Icon: StoreIcon
  },
  {
    label: 'Profit',
    id: 'profit',
    currency: true,
    Icon: AttachMoneyOutlinedIcon
  },
  {
    label: 'Products Sold',
    id: 'itemsSold',
    currency: false,
    Icon: ShoppingCartOutlinedIcon
  },
  {
    label: 'Sale Count',
    id: 'saleCount',
    currency: false,
    Icon: TrendingUpOutlinedIcon
  }
];
