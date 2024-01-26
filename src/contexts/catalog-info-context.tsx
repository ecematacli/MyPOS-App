import React, { createContext, useEffect, useState } from 'react'
import { Outlet } from '../api/outlets/types'
import { fetchOutlets } from '../api/outlets/outlets'

interface CatalogInfoContextProps {
  outlets: Outlet[]
  // categories: any[]
  // brands: any[]
}

export const CatalogInfoContext = createContext<CatalogInfoContextProps>({
  outlets: [],
  // categories: [],
  // brands: [],
})

export const CatalogInfoProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [outlets, setOutlets] = useState<Outlet[]>([])

  useEffect(() => {
    const fetchOutletsOnLoad = async () => {
      const outlets = await fetchOutlets()
      setOutlets(outlets)
    }

    fetchOutletsOnLoad()
  }, [])

  return (
    <CatalogInfoContext.Provider value={{ outlets }}>
      {children}
    </CatalogInfoContext.Provider>
  )
}

export const useCatalogInfo = () => {
  const { outlets } = React.useContext(CatalogInfoContext)

  return { outlets }
}
