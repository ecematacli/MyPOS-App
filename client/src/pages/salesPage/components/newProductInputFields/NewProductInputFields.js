import React, { Fragment } from 'react';

import styles from './styles';
import CustomInput from '../../../../common/components/customInput/CustomInput';

const NewProductInputFields = ({
  field,
  fieldId,
  label,
  type,
  form: { touched, errors },
  ...otherProps
}) => {
  const classes = styles();

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
