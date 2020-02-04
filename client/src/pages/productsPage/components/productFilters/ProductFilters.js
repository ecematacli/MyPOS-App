import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import clsx from 'clsx';
import { Popover, Button, Chip } from '@material-ui/core';
import FilterListIcon from '@material-ui/icons/FilterList';

import styles from './styles';
import { fetchProducts } from '../../../../redux/products/productsActions';
import useProductFilters from './useProductFilters';
import CustomInput from '../../../../common/components/customInput/CustomInput';

const ProductFilters = ({ rowsPerPage, page, brands, categories }) => {
  const classes = styles();
  const {
    anchorEl,
    handleClick,
    handleClose,
    open,
    handleInputChange,
    filterInputFields,
    chipInputs,
    handleDelete,
    handleApplyFilterClick
  } = useProductFilters(brands, categories);

  const renderChipInputs = () => {
    return chipInputs.map(({ id, label }, i) => (
      <Chip
        key={id}
        color="secondary"
        size="medium"
        className={clsx(classes[i === 0 && 'firstChip'], classes.chipInput)}
        label={label}
        onDelete={() => handleDelete(id)}
      />
    ));
  };

  const renderFilterContent = () => {
    return (
      <Fragment>
        <div className={classes.filterCaption}>
          {chipInputs.length ? renderChipInputs() : 'Add Filters...'}
        </div>
        <div className={classes.filterInputContainer}>
          {filterInputFields.map(
            ({
              label,
              fieldId,
              dropdown,
              placeholder,
              value,
              dropdownItems
            }) => (
              <div key={label} className={classes.filterInputs}>
                <div className={classes.filterLabel}>{label}</div>
                <CustomInput
                  dropdown={dropdown}
                  name={fieldId}
                  placeholder={placeholder}
                  dropdownItems={dropdownItems}
                  value={value}
                  onChange={handleInputChange}
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
            )
          )}
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
            <Button
              onClick={() => handleApplyFilterClick(page, rowsPerPage)}
              className={classes.filterBtn}
              color="primary"
            >
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

const mapStateToProps = ({ brands, categories }) => ({ brands, categories });

export default connect(mapStateToProps, { fetchProducts })(ProductFilters);
