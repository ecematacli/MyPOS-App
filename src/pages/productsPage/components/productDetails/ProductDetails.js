import React from 'react';
import { connect } from 'react-redux';
import { Paper, Typography, IconButton, Card } from '@material-ui/core';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import DoneIcon from '@material-ui/icons/Done';
import CancelIcon from '@material-ui/icons/Cancel';

import styles from './styles';
import useProductDetails from './useProductDetails';
import CustomInput from '../../../../common/components/customInput/CustomInput';
// eslint-disable-next-line react/display-name
const ProductDetails = props => {
  const classes = styles(props);
  const { product, brands, categories } = props;
  const {
    PRODUCT_FIELDS,
    edittedRow,
    handleEdittedRow,
    handleEditClick,
    productVal,
    handleInputChange,
    renderProductValues,
    getInputValues,
    enabledEdit,
    completeEdit
  } = useProductDetails(product, brands, categories);

  const renderEditForm = (fieldId, label, dropdown, dropdownItems, type) => (
    <div className={classes.editFormContainer}>
      <CustomInput
        label={label}
        dropdown={dropdown}
        type={type}
        classesProp={
          !dropdown
            ? {
                root: classes.inputRoot,
                input: classes.input
              }
            : {
                dropdownInput: {
                  root: classes.dropdownInput
                },
                innerInput: { root: classes.innerInput, input: classes.input }
              }
        }
        dropdownItems={dropdownItems}
        value={getInputValues(fieldId)}
        onChange={e => handleInputChange(e, fieldId)}
        color="secondary"
      />
      <div className={classes.editIcons}>
        <IconButton
          className={classes.iconButton}
          onClick={() => {
            completeEdit(fieldId, productVal[fieldId], product.id, label);
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

  const renderProductDetails = () =>
    PRODUCT_FIELDS.map(productField => {
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
                <Typography className={classes.detailContent}>
                  {renderProductValues(fieldId)}
                </Typography>
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

const mapStateToProps = ({ brands, categories }) => ({
  brands,
  categories
});

export default connect(mapStateToProps)(ProductDetails);
