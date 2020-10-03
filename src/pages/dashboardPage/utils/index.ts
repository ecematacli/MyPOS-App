import differenceInDays from 'date-fns/differenceInDays'
import sub from 'date-fns/sub'

import { RevenueData, LastActivitiesData } from '../types'
import { formatDate } from '../../../common/utils'

export const getUnstatedDisplayOption = (startDate: Date, endDate: Date) => {
  const diff = differenceInDays(endDate, startDate)

  if (diff > 0 && diff <= 31) {
    return 'daily'
  }

  if (diff > 31 && diff <= 60) {
    return 'weekly'
  }

  if (diff > 60 && diff <= 200) {
    return 'monthly'
  }

  return 'monthly'
}

export const getDisabledOptions = (startDate: Date, endDate: Date) => {
  if (!startDate && endDate) {
    return { monthly: true, weekly: false, daily: false }
  }

  if (startDate && !endDate) {
    endDate = new Date()
  }

  const diff = differenceInDays(endDate, startDate)

  if (diff < 7) {
    return { monthly: true, weekly: true, daily: false }
  }

  if (diff > 7 && diff <= 31) {
    return { monthly: true, weekly: false, daily: false }
  }
  if (diff > 31 && diff <= 60) {
    return { monthly: false, weekly: false, daily: false }
  }

  if (diff > 60 && diff <= 200) {
    return { monthly: false, weekly: false, daily: true }
  }

  if (diff > 200) {
    return { monthly: false, weekly: true, daily: true }
  }
}

export const getInitialLastThirtyDays = () => {
  const endDate = new Date()
  const startDate = sub(endDate, { days: 30 })

  return { initialStart: startDate, initialEnd: endDate }
}

//Date formatter helpers
export const formatActivitiesData = (lastActivities: LastActivitiesData) =>
  lastActivities && lastActivities.length
    ? lastActivities.map(action => ({
        ...action,
        created: formatDate(action.created, 'd MMMM y - p'),
      }))
    : []

export const formatChartDate = (revenue: RevenueData, option: string) => {
  if (option === 'daily') {
    return revenue
    // return revenue.map(data => ({
    //   ...data,
    //   x: formatDate(data.x, 'd/M/y')
    // }));
  } else {
    return revenue
  }
}
