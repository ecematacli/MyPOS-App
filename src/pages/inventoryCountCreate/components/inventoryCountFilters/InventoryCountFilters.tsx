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
  Typography,
} from '@material-ui/core';
import InsertInvitationIcon from '@material-ui/icons/InsertInvitation';

import styles from './styles';
import { Category } from '../../../../redux/categories/types';
import { Brand } from '../../../../redux/brands/types';

type InputChange = ({
  target: { value, name },
}: React.ChangeEvent<HTMLInputElement>) => void;
interface Props {
  startDate: Date;
  handleStartDateChange: React.Dispatch<React.SetStateAction<Date>>;
  countName: string;
  handleCountNameChange: InputChange;
  handleDropdownInputChange: InputChange;
  DROPDOWN_INPUT_FIELDS: {
    label: string;
    fieldId: string;
    value: string;
    dropdownItems: Category[] | Brand[];
  }[];
}
const InventoryCountFilters: React.FC<Props> = ({
  startDate,
  handleStartDateChange,
  countName,
  handleCountNameChange,
  handleDropdownInputChange,
  DROPDOWN_INPUT_FIELDS,
}) => {
  const classes = styles();

  const renderTextField = (props: TextFieldProps) => (
    <TextField
      {...props}
      InputProps={{
        classes: { root: classes.datePickerInput },
        endAdornment: (
          <Fragment>
            <InputAdornment position="start">
              <InsertInvitationIcon className={classes.calendarIcon} />
            </InputAdornment>
          </Fragment>
        ),
      }}
      variant="outlined"
    />
  );

  const renderInputs = () => (
    <div className={classes.inputContainer}>
      <div className={classes.filtersInfoDiv}>
        <Typography className={classes.infoText}>
          Please select filters to start an inventory count
        </Typography>
      </div>
      <div style={{ display: 'flex' }}>
        <div>
          <InputLabel classes={{ root: classes.inputLabel }}>
            Start Date
          </InputLabel>
          <DatePicker
            color="secondary"
            variant="inline"
            TextFieldComponent={renderTextField}
            autoOk
            format="dd MMM yyyy"
            value={startDate}
            onChange={handleStartDateChange}
          />
        </div>
        <div>
          <InputLabel
            classes={{ root: classes.inputLabel }}
            className={classes.inputSpace}
            color="secondary">
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
            key={label}>
            <InputLabel classes={{ root: classes.inputLabel }}>
              {label}
            </InputLabel>
            <FormControl
              classes={{ root: classes.dropdownInput }}
              variant="outlined">
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
                      input: classes.input,
                    }}
                  />
                }>
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
        {renderInputs()}
        {renderDropdownInputs()}
      </div>
    </Fragment>
  );
};

export default InventoryCountFilters;
