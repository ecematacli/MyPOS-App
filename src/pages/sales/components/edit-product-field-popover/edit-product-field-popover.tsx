import React from 'react'
import { Popover, Divider, InputAdornment, PopoverOrigin } from '@mui/material'
import { useTheme } from '@mui/material/styles'

import {
  AddPriceContainer,
  ButtonContainer,
  ContentContainer,
  PriceCaptionTitle,
  StyledActionButton,
  StyledCustomInput,
  getPriceInputRootStyles,
  getSmallScreenInputStyles,
} from './styles'
import { Props } from './types'

export const EditPricePopover: React.FC<Props> = props => {
  const theme = useTheme()
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
    <ContentContainer {...props}>
      <PriceCaptionTitle>{title}</PriceCaptionTitle>
      <Divider />
      <AddPriceContainer>
        {popoverContentElement}
        <StyledCustomInput
          type='number'
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
            root: getPriceInputRootStyles(theme),
            input: getSmallScreenInputStyles(theme),
          }}
        />
      </AddPriceContainer>
      <ButtonContainer display='flex' justifyContent='flex-end'>
        <StyledActionButton onClick={() => handleClose()} color='secondary'>
          İptal et
        </StyledActionButton>
        <StyledActionButton
          onClick={() => handleCompleteEditClick()}
          color='primary'>
          Kaydet
        </StyledActionButton>
      </ButtonContainer>
    </ContentContainer>
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
