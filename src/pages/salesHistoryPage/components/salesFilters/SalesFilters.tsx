import React, { Fragment } from 'react';
import FilterListIcon from '@material-ui/icons/FilterList';

import styles from './styles';
import useSalesFiltersPopover from './useSalesFiltersPopover';
import DatePickerFilter from '../../../../common/components/datePickerFilter';
import CustomPopover from '../../../../common/components/customPopover';

interface FiltersProps {
  startDate: Date;
  handleStartDateChange: (newDate: Date) => void;
  endDate: Date;
  handleEndDateChange: (newDate: Date) => void;
  onDateFilterClearing: () => void;
  onDateSelection: () => void;
}

const SalesFilters: React.FC<FiltersProps> = ({
  startDate,
  handleStartDateChange,
  endDate,
  handleEndDateChange,
  onDateFilterClearing,
  onDateSelection
}) => {
  const classes = styles();
  const { open, anchorEl, handleClick, handleClose } = useSalesFiltersPopover();

  const onApplyFilterClick = () => {
    onDateSelection();
    handleClose();
  };

  return (
    <Fragment>
      <div className={classes.filterIconContainer}>
        <div className={classes.filterIconDiv} onClick={handleClick}>
          <FilterListIcon className={classes.filterIcon} />
        </div>
      </div>
      <CustomPopover open={open} anchorEl={anchorEl} onClose={handleClose}>
        <DatePickerFilter
          startDate={startDate}
          handleStartDateChange={handleStartDateChange}
          endDate={endDate}
          handleEndDateChange={handleEndDateChange}
          handleClose={handleClose}
          onDateFilterClearing={onDateFilterClearing}
          onDateSelection={onApplyFilterClick}
        />
      </CustomPopover>
    </Fragment>
  );
};

export default SalesFilters;
