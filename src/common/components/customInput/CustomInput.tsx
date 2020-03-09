import React, { Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useTheme } from '@material-ui/core/styles';

import {
  OutlinedInput,
  InputLabel,
  FormControl,
  Select,
  MenuItem,
  InputBaseComponentProps
} from '@material-ui/core';

interface DropdownItems {
  name: string;
  id: number;
}

interface Props {
  label?: string;
  dropdown?: boolean;
  dropdownItems?: DropdownItems[];
  inputLabel?: boolean;
  classesProp: any;
  name?: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  startAdornment?: JSX.Element;
  inputProps?: InputBaseComponentProps;
  invalidatedField?: boolean;
  color?: string;
  value: any;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const styles = makeStyles(({ breakpoints }) => ({
  root: {
    '&:focus': {
      backgroundColor: 'transparent'
    }
  },
  dropdownItems: {
    [breakpoints.down('sm')]: {
      fontSize: 14
    }
  }
}));

const CustomInput: React.FC<Props> = props => {
  const classes = styles();
  const { palette } = useTheme();

  const {
    label,
    dropdown,
    dropdownItems,
    inputLabel,
    classesProp,
    type = 'text',
    required,
    invalidatedField,
    ...otherProps
  } = props;

  return (
    <div>
      {dropdown ? (
        <Fragment>
          {inputLabel && (
            <InputLabel color="secondary" id={label}>
              {label}
            </InputLabel>
          )}
          <FormControl variant="outlined" classes={classesProp.dropdownInput}>
            <Select
              {...otherProps}
              classes={{ root: classes.root }}
              color="secondary"
              labelId={label}
              input={<OutlinedInput classes={classesProp.innerInput} />}
            >
              {dropdownItems.map(({ id, name }: DropdownItems) => (
                <MenuItem
                  classes={{ root: classes.dropdownItems }}
                  key={id}
                  value={name}
                >
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Fragment>
      ) : (
        <Fragment>
          {inputLabel && (
            <InputLabel
              color="secondary"
              style={invalidatedField && { color: palette.error.main }}
            >
              {label}
            </InputLabel>
          )}
          <OutlinedInput
            {...otherProps}
            classes={!dropdown && classesProp}
            color="secondary"
            type={type}
            required={required}
          />
        </Fragment>
      )}
    </div>
  );
};

export default CustomInput;
