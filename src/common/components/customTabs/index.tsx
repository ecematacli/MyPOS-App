import React from 'react'
import { Tabs, Tab } from '@mui/material'

interface Props {
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    newValue: string
  ) => void
  tabs: { tab: string; value: string }[]
  tabsValue: string
  centered?: boolean
  stylesWithClasses: any
  styles: any
  textColor?: 'inherit' | 'primary' | 'secondary'
}

const CustomTabs: React.FC<Props> = ({
  tabsValue,
  handleChange,
  tabs,
  centered = false,
  stylesWithClasses,
  textColor,
  styles,
}) => (
  <Tabs
    sx={styles}
    value={tabsValue}
    onChange={handleChange}
    textColor={textColor}
    indicatorColor='primary'
    centered={centered}>
    {tabs.map(({ tab, value }) => (
      <Tab value={value} sx={stylesWithClasses} key={tab} label={tab} />
    ))}
  </Tabs>
)

export default CustomTabs
