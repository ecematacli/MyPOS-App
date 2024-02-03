import React, { Fragment } from 'react'
import { Tooltip, Grid, Box } from '@mui/material'

import {
  StatsContainer,
  StatsContent,
  StatsCurrencyValue,
  StatsLabelTypography,
  StatsPaper,
  getCommonStyles,
  getIconContainerStyles,
} from './dashboard-stats-styles'
import { currencyFormatter } from '../../../../common/utils'
import { statsData } from './stats-data'
import { SaleStatsData } from '../../types'

export type ClassKey =
  | 'dashboardStatPaper'
  | 'dashboardStatDiv'
  | 'iconDiv'
  | 'dashboardStatContent'
  | 'statLabel'
  | 'statValue'
  | 'revenueIconContainer'
  | 'profitIconContainer'
  | 'saleCountIconContainer'
  | 'itemsSoldIconContainer'

export const DashboardStats: React.FC<{ saleStats: SaleStatsData }> = ({
  saleStats,
}) => {
  return (
    <Fragment>
      {statsData(saleStats).map(({ label, id, Icon, value, currency }) => (
        <Grid key={id} item xs={16} sm={16} md={2.3}>
          <StatsContainer>
            <StatsPaper>
              <Box
                sx={theme => ({
                  ...getCommonStyles(theme.palette),
                  ...getIconContainerStyles(theme.palette)[id],
                })}>
                <Tooltip title={label}>
                  <Icon />
                </Tooltip>
              </Box>
              <StatsContent>
                <StatsLabelTypography align='right'>
                  {label}
                </StatsLabelTypography>
                <StatsCurrencyValue align='right'>
                  {currency ? currencyFormatter(value) : value}
                </StatsCurrencyValue>
              </StatsContent>
            </StatsPaper>
          </StatsContainer>
        </Grid>
      ))}
    </Fragment>
  )
}
