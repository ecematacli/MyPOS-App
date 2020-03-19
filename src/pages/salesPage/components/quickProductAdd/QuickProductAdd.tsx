import React, { Fragment, useRef } from 'react';
import { connect } from 'react-redux';
import { Formik, Field } from 'formik';
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
import { StoreState } from '../../../../redux/types';
import { QuickAddProps, FormValues } from './types';
import { ProductAddSchema } from './productAddSchema';
import useNewProductInputState from './useNewProductInputState';
import CustomInput from '../../../../common/components/customInput';
import NewProductInputFields from '../newProductInputFields/NewProductInputFields';

const QuickProductAdd: React.FC<QuickAddProps> = ({
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
          <Formik<FormValues>
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

const mapStateToProps = (state: StoreState) => ({
  brands: state.brands,
  categories: state.categories
});

export default connect(mapStateToProps)(QuickProductAdd);
