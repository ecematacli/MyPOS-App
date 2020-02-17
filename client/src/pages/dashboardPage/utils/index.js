import differenceInDays from 'date-fns/differenceInDays';
import sub from 'date-fns/sub';

import { formatDate } from '../../../common/utils';

export const getDisabledOptions = (startDate, endDate) => {
  if (!startDate && endDate) {
    return { monthly: true, weekly: false, daily: false };
  }

  if (startDate && !endDate) {
    endDate = new Date();
  }

  const diff = differenceInDays(endDate, startDate);

  if (diff < 7) {
    return { monthly: true, weekly: true, daily: false };
  }

  if (diff > 7 && diff <= 31) {
    return { monthly: true, weekly: false, daily: false };
  }

  if (diff > 31 && diff <= 60) {
    return { monthly: false, weekly: false, daily: false };
  }

  if (diff > 60 && diff <= 200) {
    return { monthly: false, weekly: false, daily: true };
  }

  if (diff > 200) {
    return { monthly: false, weekly: true, daily: true };
  }
};

export const getInitialLastThirtyDays = () => {
  const endDate = new Date();
  const startDate = sub(endDate, { days: 30 });

  return { start: startDate, end: endDate };
};

//Date formatter helpers
export const formatActivitiesData = lastActivities =>
  lastActivities.map(action => ({
    ...action,
    created: formatDate(action.created, 'd MMMM y - p')
  }));

export const formatChartDate = (revenue, option) => {
  if (option === 'daily') {
    return revenue.map(data => ({
      ...data,
      x: formatDate(data.x, 'd/M/y')
    }));
  } else {
    return revenue;
  }
};
