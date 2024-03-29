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
import { Paper, IconButton, Typography, Divider, ListItem } from '@material-ui/core'
import MoreVertIcon from '@material-ui/icons/MoreVert'

import styles from './styles'
import { RevenueData, AppliedFilters } from '../../types'
import { capitalize } from '../../../../common/utils'
import { currencyFormatter } from '../../../../common/utils'
import { getDisabledOptions } from '../../utils'
import useChartState from './useChartState'
import CustomPopover from '../../../../common/components/customPopover'

interface ChartProps {
  revenueData: RevenueData
  fetchRevenueData: (displayOption: string, start: Date, end: Date) => Promise<void>
  appliedFilters: AppliedFilters
}

const Chart: React.FC<ChartProps> = ({ revenueData, fetchRevenueData, appliedFilters }) => {
  const classes = styles()

  const disabledOptions = getDisabledOptions(appliedFilters.startDate, appliedFilters.endDate)

  const {
    handleClick,
    handleClose,
    open,
    anchorEl,
    displayOption,
    onDisplayOptionClick,
  } = useChartState(fetchRevenueData, disabledOptions, appliedFilters)

  const labelStyle = {
    color: '#696969',
    textAlign: 'center',
  }

  const renderDateOptions = () => {
    return (
      <div className={classes.iconContainer}>
        <IconButton onClick={handleClick} className={classes.iconButton}>
          <MoreVertIcon />
        </IconButton>
        <CustomPopover
          open={open}
          classes={{ paper: classes.popoverPaper }}
          anchorEl={anchorEl}
          onClose={handleClose}>
          <Paper className={classes.popoverPaper}>
            <Typography className={classes.displayOptionsTitle}>
              Choose a display type for date
            </Typography>
            <Divider />
            <div>
              {['daily', 'weekly', 'monthly'].map(option => (
                <ListItem
                  className={classes.displayOptionsItem}
                  disabled={disabledOptions[option]}
                  selected={displayOption === option}
                  onClick={() => onDisplayOptionClick(option)}
                  key={option}>
                  <div className={classes.option}>{capitalize(option)}</div>
                </ListItem>
              ))}
            </div>
          </Paper>
        </CustomPopover>
      </div>
    )
  }

  const renderAreaChart = () => (
    <ResponsiveContainer width='100%' height='90%'>
      <AreaChart data={revenueData} margin={{ top: 30, right: 30, left: 0, bottom: 25 }}>
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
          name='Store Revenue'
          type='monotone'
          dataKey='store'
          stroke='#82ca9d'
          fillOpacity={1}
          fill='url(#colorPv)'
        />
      </AreaChart>
    </ResponsiveContainer>
  )

  return (
    <Paper className={classes.chartPaper}>
      {renderDateOptions()}
      {renderAreaChart()}
    </Paper>
  )
}

export default Chart
