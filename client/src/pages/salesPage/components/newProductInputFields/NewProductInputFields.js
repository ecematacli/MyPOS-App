import React from 'react';
import { connect } from 'react-redux';

import styles from './styles';
import useNewProductInputState from '../quickProductAdd/useNewProductInputState';
import useProductDialogState from '../productSearchBar/useProductDialogState';
import CustomInput from '../../../../common/components/customInput/CustomInput';

const InputFields = ({
  brands,
  categories,
  field,
  form: { touched, errors },
  ...props
}) => {
  const classes = styles();

  const { handleCloseDialog } = useProductDialogState();
  const {
    NEW_PRODUCT_FIELDS,
    handleInputChange,
    onAddProductClick
  } = useNewProductInputState(brands, categories, handleCloseDialog);

  return NEW_PRODUCT_FIELDS.map(
    ({
      label,
      dropdown,
      dropdownItems,
      fieldId,
      value,
      additionalField,
      type
    }) => {
      if (!additionalField) {
        return;
      }
      return (
        <CustomInput
          name={fieldId}
          value={value}
          onChange={handleInputChange}
          key={label}
          type={type}
          label={label}
          dropdown={dropdown}
          classesProp={{
            dropdownInput: { root: classes.dropdownInput }
          }}
          dropdownItems={dropdownItems}
          inputLabel
        />
      );
    }
  );
};

const mapStateToProps = ({ brands, categories }) => ({ brands, categories });

export default connect(mapStateToProps)(InputFields);
