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
import { UserRoles } from '../../../api/user/types'

export interface MenuItem {
  label: string
  item: string
  url?: string
  subMenuItems?: SubMenuItem[]
  Icon: (props: SvgIconProps) => JSX.Element
  allowedRoles: UserRoles[]
}

export interface SubMenuItem {
  subLabel: string
  url: string
  Icon: (props: SvgIconProps) => JSX.Element
  allowedRoles: UserRoles[]
}

export const MENU_ITEMS: MenuItem[] = [
  {
    label: 'Dashboard',
    item: 'dashboard',
    url: '/',
    Icon: DashboardIcon,
    allowedRoles: [UserRoles.Admin],
  },
  {
    label: 'Satışlar',
    item: 'sales',
    Icon: MonetizationOnOutlinedIcon,
    allowedRoles: [UserRoles.Admin, UserRoles.Employee],
    subMenuItems: [
      {
        subLabel: 'Satış POS',
        url: '/sales/pos',
        Icon: AddShoppingCartIcon,
        allowedRoles: [UserRoles.Admin, UserRoles.Employee],
      },
      {
        subLabel: 'Satış Geçmişi',
        url: '/sales/history',
        Icon: HistoryIcon,
        allowedRoles: [UserRoles.Admin, UserRoles.Employee],
      },
    ],
  },
  {
    label: 'Stoklar',
    item: 'inventory',
    Icon: AssessmentOutlinedIcon,
    allowedRoles: [UserRoles.Admin, UserRoles.Employee],
    subMenuItems: [
      {
        subLabel: 'Ürünler',
        url: '/inventory/products',
        Icon: SportsTennisRoundedIcon,
        allowedRoles: [UserRoles.Admin, UserRoles.Employee],
      },
      {
        subLabel: 'Envanter Sayımı',
        url: '/inventory/inventory-count',
        Icon: ExposureOutlinedIcon,
        allowedRoles: [UserRoles.Admin, UserRoles.Employee],
      },
      {
        subLabel: 'Stok Siparişleri',
        url: '/inventory/stock-orders',
        Icon: InsertDriveFileIcon,
        allowedRoles: [UserRoles.Admin, UserRoles.Employee],
      },
      {
        subLabel: 'Stok Transferleri',
        url: '/inventory/stock-transfers',
        Icon: SyncAlt,
        allowedRoles: [UserRoles.Admin, UserRoles.Employee],
      },
      {
        subLabel: 'Price Updates',
        url: '/inventory/price-updates',
        Icon: MonetizationOn,
        allowedRoles: [UserRoles.Admin],
      },
    ],
  },
  {
    label: 'Çıkış yap',
    item: 'signout',
    Icon: PowerSettingsNew,
    allowedRoles: [UserRoles.Admin, UserRoles.Employee],
  },
]
