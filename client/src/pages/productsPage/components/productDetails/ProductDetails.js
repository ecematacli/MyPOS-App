import React, { Fragment } from 'react';
import { useSnackbar } from 'notistack';
import { Paper, Typography, IconButton, Card, Button } from '@material-ui/core';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import DoneIcon from '@material-ui/icons/Done';
import CloseIcon from '@material-ui/icons/Close';
import CancelIcon from '@material-ui/icons/Cancel';

import styles from './styles';
import useProductDetails from './hooks/useProductDetails';
import CustomInput from '../../../../common/components/customInput/CustomInput';
// eslint-disable-next-line react/display-name
const ProductDetails = props => {
  const classes = styles(props);
  const { product } = props;

  const {
    PRODUCT_FIELDS,
    edittedRow,
    handleEdittedRow,
    handleEditClick,
    productVal,
    handleInputChange,
    enabledEdit,
    dispatchEditAction
  } = useProductDetails(product);

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const action = key => (
    <Fragment>
      <Button
        onClick={() => {
          closeSnackbar(key);
        }}
      >
        <CloseIcon />
      </Button>
    </Fragment>
  );

  const renderEditForm = (
    fieldId,
    label,
    dropdown,
    dropdownItems,
    snackbarMessage
  ) => (
    <div className={classes.editFormContainer}>
      <CustomInput
        label={label}
        dropdown={dropdown}
        classesProp={
          !dropdown
            ? {
                root: classes.input
              }
            : {
                dropdownInput: { root: classes.dropdownInput },
                innerInput: { root: classes.innerInput }
              }
        }
        dropdownItems={dropdownItems}
        value={productVal[fieldId]}
        onChange={e => handleInputChange(e, fieldId)}
        color="secondary"
      />
      <div className={classes.editIcons}>
        <IconButton
          className={classes.iconButton}
          onClick={() => {
            dispatchEditAction(productVal[fieldId], fieldId, product.id);
            enqueueSnackbar(snackbarMessage, {
              variant: 'success',
              autoHideDuration: 3000,
              preventDuplicate: true,
              action
            });
            handleEdittedRow(label);
          }}
        >
          <DoneIcon className={classes.detailActionBtnIcon} />
        </IconButton>
        <IconButton
          className={classes.iconButton}
          onClick={() => {
            handleEdittedRow(label);
          }}
        >
          <CancelIcon className={classes.detailActionBtnIcon} />
        </IconButton>
      </div>
    </div>
  );

  const renderProductDetails = () => {
    return PRODUCT_FIELDS.map(productField => {
      const {
        label,
        fieldId,
        dropdown,
        dropdownItems,
        currency
      } = productField;
      const snackbarMessage = `"${label}" has been updated!" `;
      return (
        <div key={label} className={classes.productDetails}>
          <Typography>{label}: </Typography>
          <div className={classes.detailAction}>
            {edittedRow[label] ? (
              renderEditForm(
                fieldId,
                label,
                dropdown,
                dropdownItems,
                snackbarMessage
              )
            ) : (
              <>
                {currency && <div>&#x20BA;</div>}
                <Typography>{productVal[fieldId]}</Typography>
                <div
                  onClick={() => {
                    handleEdittedRow(label);
                  }}
                  className={classes.editIcon}
                >
                  {enabledEdit ? <EditOutlinedIcon /> : null}
                </div>
              </>
            )}
          </div>
        </div>
      );
    });
  };

  return (
    <Paper className={classes.productDetailsContainer}>
      <div className={classes.cardHead}>
        <Typography color="secondary" className={classes.cardTitle}>
          Details
        </Typography>
        <IconButton className={classes.iconButton} onClick={handleEditClick}>
          {enabledEdit ? <DoneIcon /> : <EditOutlinedIcon />}
        </IconButton>
      </div>
      <Card className={classes.detailsCard}>{renderProductDetails()}</Card>
    </Paper>
  );
};

export default ProductDetails;
