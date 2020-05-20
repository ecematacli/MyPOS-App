import React from 'react';
import {
  Popover,
  Typography,
  Divider,
  Button,
  InputAdornment,
  PopoverOrigin,
} from '@material-ui/core';

import styles from './styles';
import CustomInput from '../../../../common/components/customInput';

export interface Props {
  open: boolean;
  anchorEl: null | Element;
  handleClose: () => void;
  inputValue: number;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleCompleteEditClick: () => void;
  popoverContentElement: JSX.Element;
  title: string;
  field: string;
  anchorOrigin?: PopoverOrigin;
  transformOrigin?: PopoverOrigin;
  currencySign?: boolean;
}

const EditPricePopover: React.FC<Props> = (props) => {
  const classes = styles(props);
  const {
    open,
    anchorEl,
    handleClose,
    inputValue,
    handleInputChange,
    handleCompleteEditClick,
    title,
    popoverContentElement,
    anchorOrigin,
    transformOrigin,
    currencySign,
  } = props;

  const renderAnchorOrigin: PopoverOrigin = anchorOrigin
    ? anchorOrigin
    : {
        vertical: 'bottom',
        horizontal: 'center',
      };

  const renderTransformOrigin: PopoverOrigin = transformOrigin
    ? transformOrigin
    : {
        vertical: 'top',
        horizontal: 'center',
      };

  const renderContent = () => (
    <div className={classes.popoverContentDiv}>
      <Typography className={classes.addPriceCaption}>{title}</Typography>
      <Divider />
      <div className={classes.addPriceDiv}>
        {popoverContentElement}
        <CustomInput
          startAdornment={
            currencySign && (
              <InputAdornment position="start">&#x20BA;</InputAdornment>
            )
          }
          type="number"
          className={classes.numberSpinner}
          value={inputValue}
          onChange={handleInputChange}
          classesProp={{
            root: classes.priceInputRoot,
            input: classes.smallScreenFont,
          }}
        />
      </div>
      <div className={classes.btnDiv}>
        <Button
          className={classes.actionBtn}
          onClick={() => handleClose()}
          color="secondary">
          Cancel
        </Button>
        <Button
          onClick={() => handleCompleteEditClick()}
          className={classes.actionBtn}
          color="primary">
          OK
        </Button>
      </div>
    </div>
  );

  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorOrigin={renderAnchorOrigin}
      transformOrigin={renderTransformOrigin}>
      {renderContent()}
    </Popover>
  );
};

export default EditPricePopover;
