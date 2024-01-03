import React, { useEffect } from 'react'
import { Box, Grid } from '@mui/material'

import { getInitialLastThirtyDays } from './utils'
import { DashboardDateFilter } from './components/dashboard-date-filter/dashboard-date-filter'
import { useDashboardState } from './hooks/use-dashboard-state'
import { DashboardStats } from './components/dashboard-stats/dashboard-stats'
import { Chart } from './components/chart/chart'
import { LastActivities } from './components/last-activities/last-activities'
import { TopSellingItems } from './components/top-selling-items/top-selling-items'

export const DashboardPage = () => {
  const { initialStart, initialEnd } = getInitialLastThirtyDays()
  const {
    loading: { topSellings, activities },
    startDate,
    handleStartDateChange,
    endDate,
    onDateSelection,
    onDateFilterClearing,
    handleEndDateChange,
    appliedFilters,
    fetchTopSellingProducts,
    topSellingProducts,
    lastActivities,
    fetchLastActivities,
    fetchRevenueData,
    saleStats,
    fetchSaleStats,
    revenue,
  } = useDashboardState()

  useEffect(() => {
    fetchRevenueData('daily', initialStart, initialEnd)
    fetchSaleStats(initialStart, initialEnd)
    fetchTopSellingProducts(1, initialStart, initialEnd)
    fetchLastActivities()
  }, [])

  return (
    <Box
      sx={{
        padding: theme => theme.spacing(3),
      }}>
      <Grid
        container
        justifyContent='flex-end'
        spacing={3}
        sx={{
          marginTop: theme => theme.spacing(1),
        }}>
        <DashboardDateFilter
          startDate={startDate}
          endDate={endDate}
          handleStartDateChange={handleStartDateChange}
          handleEndDateChange={handleEndDateChange}
          onDateSelection={onDateSelection}
          onDateFilterClearing={onDateFilterClearing}
          appliedFilters={appliedFilters}
        />
      </Grid>
      <Grid
        container
        sx={{
          marginTop: theme => theme.spacing(7),
        }}
        justifyContent='center'
        spacing={3}>
        <DashboardStats saleStats={saleStats} />
      </Grid>
      <Grid
        sx={{
          marginTop: theme => theme.spacing(7),
        }}>
        <Grid item xs={12} sm={12} md={12}>
          <Chart
            revenueData={revenue}
            fetchRevenueData={fetchRevenueData}
            appliedFilters={appliedFilters}
          />
        </Grid>
      </Grid>
      <Grid
        container
        spacing={3}
        sx={{
          marginTop: theme => theme.spacing(7),
        }}>
        <Grid item xs={12} sm={12} md={7}>
          <TopSellingItems
            loading={topSellings && topSellings}
            topSellingProducts={topSellingProducts}
            fetchTopSellingProducts={fetchTopSellingProducts}
            startDate={startDate}
            endDate={endDate}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={5}>
          <LastActivities
            lastActivities={lastActivities}
            loading={activities && activities}
          />
        </Grid>
      </Grid>
    </Box>
  )
}
