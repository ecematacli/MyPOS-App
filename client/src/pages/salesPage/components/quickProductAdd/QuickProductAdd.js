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
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import styles from './styles';
import useNewProductInputState from './hooks/useNewProductInputState';
import CustomInput from '../../../../common/components/customInput/CustomInput';

const QuickProductAdd = ({ openDialog, handleCloseDialog }) => {
  const classes = styles();

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
                  name={fieldId}
                  value={value}
                  onChange={handleInputChange}
                  key={label}
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
            ({ label, fieldId, value, additionalField }) => {
              if (additionalField) {
                return;
              }
              return (
                <CustomInput
                  name={fieldId}
                  value={value}
                  onChange={handleInputChange}
                  key={label}
                  label={label}
                  inputLabel={true}
                  classesProp={{
                    root: classes.input
                  }}
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

  return <Fragment>{renderDialog()}</Fragment>;
};

export default QuickProductAdd;
