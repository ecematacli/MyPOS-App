import React from 'react'
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts'
import { Paper, IconButton, Divider, Box } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import MoreVertIcon from '@mui/icons-material/MoreVert'

import {
  ChartPaper,
  DisplayOptionsItem,
  DisplayOptionsTitle,
  IconContainer,
} from './chart-styles'
import { RevenueData, AppliedFilters } from '../../types'
import { capitalize } from '../../../../common/utils'
import { currencyFormatter } from '../../../../common/utils'
import { getDisabledOptions } from '../../utils'
import { useChartState } from './use-chart-state'
import { CustomPopover } from '../../../../common/components/custom-popover/custom-popover'

interface ChartProps {
  revenueData: RevenueData
  fetchRevenueData: (
    displayOption: string,
    start: Date,
    end: Date
  ) => Promise<void>
  appliedFilters: AppliedFilters
}

export const Chart: React.FC<ChartProps> = ({
  revenueData,
  fetchRevenueData,
  appliedFilters,
}) => {
  const theme = useTheme()

  const commonPopoverStyles = {
    minWidth: 250,
    minHeight: 200,
    color: theme.palette.secondary.main,
  }

  const disabledOptions = getDisabledOptions(
    appliedFilters.startDate,
    appliedFilters.endDate
  )

  const {
    handleClick,
    handleClose,
    open,
    anchorEl,
    displayOption,
    onDisplayOptionClick,
  } = useChartState(fetchRevenueData, disabledOptions, appliedFilters)

  const renderDateOptions = () => {
    return (
      <IconContainer>
        <IconButton
          onClick={handleClick}
          sx={{ position: 'absolute', right: 0 }}>
          <MoreVertIcon />
        </IconButton>
        <CustomPopover
          open={open}
          sx={{
            '& .MuiPopover-paper': commonPopoverStyles,
          }}
          anchorEl={anchorEl}
          onClose={handleClose}>
          <Paper sx={commonPopoverStyles}>
            <DisplayOptionsTitle>
              Choose a display type for date
            </DisplayOptionsTitle>
            <Divider />
            <Box>
              {(['daily', 'weekly', 'monthly'] as const).map(option => (
                <DisplayOptionsItem
                  disabled={disabledOptions[option]}
                  selected={displayOption === option}
                  onClick={() => onDisplayOptionClick(option)}
                  key={option}>
                  <Box sx={{ paddingLeft: theme.spacing(1) }}>
                    {capitalize(option)}
                  </Box>
                </DisplayOptionsItem>
              ))}
            </Box>
          </Paper>
        </CustomPopover>
      </IconContainer>
    )
  }

  const renderAreaChart = () => (
    <ResponsiveContainer width='100%' height='90%'>
      <AreaChart
        data={revenueData}
        margin={{ top: 30, right: 30, left: 0, bottom: 25 }}>
        <defs>
          <linearGradient id='colorUv' x1='0' y1='0' x2='0' y2='1'>
            <stop offset='10%' stopColor='#00acc1' stopOpacity={0.3} />
            <stop offset='90%' stopColor='#00acc1' stopOpacity={0.1} />
          </linearGradient>
          <linearGradient id='colorPv' x1='0' y1='0' x2='0' y2='1'>
            <stop offset='5%' stopColor='#82ca9d' stopOpacity={0.3} />
            <stop offset='95%' stopColor='#82ca9d' stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis dataKey='x' />
        <YAxis />
        <CartesianGrid stroke='#e2e2e2' strokeDasharray='3 3' />
        <Tooltip
          // labelStyle={labelStyle}
          formatter={value => currencyFormatter(value as number)}
        />
        <Area
          isAnimationActive={false}
          connectNulls
          name='Web Revenue'
          type='monotone'
          dataKey='web'
          stroke='#00acc1'
          fillOpacity={1}
          fill='url(#colorUv)'
        />
        <Area
          isAnimationActive={false}
          connectNulls
          name='Enka Revenue'
          type='monotone'
          dataKey='enka'
          stroke='#82ca9d'
          fillOpacity={1}
          fill='url(#colorPv)'
        />
        <Area
          isAnimationActive={false}
          connectNulls
          name='Koza Revenue'
          type='monotone'
          dataKey='koza'
          stroke='#1b4a9d'
          fillOpacity={1}
          fill='url(#colorPv)'
        />
      </AreaChart>
    </ResponsiveContainer>
  )

  return (
    <ChartPaper>
      {renderDateOptions()}
      {renderAreaChart()}
    </ChartPaper>
  )
}
