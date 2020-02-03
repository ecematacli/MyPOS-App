import React, { Fragment } from 'react';
import { DatePicker } from '@material-ui/pickers';
import { InputAdornment, Popover, Button } from '@material-ui/core';
import InsertInvitationIcon from '@material-ui/icons/InsertInvitation';
import FilterListIcon from '@material-ui/icons/FilterList';

import styles from './styles';
import useSalesFiltersState from './useSalesFiltersState';

const SalesFilters = ({ page, rowsPerPage }) => {
  const classes = styles();
  const {
    startDate,
    handleStartDateChange,
    endDate,
    handleEndDateChange,
    open,
    anchorEl,
    handleClick,
    handleClose,
    onDateSelect
  } = useSalesFiltersState(page, rowsPerPage);

  const onApplyFilterClick = () => {
    onDateSelect();
    handleClose();
  };

  const renderFilterContent = () => {
    return (
      <Fragment>
        <div className={classes.filterCaption}>
          Add Start and End Date Filters...
        </div>
        <div className={classes.filterPaper}>
          <span className={classes.datePickerInput}>
            <DatePicker
              variant="inline"
              color="secondary"
              label="Start Date"
              autoOk
              value={startDate}
              onChange={date => handleStartDateChange(date)}
              InputProps={{
                endAdornment: (
                  <React.Fragment>
                    <InputAdornment position="start">
                      <InsertInvitationIcon className={classes.calendarIcon} />
                    </InputAdornment>
                  </React.Fragment>
                )
              }}
            />
          </span>
          <span style={{ marginLeft: 32 }} className={classes.datePickerInput}>
            <DatePicker
              variant="inline"
              color="secondary"
              label="End Date"
              autoOk
              value={endDate}
              onChange={date => handleEndDateChange(date)}
              InputProps={{
                endAdornment: (
                  <React.Fragment>
                    <InputAdornment position="start">
                      <InsertInvitationIcon className={classes.calendarIcon} />
                    </InputAdornment>
                  </React.Fragment>
                )
              }}
            />
          </span>
          <div className={classes.filterBtnDiv}>
            <div>
              <Button
                style={{ marginRight: 8 }}
                className={classes.filterBtn}
                color="secondary"
                onClick={handleClose}
              >
                Cancel
              </Button>
            </div>
            <div>
              <Button
                onClick={onApplyFilterClick}
                className={classes.filterBtn}
                color="primary"
              >
                Apply filter
              </Button>
            </div>
          </div>
        </div>
      </Fragment>
    );
  };

  return (
    <Fragment>
      <div className={classes.filterIconContainer}>
        <div className={classes.filterIconDiv} onClick={handleClick}>
          <FilterListIcon className={classes.filterIcon} />
        </div>
      </div>
      <Popover
        open={open}
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
        {renderFilterContent()}
      </Popover>
    </Fragment>
  );
};

export default SalesFilters;
