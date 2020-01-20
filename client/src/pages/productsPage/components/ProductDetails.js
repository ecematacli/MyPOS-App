import React, { Fragment } from 'react';
import { useSnackbar } from 'notistack';
import {
  Paper,
  Typography,
  OutlinedInput,
  IconButton,
  Card,
  Select,
  Button,
  FormControl,
  InputLabel,
  MenuItem
} from '@material-ui/core';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import DoneIcon from '@material-ui/icons/Done';
import CloseIcon from '@material-ui/icons/Close';
import CancelIcon from '@material-ui/icons/Cancel';

import styles from './styles';
import useProductDetails from '../hooks/useProductDetails';

// eslint-disable-next-line react/display-name
const ProductDetails = props => {
  const classes = styles(props);
  const { product } = props;
  console.log(product);

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

  const renderEditForm = (fieldId, label, dropdown, snackbarMessage) => {
    return (
      <div className={classes.editFormContainer}>
        {dropdown ? (
          <FormControl className={classes.selectInput}>
            <InputLabel color="secondary" id={label}>
              {label}
            </InputLabel>
            <Select
              color="secondary"
              labelId={label}
              value={'age'}
              onChange={() => 'hey'}
            >
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
        ) : (
          <OutlinedInput
            classes={{
              root: classes.editInput
            }}
            color="secondary"
            value={productVal[fieldId]}
            onChange={e => handleInputChange(e, fieldId)}
          />
        )}
        <div className={classes.editIcons}>
          <IconButton
            className={classes.iconButton}
            onClick={() => {
              console.log(product.id);
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
  };

  const renderProductDetails = () => {
    return PRODUCT_FIELDS.map(productField => {
      const { label, fieldId, dropdown, currency } = productField;
      const snackbarMessage = `"${label}" has been updated!" `;
      return (
        <div key={label} className={classes.productDetails}>
          <Typography>{label}: </Typography>
          <div className={classes.detailAction}>
            {edittedRow[label] ? (
              renderEditForm(fieldId, label, dropdown, snackbarMessage)
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
