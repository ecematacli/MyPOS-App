import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { useSnackbar } from 'notistack';
import clsx from 'clsx';
import {
  Paper,
  Typography,
  OutlinedInput,
  IconButton,
  Card,
  Button
} from '@material-ui/core';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import DoneIcon from '@material-ui/icons/Done';
import CloseIcon from '@material-ui/icons/Close';

import styles from './styles';
// import useProductDetails from '../hooks/useProductDetails';
import { editProduct } from '../../../redux/products/productsActions';
import useProductDetails from '../hooks/useProductDetails';

const ProductDetails = props => {
  const classes = styles(props);
  const { product, editProduct } = props;
  const {
    PRODUCT_FIELDS,
    edittedRow,
    handleEdittedRow,
    handleEditClick,
    productVal,
    handleInputChange,
    enabledEdit
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

  const renderEditForm = (fieldId, label, snackbarMessage) => {
    return (
      <div className={classes.editFormContainer}>
        <OutlinedInput
          classes={{
            root: classes.editInput
          }}
          color="secondary"
          value={productVal[fieldId]}
          onChange={e => handleInputChange(e, fieldId)}
        />
        <div className={classes.editIcons}>
          <IconButton
            className={classes.iconButton}
            onClick={() => {
              editProduct(productVal);
              enqueueSnackbar(snackbarMessage, {
                variant: 'success',
                autoHideDuration: 3000,
                preventDuplicate: true,
                action
              });
              handleEdittedRow(label);
            }}
          >
            <DoneIcon
              className={clsx(classes.detailActionBtnIcon, classes.doneIcon)}
            />
          </IconButton>
          <IconButton
            className={classes.iconButton}
            onClick={() => {
              handleEdittedRow(label);
            }}
          >
            <CloseIcon
              className={clsx(classes.detailActionBtnIcon, classes.closeIcon)}
            />
          </IconButton>
        </div>
      </div>
    );
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
      <Card className={classes.detailsCard}>
        {PRODUCT_FIELDS.map(product => {
          const { label, fieldId, currency } = product;
          const snackbarMessage = `"${label}" has been updated!" `;
          return (
            <div key={label} className={classes.productDetails}>
              <Typography>{label}: </Typography>
              <div className={classes.detailAction}>
                {edittedRow[label] ? (
                  renderEditForm(fieldId, label, snackbarMessage)
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
        })}
      </Card>
    </Paper>
  );
};

export default connect(null, { editProduct })(ProductDetails);
