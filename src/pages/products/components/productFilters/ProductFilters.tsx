import React, { Fragment, useState } from 'react';
import { Button, Chip } from '@material-ui/core';
import FilterListIcon from '@material-ui/icons/FilterList';

import styles from './styles';
import { capitalize } from '../../../../common/utils';
import CustomInput from '../../../../common/components/customInput';
import CustomPopover from '../../../../common/components/customPopover';
import { Filters, AppliedFilters, FilterInput } from '../../types';

interface FiltersProps {
  filterInputs: Filters;
  appliedFilters: AppliedFilters;
  cancelClick: () => void;
  clearAllFilters: () => void;
  handleInputChange: ({
    target: { value, name },
  }: React.ChangeEvent<HTMLInputElement>) => void;
  filterInputFields: FilterInput[];
  handleApplyFilterClick: () => void;
  handleDelete: (key: string) => void;
}

const ProductFilters: React.FC<FiltersProps> = ({
  filterInputs,
  appliedFilters,
  cancelClick,
  clearAllFilters,
  handleInputChange,
  filterInputFields,
  handleApplyFilterClick,
  handleDelete,
}) => {
  const classes = styles();

  const [anchorEl, setAnchorEl] = useState<
    null | Element | ((element: Element) => Element)
  >(null);

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const onCancelClick = () => {
    handleClose();
    cancelClick();
  };

  const onApplyFilterClick = () => {
    handleApplyFilterClick();
    handleClose();
  };

  const renderChipInputs = () =>
    Object.keys(appliedFilters).map((key) => {
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

  const renderFilterInputs = () => (
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
                      input: classes.input,
                    }
                  : {
                      dropdownInput: { root: classes.dropdownInput },
                      innerInput: {
                        root: classes.innerInput,
                        input: classes.input,
                      },
                    }
              }
            />
          </div>
        )
      )}
    </div>
  );

  const renderFilterButtons = () => (
    <div className={classes.filterBtnDiv}>
      <div>
        <Button
          className={classes.filterBtn}
          color="secondary"
          onClick={onCancelClick}>
          Cancel
        </Button>
      </div>
      <div className={classes.filterBtnDiv}>
        <Button
          className={classes.filterBtn}
          color="secondary"
          disabled={Object.values(filterInputs).every((f) => f === '')}
          onClick={clearAllFilters}>
          Clear Filters
        </Button>
      </div>
      <div>
        <Button
          onClick={onApplyFilterClick}
          className={classes.filterBtn}
          disabled={Object.values(filterInputs).every((f) => f === '')}
          style={{ marginRight: 16 }}
          color="primary">
          Apply filters
        </Button>
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
        classes={{ paper: classes.popoverPaper }}>
        <div className={classes.popoverPaper}>
          <div className={classes.filterCaption}>
            {Object.values(appliedFilters).some((f) => !!f)
              ? renderChipInputs()
              : 'Add Filters...'}
          </div>
          {renderFilterInputs()}
          {renderFilterButtons()}
        </div>
      </CustomPopover>
    </Fragment>
  );
};

export default ProductFilters;
