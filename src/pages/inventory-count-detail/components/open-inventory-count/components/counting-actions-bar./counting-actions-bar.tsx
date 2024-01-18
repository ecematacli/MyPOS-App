import React, { SetStateAction, Dispatch } from 'react'
import { useHistory } from 'react-router-dom'
import { Typography, Checkbox, Box } from '@mui/material'

import {
  BackArrowIcon,
  CountInputActionContainer,
  IconContainer,
  ModeText,
  StyledButton,
  StyledOutlinedInput,
  TitleText,
} from './styles'
import { ChangeEvent, BatchData, BatchProduct } from '../../types'
import { InventoryCountTopBar } from '../../../../../../common/components/inventory-count-topbar/inventory-count-topbar'
import {
  capitalizeFirstLetters,
  formatDate,
} from '../../../../../../common/utils'
import { CustomButton } from '../../../../../../common/components/custom-button/custom-button'
import { InputAutoSuggest } from '../../../../../../common/components/input-auto-suggest/input-auto-suggest'

interface CountingActionsBarProps {
  batch: BatchData
  onProductSelect: (product: BatchProduct) => void
  countInputRef: React.MutableRefObject<HTMLInputElement>
  itemCount: number
  selectedProduct: BatchProduct
  setItemCount: Dispatch<SetStateAction<number>>
  countProduct: (p: BatchProduct) => void
  isQuickScanMode: boolean
  setIsQuickScanMode: (m: boolean) => void
  openConfirmationModal: () => void
  searchProducts: (query: string) => Promise<any[]>
}

export const CountingActionsBar: React.FC<CountingActionsBarProps> = ({
  batch,
  onProductSelect,
  countInputRef,
  itemCount,
  setItemCount,
  selectedProduct,
  countProduct,
  isQuickScanMode,
  setIsQuickScanMode,
  openConfirmationModal,
  searchProducts,
}) => {
  const history = useHistory()

  const handleCheckedChange = (e: ChangeEvent) => {
    setIsQuickScanMode(e.target.checked)
  }

  const onCountInputChange = (e: ChangeEvent) => {
    const value = e.target.value

    if (value === '') {
      return setItemCount(value as any)
    }
    setItemCount(parseInt(value))
  }

  return (
    <InventoryCountTopBar
      title={
        <Box
          display='flex'
          justifyContent='space-between'
          alignItems='center'
          width='100%'>
          <Box display='flex' alignItems='center'>
            <IconContainer
              component='span'
              onClick={() => history.push('/inventory/inventory-count')}>
              <BackArrowIcon />
            </IconContainer>
            <TitleText>
              {batch &&
                (batch.name
                  ? capitalizeFirstLetters(batch.name)
                  : `Count on ${formatDate(batch.started, 'd MMMM y - p')}`)}
            </TitleText>
          </Box>
          <CustomButton onClick={openConfirmationModal}>Complete</CustomButton>
        </Box>
      }
      inventoryCountActionsPaper={
        <Box
          display='flex'
          justifyContent='space-between'
          align-items='center'
          flex={1}>
          <InputAutoSuggest
            loadOptions={searchProducts}
            selectOption={onProductSelect}
            isQuickScanMode={isQuickScanMode}
          />
          {!isQuickScanMode && (
            <CountInputActionContainer>
              <StyledOutlinedInput
                inputRef={countInputRef}
                type='number'
                color='secondary'
                value={itemCount}
                onChange={onCountInputChange}
              />
              <StyledButton
                disabled={!selectedProduct}
                onClick={() => countProduct(selectedProduct)}
                sx={{ root: { borderRadius: 0, height: 55.3 } }}>
                <Typography
                  sx={{
                    textTransform: 'capitalize',
                    color: 'white',
                  }}>
                  Count
                </Typography>
              </StyledButton>
            </CountInputActionContainer>
          )}
          <CountInputActionContainer>
            <Checkbox
              color='primary'
              checked={isQuickScanMode}
              onChange={handleCheckedChange}
              disableRipple
            />
            <ModeText>Quick-scan mode</ModeText>
          </CountInputActionContainer>
        </Box>
      }
    />
  )
}
