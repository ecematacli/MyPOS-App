import React from 'react';
import { connect } from 'react-redux';
import { Paper, Typography, IconButton, Card } from '@material-ui/core';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import DoneIcon from '@material-ui/icons/Done';
import CancelIcon from '@material-ui/icons/Cancel';

import styles from './styles';
import useProductDetails from './hooks/useProductDetails';
import CustomInput from '../../../../common/components/customInput/CustomInput';
import {
  displayErrorMsg,
  displaySuccessMsg
} from '../../../../redux/notifications/notificationsActions';
import { currencyFormatter } from '../../../../common/utils/currencyFormatter';
// eslint-disable-next-line react/display-name
const ProductDetails = props => {
  const classes = styles(props);
  const { product, displaySuccessMsg, displayErrorMsg } = props;

  const {
    PRODUCT_FIELDS,
    edittedRow,
    handleEdittedRow,
    handleEditClick,
    productVal,
    handleInputChange,
    enabledEdit,
    completeEdit
  } = useProductDetails(product);

  const renderEditForm = (fieldId, label, dropdown, dropdownItems, type) => (
    <div className={classes.editFormContainer}>
      <CustomInput
        label={label}
        dropdown={dropdown}
        type={type}
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
        value={
          fieldId === 'price' || fieldId === 'discountPrice'
            ? currencyFormatter(productVal[fieldId])
            : productVal[fieldId]
        }
        onChange={e => handleInputChange(e, fieldId)}
        color="secondary"
      />
      <div className={classes.editIcons}>
        <IconButton
          className={classes.iconButton}
          onClick={() => {
            completeEdit(fieldId, productVal[fieldId], product.id);
            displaySuccessMsg(`${label} has been updated successfully!`);
            displayErrorMsg('Something went wrong!');
            handleEdittedRow(fieldId);
          }}
        >
          <DoneIcon className={classes.detailActionBtnIcon} />
        </IconButton>
        <IconButton
          className={classes.iconButton}
          onClick={() => {
            handleEdittedRow(fieldId);
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
        currency,
        type
      } = productField;
      return (
        <div key={label} className={classes.productDetails}>
          <Typography>{label}: </Typography>
          <div className={classes.detailAction}>
            {edittedRow[fieldId] ? (
              renderEditForm(fieldId, label, dropdown, dropdownItems, type)
            ) : (
              <>
                {currency && <div>&#x20BA;</div>}
                <Typography>{productVal[fieldId]}</Typography>
                <div
                  onClick={() => {
                    handleEdittedRow(fieldId);
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
      <div className={classes.paperHead}>
        <Typography color="secondary" className={classes.paperTitle}>
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

export default connect(null, {
  displayErrorMsg,
  displaySuccessMsg
})(ProductDetails);
