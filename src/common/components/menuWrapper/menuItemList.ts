import { SvgIconProps } from '@material-ui/core'
import MonetizationOnOutlinedIcon from '@material-ui/icons/MonetizationOnOutlined'
import DashboardIcon from '@material-ui/icons/Dashboard'
import PowerSettingsNew from '@material-ui/icons/PowerSettingsNew'
import SportsTennisRoundedIcon from '@material-ui/icons/SportsTennisRounded'
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart'
import HistoryIcon from '@material-ui/icons/History'
import AssessmentOutlinedIcon from '@material-ui/icons/AssessmentOutlined'
import ExposureOutlinedIcon from '@material-ui/icons/ExposureOutlined'
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile'
import { MonetizationOn, SyncAlt } from '@material-ui/icons'
import { UserRole } from '../../../contexts/AuthContext'

export interface MenuItem {
  label: string
  item: string
  url?: string
  subMenuItems?: SubMenuItem[]
  Icon: (props: SvgIconProps) => JSX.Element
  allowedRoles: UserRole[]
}

export interface SubMenuItem {
  subLabel: string
  url: string
  Icon: (props: SvgIconProps) => JSX.Element
  allowedRoles: UserRole[]
}

export const MENU_ITEMS: MenuItem[] = [
  {
    label: 'Dashboard',
    item: 'dashboard',
    url: '/',
    Icon: DashboardIcon,
    allowedRoles: ['admin'],
  },
  {
    label: 'Satışlar',
    item: 'sales',
    Icon: MonetizationOnOutlinedIcon,
    allowedRoles: ['admin', 'employee'],
    subMenuItems: [
      {
        subLabel: 'Satış POS',
        url: '/sales/pos',
        Icon: AddShoppingCartIcon,
        allowedRoles: ['admin', 'employee'],
      },
      {
        subLabel: 'Satış Geçmişi',
        url: '/sales/history',
        Icon: HistoryIcon,
        allowedRoles: ['admin', 'employee'],
      },
    ],
  },
  {
    label: 'Stoklar',
    item: 'inventory',
    Icon: AssessmentOutlinedIcon,
    allowedRoles: ['admin', 'employee'],
    subMenuItems: [
      {
        subLabel: 'Ürünler',
        url: '/inventory/products',
        Icon: SportsTennisRoundedIcon,
        allowedRoles: ['admin', 'employee'],
      },
      {
        subLabel: 'Envanter Sayımı',
        url: '/inventory/inventory-count',
        Icon: ExposureOutlinedIcon,
        allowedRoles: ['admin', 'employee'],
      },
      {
        subLabel: 'Stok Siparişleri',
        url: '/inventory/stock-orders',
        Icon: InsertDriveFileIcon,
        allowedRoles: ['admin', 'employee'],
      },
      {
        subLabel: 'Stok Transferleri',
        url: '/inventory/stock-transfers',
        Icon: SyncAlt,
        allowedRoles: ['admin', 'employee'],
      },
      {
        subLabel: 'Price Updates',
        url: '/inventory/price-updates',
        Icon: MonetizationOn,
        allowedRoles: ['admin'],
      },
    ],
  },
  {
    label: 'Çıkış yap',
    item: 'signout',
    Icon: PowerSettingsNew,
    allowedRoles: ['admin', 'employee'],
  },
]
