import React, { Fragment, useRef } from 'react';
import { connect } from 'react-redux';
import { Formik, Field } from 'formik';
import * as Yup from 'yup';
import {
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Typography,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import styles from './styles';
import { Category } from '../../../../redux/categories/types';
import { Brand } from '../../../../redux/brands/types';
import useNewProductInputState from './useNewProductInputState';
import CustomInput from '../../../../common/components/customInput/CustomInput';
import NewProductInputFields from '../newProductInputFields/NewProductInputFields';

interface Props {
  openDialog: boolean;
  handleCloseDialog: () => void;
  brands: Brand[];
  categories: Category[];
}
const QuickProductAdd: React.FC<Props> = ({
  openDialog,
  handleCloseDialog,
  brands,
  categories
}) => {
  const classes = styles();
  const formRef = useRef<HTMLElement | any>();

  const {
    NEW_PRODUCT_FIELDS,
    ADDITIONAL_FIELDS,
    handleInputChange,
    onAddProductClick
  } = useNewProductInputState(brands, categories, handleCloseDialog);

  const ProductAddSchema = Yup.object().shape({
    barcode: Yup.string()
      .matches(/^[0-9]*$/, 'Barcode can only consist of numbers')
      .min(8, 'Too Short!')
      .max(16, 'Too Long!')
      .required('This field is required'),
    price: Yup.string().required('This field is required')
  });

  const renderAdditionalFields = () => {
    return (
      <ExpansionPanel classes={{ root: classes.expansionRoot }}>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className={classes.expansionText}>
            Expand for more fields
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails classes={{ root: classes.expansionDetails }}>
          {ADDITIONAL_FIELDS.map(
            ({ label, dropdown, dropdownItems, fieldId, value, type }) => {
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
          )}
        </ExpansionPanelDetails>
      </ExpansionPanel>
    );
  };

  const triggerFormSubmission = () => {
    if (formRef.current) {
      formRef.current.handleSubmit();
    }
  };

  const renderDialog = () => {
    return (
      <Dialog
        classes={{ paper: classes.dialogPaper }}
        open={openDialog}
        onClose={handleCloseDialog}
        disableBackdropClick
      >
        <DialogTitle className={classes.dialogTitle}>Add a Product</DialogTitle>
        <DialogContent>
          <Formik
            initialValues={{
              barcode: '',
              name: '',
              qty: 1,
              sku: '',
              price: '',
              variation: '',
              discountPrice: ''
            }}
            onSubmit={values => {
              onAddProductClick(values);
            }}
            validationSchema={ProductAddSchema}
            innerRef={formRef as any}
          >
            <Fragment>
              {NEW_PRODUCT_FIELDS.map(({ fieldId, label, type }) => (
                <Field
                  key={label}
                  label={label}
                  name={fieldId}
                  type={type}
                  fieldId={fieldId}
                  component={NewProductInputFields}
                />
              ))}
            </Fragment>
          </Formik>
        </DialogContent>
        <div>{renderAdditionalFields()}</div>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="secondary">
            Cancel
          </Button>
          <Button onClick={triggerFormSubmission} color="primary">
            Add Product
          </Button>
        </DialogActions>
      </Dialog>
    );
  };

  return <Fragment>{renderDialog()}</Fragment>;
};

const mapStateToProps = ({ brands, categories }) => ({
  brands,
  categories
});

export default connect(mapStateToProps)(QuickProductAdd);
