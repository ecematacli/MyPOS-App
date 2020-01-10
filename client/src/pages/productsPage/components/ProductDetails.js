import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Paper, Typography, OutlinedInput } from '@material-ui/core';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import DoneIcon from '@material-ui/icons/Done';
import CloseIcon from '@material-ui/icons/Close';

import styles from './styles';
import { editProduct } from '../../../redux/products/productsActions';

const ProductDetails = props => {
  const classes = styles(props);
  const { product } = props;
  const {
    product: { name, sku, brand, category, price, id }
  } = props;

  const [edittedRow, setEdittedRow] = useState({});
  const [inputVal, setInputVal] = useState(product);

  const handleInputChange = e => {
    setInputVal(e.target.value);
  };

  const PRODUCT_FIELDS = [
    { label: 'Product Name', description: 'name', value: name },
    { label: 'Sku', description: 'sku', value: sku },
    { label: 'Brand Name', description: 'brand', value: brand },
    { label: 'Category Name', description: 'category', value: category },
    { label: 'Price', description: 'price', value: price }
  ];
  console.log(inputVal);

  const handleEdittedRow = label => {
    setEdittedRow({ ...edittedRow, [label]: !edittedRow[label] });
  };

  const renderEditForm = (description, label) => {
    return (
      <form>
        <div className={classes.editFormContainer}>
          <OutlinedInput
            classes={{
              root: classes.editInput
            }}
            color="secondary"
            value={inputVal[description]}
            onChange={handleInputChange}
          />
          <div className={classes.editIcons}>
            <DoneIcon className={classes.doneIcon} />
            <CloseIcon className={classes.closeIcon} />
          </div>
        </div>
      </form>
    );
  };

  return (
    <Paper className={classes.salesDetailsContainer}>
      <Paper className={classes.detailsPaper}>
        {PRODUCT_FIELDS.map(({ label, description, value }) => {
          return (
            <div key={label} className={classes.productDetails}>
              <Typography>{label}: </Typography>
              <div className={classes.detailAction}>
                {edittedRow[label] ? (
                  renderEditForm(description, label)
                ) : (
                  <>
                    <Typography>{value}</Typography>
                    <div
                      onClick={() => {
                        handleEdittedRow(label);
                      }}
                      className={classes.editIcon}
                    >
                      <EditOutlinedIcon />
                    </div>
                  </>
                )}
              </div>
            </div>
          );
        })}
      </Paper>
    </Paper>
  );
};

export default connect(null, { editProduct })(ProductDetails);
