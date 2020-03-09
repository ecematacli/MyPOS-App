import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Button, Chip } from '@material-ui/core';
import FilterListIcon from '@material-ui/icons/FilterList';

import styles from './styles';
import { capitalize } from '../../../../common/utils';
import { StoreState } from '../../../../redux/types';
import { Brand } from '../../../../redux/brands/types';
import { Category } from '../../../../redux/categories/types';
import useProductFilters from './useProductFilters';
import CustomInput from '../../../../common/components/customInput/CustomInput';
import CustomPopover from '../../../../common/components/customPopover/CustomPopover';

interface FiltersProps {
  rowsPerPage: number;
  page: number;
  brands: Brand[];
  categories: Category[];
  setPage: (page: number) => void;
}

const ProductFilters: React.FC<FiltersProps> = ({
  rowsPerPage,
  page,
  brands,
  categories,
  setPage
}) => {
  const classes = styles();
  const {
    anchorEl,
    handleClick,
    handleClose,
    open,
    cancelClick,
    appliedFilters,
    filterInputs,
    clearAllFilters,
    handleInputChange,
    filterInputFields,
    handleApplyFilterClick,
    handleDelete
  } = useProductFilters(brands, categories, setPage);

  const renderChipInputs = () =>
    Object.keys(appliedFilters).map(key => {
      if (!appliedFilters[key]) return;
      return (
        <Chip
          key={key}
          color="secondary"
          size="medium"
          className={classes.chipInput}
          label={`${capitalize(key)}: ${appliedFilters[key]}`}
          onDelete={() => handleDelete(key)}
        />
      );
    });

  const renderFilterContent = () => (
    <div className={classes.popoverPaper}>
      <div className={classes.filterCaption}>
        {Object.values(appliedFilters).some(f => !!f)
          ? renderChipInputs()
          : 'Add Filters...'}
      </div>
      <div className={classes.filterInputContainer}>
        {filterInputFields.map(
          ({ label, fieldId, dropdown, placeholder, value, dropdownItems }) => (
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
                        root: classes.inputRoot,
                        input: classes.input
                      }
                    : {
                        dropdownInput: { root: classes.dropdownInput },
                        innerInput: {
                          root: classes.innerInput,
                          input: classes.input
                        }
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
            className={classes.filterBtn}
            color="secondary"
            onClick={cancelClick}
          >
            Cancel
          </Button>
        </div>
        <div className={classes.filterBtnDiv}>
          <Button
            className={classes.filterBtn}
            color="secondary"
            disabled={Object.values(filterInputs).every(f => f === '')}
            onClick={() => clearAllFilters(page, rowsPerPage)}
          >
            Clear Filters
          </Button>
        </div>
        <div>
          <Button
            onClick={() => handleApplyFilterClick(page, rowsPerPage)}
            className={classes.filterBtn}
            disabled={Object.values(filterInputs).every(f => f === '')}
            style={{ marginRight: 16 }}
            color="primary"
          >
            Apply filters
          </Button>
        </div>
      </div>
    </div>
  );

  return (
    <Fragment>
      <div className={classes.filterIconContainer}>
        <div className={classes.filterIconDiv} onClick={handleClick}>
          <FilterListIcon className={classes.filterIcon} />
        </div>
      </div>
      <CustomPopover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        classes={{ paper: classes.popoverPaper }}
      >
        {renderFilterContent()}
      </CustomPopover>
    </Fragment>
  );
};

const mapStateToProps = (state: StoreState) => ({
  brands: state.brands,
  categories: state.categories
});

export default connect(mapStateToProps)(ProductFilters);
