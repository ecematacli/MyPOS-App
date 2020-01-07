import MonetizationOnOutlinedIcon from '@material-ui/icons/MonetizationOnOutlined';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PowerSettingsNew from '@material-ui/icons/PowerSettingsNew';
import SportsTennisRoundedIcon from '@material-ui/icons/SportsTennisRounded';

export default [
  {
    label: 'Dashboard',
    url: '/',
    Icon: DashboardIcon
  },
  {
    label: 'Sales',
    Icon: MonetizationOnOutlinedIcon,
    subMenuItems: [
      {
        subLabel: 'Sales POS',
        url: '/sales/pos'
      },
      {
        subLabel: 'Sales History',
        url: '/sales/history'
      }
    ]
  },
  {
    label: 'Products',
    url: '/products',
    Icon: SportsTennisRoundedIcon
  },
  {
    label: 'Sign Out',
    Icon: PowerSettingsNew
  }
];
