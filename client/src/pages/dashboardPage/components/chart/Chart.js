import React, { useState } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import {
  Paper,
  IconButton,
  Popover,
  Typography,
  Divider,
  MenuItem
} from '@material-ui/core';

import styles from './styles';
import useChartState from './useChartState';

const Chart = () => {
  const classes = styles();
  const [selectedOptions, setSelectedOptions] = useState({});
  const { data, handleClick, handleClose, open, anchorEl } = useChartState();

  const handleSelectedOptions = label => {
    setSelectedOptions({
      ...selectedOptions,
      label: !selectedOptions[label]
    });
  };

  const renderDateOptions = () => {
    return (
      <div className={classes.iconContainer}>
        <IconButton onClick={handleClick} className={classes.iconButton}>
          <MoreVertIcon />
        </IconButton>
        <Popover
          open={open}
          classes={{ paper: classes.popoverPaper }}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center'
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right'
          }}
        >
          <Paper className={classes.popoverPaper}>
            <Typography className={classes.displayOptionsTitle}>
              Choose a display type for date
            </Typography>
            <Divider />
            {['Daily', 'Weekly', 'Monthly'].map(option => {
              return (
                <MenuItem key={option} className={classes.displayOptions}>
                  {option}
                </MenuItem>
              );
            })}
          </Paper>
        </Popover>
      </div>
    );
  };

  return (
    <Paper className={classes.chartPaper}>
      {renderDateOptions()}
      <ResponsiveContainer width="100%" height="90%">
        <AreaChart
          data={data}
          margin={{ top: 30, right: 30, left: 0, bottom: 10 }}
        >
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="10%" stopColor="#00acc1" stopOpacity={0.3} />
              <stop offset="90%" stopColor="#00acc1" stopOpacity={0.1} />
            </linearGradient>
            <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="name" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="uv"
            stroke="#00acc1"
            fillOpacity={1}
            fill="url(#colorUv)"
          />
          <Area
            type="monotone"
            dataKey="pv"
            stroke="#82ca9d"
            fillOpacity={1}
            fill="url(#colorPv)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </Paper>
  );
};

export default Chart;
