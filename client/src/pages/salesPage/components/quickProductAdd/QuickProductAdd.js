import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import AddCircleIcon from '@material-ui/icons/AddCircle';

import styles from './styles';
import useQuickAddState from './hooks/useQuickAddState';
import useProductInputState from './hooks/useProductInputState';
import CustomInput from '../../../../common/components/customInput/CustomInput';

const QuickProductAdd = () => {
  const classes = styles();
  const {
    handleOpenDialog,
    openDialog,
    handleCloseDialog
  } = useQuickAddState();
  const {
    PRODUCT_FIELDS,
    name,
    setName,
    sku,
    setSku,
    barcode,
    setBarcode,
    price,
    setPrice,
    discountedPrice,
    setDiscountedPrice,
    category,
    setCategory
  } = useProductInputState();

  return (
    <div>
      <div onClick={handleOpenDialog}>
        <AddCircleIcon className={classes.quickAddIcon} />
      </div>
      <Dialog
        classes={{ paper: classes.dialogPaper }}
        open={openDialog}
        onClose={handleCloseDialog}
      >
        <DialogTitle className={classes.dialogTitle}>Add a Product</DialogTitle>
        <DialogContent>
          {PRODUCT_FIELDS.map(({ label, dropdown }) => (
            <CustomInput key={label} label={label} dropdown={dropdown} />
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleCloseDialog} color="primary">
            Add Product
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default QuickProductAdd;
