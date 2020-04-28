import React from 'react';
import { Tabs, Tab } from '@material-ui/core';

interface Props {
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    newValue: number
  ) => void;
  tabs: string[];
  tabsValue: number;
  centered?: boolean;
  className: string;
  classes: any;
  textColor?: string;
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
    indicatorColor="primary"
    centered={centered}>
    {tabs.map((label: string) => (
      <Tab classes={classes} key={label} label={label} />
    ))}
  </Tabs>
);

export default CustomTabs;
