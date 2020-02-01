import MonetizationOnOutlinedIcon from '@material-ui/icons/MonetizationOnOutlined';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PowerSettingsNew from '@material-ui/icons/PowerSettingsNew';
import SportsTennisRoundedIcon from '@material-ui/icons/SportsTennisRounded';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import HistoryIcon from '@material-ui/icons/History';
import AssessmentOutlinedIcon from '@material-ui/icons/AssessmentOutlined';

export default [
  {
    label: 'Dashboard',
    item: 'dashboard',
    url: '/',
    Icon: DashboardIcon
  },
  {
    label: 'Sales',
    item: 'sales',
    Icon: MonetizationOnOutlinedIcon,
    subMenuItems: [
      {
        subLabel: 'Sales POS',
        url: '/sales/pos',
        Icon: AddShoppingCartIcon
      },
      {
        subLabel: 'Sales History',
        url: '/sales/history',
        Icon: HistoryIcon
      }
    ]
  },
  {
    label: 'Inventory',
    item: 'inventory',
    Icon: AssessmentOutlinedIcon,
    subMenuItems: [
      {
        subLabel: 'Products',
        url: '/products',
        Icon: SportsTennisRoundedIcon
      }
    ]
  },
  {
    label: 'Sign Out',
    item: 'signout',
    Icon: PowerSettingsNew
  }
];
