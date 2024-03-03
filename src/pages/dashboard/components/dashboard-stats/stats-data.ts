import { SvgIconProps } from '@mui/material'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined'
import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined'
import TrendingUpOutlinedIcon from '@mui/icons-material/TrendingUpOutlined'

import { SaleStatsData } from '../../types'

type StatId = 'revenue' | 'profit' | 'itemsSold' | 'saleCount'
interface StatFields {
  label: string
  id: StatId
  currency: boolean
  Icon: React.ElementType<SvgIconProps>
  value: number
}
export const statsData = ({
  webRevenue,
  storeRevenue,
  saleCount,
  soldProductCount,
}: SaleStatsData): StatFields[] => [
  {
    label: 'Revenue (store)',
    id: 'revenue',
    currency: true,
    Icon: AttachMoneyOutlinedIcon,
    value: storeRevenue,
  },
  {
    label: 'Revenue (web)',
    id: 'profit',
    currency: true,
    Icon: AttachMoneyOutlinedIcon,
    value: webRevenue,
  },
  {
    label: 'Products Sold',
    id: 'itemsSold',
    currency: false,
    Icon: ShoppingCartOutlinedIcon,
    value: soldProductCount,
  },
  {
    label: 'Sale Count',
    id: 'saleCount',
    currency: false,
    Icon: TrendingUpOutlinedIcon,
    value: saleCount,
  },
]
