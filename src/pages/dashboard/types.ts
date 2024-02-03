export interface InitialDates {
  initialStart: Date;
  initialEnd: Date;
}

export interface Loading {
  [key: string]: boolean;
}

export interface AppliedFilters {
  startDate: Date;
  endDate: Date;
}
interface TopSellingProduct {
  sku: string;
  name: string;
  variation: string | null;
  soldQty: number;
}

export interface TopSellingData {
  count: number;
  products: TopSellingProduct[];
}

export interface Activity {
  id: number;
  event: string;
  message: string;
  saleId: number;
  userId: string;
  created: string;
}

export type LastActivitiesData = Activity[];

interface Revenue {
  x: string;
  web: number;
  store: number;
}

export type RevenueData = Revenue[];

export interface SaleStatsData {
  webRevenue: number;
  enkaRevenue: number;
  kozaRevenue: number;
  saleCount: number;
  soldProductCount: number;
}
