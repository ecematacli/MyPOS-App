import React, { Fragment } from 'react';
import clsx from 'clsx';
import { DatePicker } from '@material-ui/pickers';
import {
  InputAdornment,
  TextField,
  OutlinedInput,
  TextFieldProps,
  InputLabel,
  FormControl,
  Select,
  MenuItem,
  Grid,
  Divider
} from '@material-ui/core';
import InsertInvitationIcon from '@material-ui/icons/InsertInvitation';

import styles from './styles';
import { Category } from '../../../../redux/categories/types';
import { Brand } from '../../../../redux/brands/types';
import useInventoryFilters from './useInventoryFilters';

interface Props {
  brands: Brand[];
  categories: Category[];
}
const InventoryCountFilters: React.FC<Props> = ({ brands, categories }) => {
  const classes = styles();
  const {
    startDate,
    handleStartDateChange,
    handleDropdownInputChange,
    countName,
    handleCountNameChange,
    DROPDOWN_INPUT_FIELDS
  } = useInventoryFilters(brands, categories);

  const renderTextField = (props: TextFieldProps) => (
    <TextField
      {...props}
      InputProps={{
        classes: { root: classes.datePickerInput },
        endAdornment: (
          <React.Fragment>
            <InputAdornment position="start">
              <InsertInvitationIcon className={classes.calendarIcon} />
            </InputAdornment>
          </React.Fragment>
        )
      }}
      variant="outlined"
    />
  );

  const renderInputs = () => (
    <div className={classes.inputContainer}>
      <div>
        <InputLabel classes={{ root: classes.inputLabel }}>
          Start Date
        </InputLabel>
        <DatePicker
          color="secondary"
          variant="inline"
          TextFieldComponent={renderTextField}
          autoOk
          value={startDate}
          onChange={handleStartDateChange}
        />
      </div>
      <div>
        <InputLabel
          classes={{ root: classes.inputLabel }}
          className={classes.inputSpace}
          color="secondary"
        >
          Count Name
        </InputLabel>
        <OutlinedInput
          className={classes.inputSpace}
          classes={{ root: classes.inputRoot, input: classes.input }}
          value={countName}
          onChange={handleCountNameChange}
          color="secondary"
        />
      </div>
    </div>
  );

  const renderDropdownInputs = () => (
    <div className={classes.dropdownInputContainer}>
      {DROPDOWN_INPUT_FIELDS.map(
        ({ label, value, fieldId, dropdownItems }, i) => (
          <div
            className={clsx(
              classes.dropdownItemDiv,
              classes[i === 1 ? 'inputSpace' : '']
            )}
            key={label}
          >
            <InputLabel classes={{ root: classes.inputLabel }}>
              {label}
            </InputLabel>
            <FormControl
              classes={{ root: classes.dropdownInput }}
              variant="outlined"
            >
              <Select
                classes={{ root: classes.selectRoot }}
                name={fieldId}
                color="secondary"
                value={value}
                onChange={handleDropdownInputChange}
                labelId={label}
                input={
                  <OutlinedInput
                    classes={{
                      root: classes.innerInput,
                      input: classes.input
                    }}
                  />
                }
              >
                {dropdownItems.map(({ id, name }) => (
                  <MenuItem key={id} value={name}>
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        )
      )}
    </div>
  );

  return (
    <Fragment>
      <div className={classes.filtersContainer}>
        <Grid item xl={6} lg={6} md={6} sm={12}>
          {renderInputs()}
        </Grid>
        <Grid item xl={6} lg={6} md={6} sm={12}>
          {renderDropdownInputs()}
        </Grid>
      </div>
      <Divider className={classes.divider} />
    </Fragment>
  );
};

export default InventoryCountFilters;
