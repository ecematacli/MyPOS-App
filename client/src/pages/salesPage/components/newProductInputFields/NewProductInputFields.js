import React, { Fragment } from 'react';

import styles from './styles';
import CustomInput from '../../../../common/components/customInput/CustomInput';
import { InputAdornment } from '@material-ui/core';

const NewProductInputFields = props => {
  const classes = styles(props);
  const {
    field,
    fieldId,
    label,
    type,
    form: { touched, errors },
    ...otherProps
  } = props;

  const requiredFieldClasses =
    errors[fieldId] && touched[fieldId] ? `${classes.notchedOutline}` : null;

  return (
    <Fragment>
      <CustomInput
        {...field}
        {...otherProps}
        label={label}
        type={type}
        classesProp={{
          root: classes.input,
          notchedOutline: requiredFieldClasses
        }}
        inputLabel
        startAdornment={
          (fieldId === 'price' || fieldId === 'discountPrice') && (
            <InputAdornment position="start">&#x20BA;</InputAdornment>
          )
        }
      />
      {(fieldId === 'barcode' || fieldId === 'price') &&
      errors[fieldId] &&
      touched[fieldId] ? (
        <div className={classes.helperText}>{errors[fieldId]}</div>
      ) : null}
    </Fragment>
  );
};

export default NewProductInputFields;
