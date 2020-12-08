import { useState } from 'react'

export interface Args {
  rowsPerPage: number
  setPage: React.Dispatch<React.SetStateAction<number>>
  fetchSales: (
    rowsPerPage: number,
    afterCursor?: string,
    beforeCursor?: string,
    startDate?: Date,
    endDate?: Date
  ) => void
}

export default ({ rowsPerPage, setPage, fetchSales }: Args) => {
  const [startDate, handleStartDateChange] = useState<Date | null>(null)
  const [endDate, handleEndDateChange] = useState<Date | null>(null)

  const onDateSelection = () => {
    setPage(1)
    fetchSales(rowsPerPage, null, null, startDate, endDate)
  }

  const onDateFilterClearing = () => {
    setPage(1)
    handleStartDateChange(null)
    handleEndDateChange(null)
    fetchSales(rowsPerPage)
  }

  return {
    startDate,
    handleStartDateChange,
    endDate,
    handleEndDateChange,
    onDateSelection,
    onDateFilterClearing,
  }
}
