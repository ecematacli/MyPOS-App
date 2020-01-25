import React, { Fragment } from 'react';
import { Popover, Button } from '@material-ui/core';
import FilterListIcon from '@material-ui/icons/FilterList';

import styles from './styles';
import useProductFilters from './hooks/useProductFilters';
import CustomInput from '../../../../common/components/customInput/CustomInput';

const ProductFilters = () => {
  const classes = styles();
  const {
    anchorEl,
    handleClick,
    handleClose,
    open,
    filterInputFields
  } = useProductFilters();

  const renderFilterContent = () => {
    return (
      <Fragment>
        <div className={classes.filterCaption}>Add Filters...</div>
        <div className={classes.filterInputContainer}>
          {filterInputFields.map(({ label, dropdown, dropdownItems }) => (
            <div key={label} className={classes.filterInputs}>
              <div className={classes.filterLabel}>{label}</div>
              <CustomInput
                dropdown={dropdown}
                dropdownItems={dropdownItems}
                classesProp={
                  !dropdown
                    ? {
                        root: classes.input
                      }
                    : {
                        dropdownInput: { root: classes.dropdownInput },
                        innerInput: { root: classes.innerInput }
                      }
                }
              />
            </div>
          ))}
        </div>
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
            <Button className={classes.filterBtn} color="primary">
              Apply filter
            </Button>
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
        {renderFilterContent()}
      </Popover>
    </Fragment>
  );
};

export default ProductFilters;
