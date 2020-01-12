import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useSnackbar } from 'notistack';
import clsx from 'clsx';
import {
  Paper,
  Typography,
  OutlinedInput,
  IconButton,
  Card
} from '@material-ui/core';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import DoneIcon from '@material-ui/icons/Done';
import CloseIcon from '@material-ui/icons/Close';

import styles from './styles';
import { editProduct } from '../../../redux/products/productsActions';

const ProductDetails = props => {
  const classes = styles(props);
  const { product, editProduct } = props;
  const {
    product: { name, sku, brand, category, price }
  } = props;
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [edittedRow, setEdittedRow] = useState({});
  const [productVal, setProductVal] = useState(product);
  const [enabledEdit, setEnabledEdit] = useState(false);

  const PRODUCT_FIELDS = [
    { label: 'Product Name', fieldId: 'name', value: name },
    { label: 'Sku', fieldId: 'sku', value: sku },
    { label: 'Brand Name', fieldId: 'brand', value: brand },
    { label: 'Category Name', fieldId: 'category', value: category },
    { label: 'Price', fieldId: 'price', value: price, currency: true }
  ];

  const handleEdittedRow = label => {
    setEdittedRow({ ...edittedRow, [label]: !edittedRow[label] });
  };

  const handleInputChange = (e, fieldId) => {
    setProductVal({ ...productVal, [fieldId]: e.target.value });
  };

  const handleEditClick = () => {
    setEnabledEdit(!enabledEdit);
  };

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
              enqueueSnackbar(snackbarMessage, { persist: false });
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
              editProduct(productVal);
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
        <Typography
          variant="title"
          color="secondary"
          className={classes.cardTitle}
        >
          Details
        </Typography>
        <IconButton className={classes.iconButton} onClick={handleEditClick}>
          {enabledEdit ? (
            <DoneIcon />
          ) : (
            <div onClick={() => setEnabledEdit(false)}>
              <EditOutlinedIcon />
            </div>
          )}
        </IconButton>
      </div>
      <Card className={classes.detailsCard}>
        {PRODUCT_FIELDS.map(({ label, fieldId, value, currency }) => {
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
                    <Typography>{value}</Typography>
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
