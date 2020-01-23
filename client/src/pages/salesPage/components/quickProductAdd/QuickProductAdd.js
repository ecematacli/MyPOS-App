import React, { Fragment } from 'react';
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
import AddCircleIcon from '@material-ui/icons/AddCircle';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import styles from './styles';
import useQuickAddState from './hooks/useQuickAddState';
import useNewProductInputState from './hooks/useNewProductInputState';
import CustomInput from '../../../../common/components/customInput/CustomInput';

const QuickProductAdd = () => {
  const classes = styles();
  const {
    handleOpenDialog,
    openDialog,
    handleCloseDialog
  } = useQuickAddState();
  const { NEW_PRODUCT_FIELDS, handleInputChange } = useNewProductInputState();

  const renderAdditionalFields = () => {
    return (
      <ExpansionPanel classes={{ root: classes.expansionRoot }}>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className={classes.expansionText}>
            Expand for more fields
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails classes={{ root: classes.expansionDetails }}>
          {NEW_PRODUCT_FIELDS.map(
            ({
              label,
              dropdown,
              dropdownItems,
              fieldId,
              value,
              additionalField
            }) => {
              if (!additionalField) {
                return;
              }
              return (
                <CustomInput
                  inputType="quickAddInput"
                  name={fieldId}
                  value={value}
                  onChange={handleInputChange}
                  key={label}
                  label={label}
                  dropdown={dropdown}
                  dropdownItems={dropdownItems}
                  inputLabel={true}
                />
              );
            }
          )}
        </ExpansionPanelDetails>
      </ExpansionPanel>
    );
  };

  const renderDialog = () => {
    return (
      <Dialog
        classes={{ paper: classes.dialogPaper }}
        open={openDialog}
        onClose={handleCloseDialog}
      >
        <DialogTitle className={classes.dialogTitle}>Add a Product</DialogTitle>
        <DialogContent>
          {NEW_PRODUCT_FIELDS.map(
            ({
              label,
              dropdown,
              dropdownItems,
              fieldId,
              value,
              additionalField
            }) => {
              if (additionalField) {
                return;
              }
              return (
                <CustomInput
                  inputType="quickAddInput"
                  name={fieldId}
                  value={value}
                  onChange={handleInputChange}
                  key={label}
                  label={label}
                  dropdown={dropdown}
                  dropdownItems={dropdownItems}
                  inputLabel={true}
                />
              );
            }
          )}
        </DialogContent>
        <div>{renderAdditionalFields()}</div>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleCloseDialog} color="primary">
            Add Product
          </Button>
        </DialogActions>
      </Dialog>
    );
  };

  return (
    <Fragment>
      <div onClick={handleOpenDialog}>
        <AddCircleIcon className={classes.quickAddIcon} />
      </div>
      {renderDialog()}
    </Fragment>
  );
};

export default QuickProductAdd;
