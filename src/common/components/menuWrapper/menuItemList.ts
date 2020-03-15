import MonetizationOnOutlinedIcon from '@material-ui/icons/MonetizationOnOutlined';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PowerSettingsNew from '@material-ui/icons/PowerSettingsNew';
import SportsTennisRoundedIcon from '@material-ui/icons/SportsTennisRounded';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import HistoryIcon from '@material-ui/icons/History';
import AssessmentOutlinedIcon from '@material-ui/icons/AssessmentOutlined';
import ExposureOutlinedIcon from '@material-ui/icons/ExposureOutlined';
import { SvgIconProps } from '@material-ui/core';

export interface MenuItem {
  label: string;
  item: string;
  url?: string;
  subMenuItems?: SubMenuItem[];
  Icon: (props: SvgIconProps) => JSX.Element;
}

export interface SubMenuItem {
  subLabel: string;
  url: string;
  Icon: (props: SvgIconProps) => JSX.Element;
}

export const MENU_ITEMS: MenuItem[] = [
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
        url: '/inventory/products',
        Icon: SportsTennisRoundedIcon
      },
      {
        subLabel: 'Inventory Count',
        url: '/inventory/count',
        Icon: ExposureOutlinedIcon
      }
    ]
  },
  {
    label: 'Sign Out',
    item: 'signout',
    Icon: PowerSettingsNew
  }
];
