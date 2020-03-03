import React from 'react';
import clsx from 'clsx';
import {
  Popover,
  Typography,
  Divider,
  Button,
  InputAdornment
} from '@material-ui/core';

import styles from './styles';
import CustomInput from '../../../../common/components/customInput/CustomInput';
interface Props {
  id: string;
  open: boolean;
  anchorEl: any;
  handleClose: () => void;
  inputValue: string;
  handleInputChange: (i: string) => void;
  handleCompleteEditClick: () => void;
}

const EditPricePopover: React.FC<Props> = ({
  open,
  anchorEl,
  handleClose,
  inputValue,
  handleInputChange,
  handleCompleteEditClick
}) => {
  const classes = styles();

  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center'
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center'
      }}
    >
      <div className={classes.popoverContentDiv}>
        <Typography className={classes.addPriceCaption}>
          Add an amount for price
        </Typography>
        <Divider />
        <div className={classes.addPriceDiv}>
          <div className={clsx(classes.title, classes.smallScreenFont)}>
            Price
          </div>
          <CustomInput
            startAdornment={
              <InputAdornment position="start">&#x20BA;</InputAdornment>
            }
            value={inputValue}
            onChange={handleInputChange}
            classesProp={{
              root: classes.priceInputRoot,
              input: classes.smallScreenFont
            }}
          />
        </div>
        <div className={classes.btnDiv}>
          <Button
            style={{ marginRight: -5 }}
            className={classes.actionBtn}
            onClick={handleClose}
            color="secondary"
          >
            Cancel
          </Button>
          <Button
            onClick={handleCompleteEditClick}
            className={classes.actionBtn}
            color="primary"
          >
            OK
          </Button>
        </div>
      </div>
    </Popover>
  );
};

export default EditPricePopover;
