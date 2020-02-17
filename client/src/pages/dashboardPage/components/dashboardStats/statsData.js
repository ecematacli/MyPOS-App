import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import AttachMoneyOutlinedIcon from '@material-ui/icons/AttachMoneyOutlined';
import TrendingUpOutlinedIcon from '@material-ui/icons/TrendingUpOutlined';

export const statsData = ({ revenue, saleCount, soldProductCount }) => [
  {
    label: 'Revenue',
    id: 'revenue',
    currency: true,
    Icon: AttachMoneyOutlinedIcon,
    value: revenue
  },
  {
    label: 'Profit',
    id: 'profit',
    currency: true,
    Icon: ShoppingCartOutlinedIcon
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
