import { useState, useContext, useEffect } from 'react'
import { IFetchSalesArgs } from '../sales-history'
import { AuthContext } from '../../../contexts/AuthContext'
import { useCatalogInfo } from '../../../contexts/CatalogInfoContext'
import { Outlet } from '../../../api/outlets/types'

export interface Args {
  rowsPerPage: number
  setPage: React.Dispatch<React.SetStateAction<number>>
  fetchSales: (args: IFetchSalesArgs) => void
}

export const useSalesFilterState = ({
  rowsPerPage,
  setPage,
  fetchSales,
}: Args) => {
  const [startDate, handleStartDateChange] = useState<Date | null>(null)
  const [endDate, handleEndDateChange] = useState<Date | null>(null)
  const [selectedOutlet, setSelectedOutlet] = useState<Outlet | null>(null)
  const { outlets } = useCatalogInfo()

  const {
    user: {
      role: { outletId },
    },
    isAdmin,
  } = useContext(AuthContext)

  const applyFilters = () => {
    setPage(1)
    fetchSales({
      rowsPerPage,
      afterCursor: null,
      beforeCursor: null,
      startDate,
      endDate,
      outletId: selectedOutlet?.id,
    })
  }

  const onDateFilterClearing = () => {
    setPage(1)
    handleStartDateChange(null)
    handleEndDateChange(null)
    fetchSales({ rowsPerPage, outletId: selectedOutlet?.id })
  }

  const handleOutletChange = (outletName: string) => {
    const outlet = outlets.find(o => o.name === outletName)
    setSelectedOutlet(outlet)
  }

  useEffect(() => {
    if (isAdmin) {
      setSelectedOutlet(null)
    } else {
      setSelectedOutlet(outlets.find(o => o.id === outletId))
    }
  }, [])

  return {
    startDate,
    handleStartDateChange,
    endDate,
    handleEndDateChange,
    onDateSelection: applyFilters,
    onDateFilterClearing,
    selectedOutlet,
    handleOutletChange,
  }
}
