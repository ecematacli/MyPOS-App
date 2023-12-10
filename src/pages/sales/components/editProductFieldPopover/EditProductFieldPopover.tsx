import React from 'react'
import {
  Popover,
  Typography,
  Divider,
  Button,
  InputAdornment,
  PopoverOrigin,
} from '@material-ui/core'

import styles from './styles'
import { Props } from './types'
import CustomInput from '../../../../common/components/customInput'

const EditPricePopover: React.FC<Props> = props => {
  const classes = styles(props)
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
    testId,
  } = props

  const renderAnchorOrigin: PopoverOrigin = anchorOrigin
    ? anchorOrigin
    : {
        vertical: 'bottom',
        horizontal: 'center',
      }

  const renderTransformOrigin: PopoverOrigin = transformOrigin
    ? transformOrigin
    : {
        vertical: 'top',
        horizontal: 'center',
      }

  const renderContent = () => (
    <div className={classes.popoverContentDiv}>
      <Typography className={classes.addPriceCaption}>{title}</Typography>
      <Divider />
      <div className={classes.addPriceDiv}>
        {popoverContentElement}
        <CustomInput
          type='number'
          className={classes.numberSpinner}
          value={inputValue}
          onChange={handleInputChange}
          startAdornment={
            currencySign && (
              <InputAdornment position='start'>&#x20BA;</InputAdornment>
            )
          }
          inputProps={{
            'data-testid': testId,
          }}
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
          color='secondary'>
          İptal et
        </Button>
        <Button
          onClick={() => handleCompleteEditClick()}
          className={classes.actionBtn}
          color='primary'>
          Kaydet
        </Button>
      </div>
    </div>
  )

  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorOrigin={renderAnchorOrigin}
      transformOrigin={renderTransformOrigin}>
      {renderContent()}
    </Popover>
  )
}

export default EditPricePopover
