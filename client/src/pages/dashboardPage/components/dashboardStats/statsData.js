import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import AttachMoneyOutlinedIcon from '@material-ui/icons/AttachMoneyOutlined';
import TrendingUpOutlinedIcon from '@material-ui/icons/TrendingUpOutlined';
import StoreIcon from '@material-ui/icons/Store';

export const statsData = ({ revenue, saleCount, soldProductCount }) => [
  {
    label: 'Revenue',
    id: 'revenue',
    currency: true,
    Icon: StoreIcon,
    value: revenue
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
    Icon: ShoppingCartOutlinedIcon,
    value: saleCount
  },
  {
    label: 'Sale Count',
    id: 'saleCount',
    currency: false,
    Icon: TrendingUpOutlinedIcon,
    value: soldProductCount
  }
];
