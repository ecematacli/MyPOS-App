import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined'
import DashboardIcon from '@mui/icons-material/Dashboard'
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew'
import SportsTennisRoundedIcon from '@mui/icons-material/SportsTennisRounded'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart'
import HistoryIcon from '@mui/icons-material/History'
import AssessmentOutlinedIcon from '@mui/icons-material/AssessmentOutlined'
import ExposureOutlinedIcon from '@mui/icons-material/ExposureOutlined'
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile'
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn'
import SyncAltIcon from '@mui/icons-material/SyncAlt'
import { UserRoles } from 'types/user'

export interface MenuItem {
  label: string
  item: string
  url?: string
  subMenuItems?: SubMenuItem[]
  Icon: React.ElementType
  allowedRoles: UserRoles[]
}

export interface SubMenuItem {
  subLabel: string
  url: string
  Icon: React.ElementType
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
        subLabel: 'Kasa',
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
        Icon: SyncAltIcon,
        allowedRoles: [UserRoles.Admin, UserRoles.Employee],
      },
      {
        subLabel: 'Price Updates',
        url: '/inventory/price-updates',
        Icon: MonetizationOnIcon,
        allowedRoles: [UserRoles.Admin],
      },
    ],
  },
  {
    label: 'Çıkış yap',
    item: 'signout',
    url: 'signin',
    Icon: PowerSettingsNewIcon,
    allowedRoles: [UserRoles.Admin, UserRoles.Employee],
  },
]
