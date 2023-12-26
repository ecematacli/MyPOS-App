import React from 'react'
import { Tabs, Tab } from '@material-ui/core'

interface Props {
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    newValue: string
  ) => void
  tabs: { tab: string; value: string }[]
  tabsValue: string
  centered?: boolean
  className: string
  classes: any
  textColor?: 'inherit' | 'primary' | 'secondary'
}

const CustomTabs: React.FC<Props> = ({
  tabsValue,
  handleChange,
  tabs,
  centered = false,
  className,
  classes,
  textColor,
}) => (
  <Tabs
    className={className}
    value={tabsValue}
    onChange={handleChange}
    textColor={textColor}
    indicatorColor='primary'
    centered={centered}>
    {tabs.map(({ tab, value }) => (
      <Tab value={value} classes={classes} key={tab} label={tab} />
    ))}
  </Tabs>
)

export default CustomTabs
