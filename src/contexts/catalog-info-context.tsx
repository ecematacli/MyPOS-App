import React, { createContext, useEffect, useState } from 'react'
import { Outlet } from '../api/outlets/types'
import { fetchOutlets } from '../api/outlets/outlets'
import { useAuthContext } from './auth-context'
import { useOutletsQuery } from 'api/outlets/use-outlets-query'
import { Loading } from 'common/components/loading/loading'

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
  const { isAuthenticated } = useAuthContext()

  const { data: outlets, isLoading } = useOutletsQuery(isAuthenticated)

  if (isLoading) {
    return <Loading />
  }

  return (
    <CatalogInfoContext.Provider value={{ outlets: outlets! }}>
      {children}
    </CatalogInfoContext.Provider>
  )
}

export const useCatalogInfo = () => {
  const { outlets } = React.useContext(CatalogInfoContext)

  return { outlets }
}
