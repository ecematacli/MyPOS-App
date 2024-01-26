import React, { Fragment, useState } from 'react'
import { Typography, MenuItem, OutlinedInput, Box } from '@mui/material'
import { useTheme } from '@mui/material/styles'

import {
  DiscountText,
  StyledEditIcon,
  StyledFormControl,
  StyledSelect,
  TotalDivider,
  TotalSectionContainer,
} from './styles'
import { TotalProps } from '../pos-table-right/types'
import { currencyFormatter } from '../../../../common/utils'
import { EditPricePopover } from '../edit-product-field-popover/edit-product-field-popover'
import useEditDiscountState from './hooks/useEditDiscountState'

import { CustomInput } from '../../../../common/components/custom-input/custom-input'
import { Align } from '../../../../common/components/Align'

export const Total: React.FC<TotalProps> = ({
  products,
  total,
  tax,
  discount,
  setDiscount,
  percentageDiscount,
  setPercentageDiscount,
  discardSale,
  anchorEl,
  handleEditClick,
  onCompleteDiscountEditClick,
  handleClose,
  setTotal,
}) => {
  const theme = useTheme()
  const [editingTotal, setEditingTotal] = useState(false)

  const {
    discountType,
    discountValue,
    handleDiscountTypeChange,
    handleDiscountValueChange,
  } = useEditDiscountState(discount, percentageDiscount)

  const renderDiscountTypes = () => (
    <StyledFormControl>
      <StyledSelect
        color='secondary'
        input={
          <OutlinedInput
            sx={{
              root: { height: 35 },
              input: {
                [theme.breakpoints.down('sm')]: {
                  fontSize: 14,
                },
              },
            }}
          />
        }
        value={discountType}
        onChange={handleDiscountTypeChange}>
        {['%', 'TL'].map(label => (
          <MenuItem
            sx={{
              root: {
                [theme.breakpoints.down('sm')]: {
                  fontSize: 14,
                },
              },
            }}
            key={label}
            value={label}>
            {label}
          </MenuItem>
        ))}
      </StyledSelect>
    </StyledFormControl>
  )

  const renderEditPricePopover = () => (
    <EditPricePopover
      title='İndirim Uygula'
      field='discount'
      popoverContentElement={renderDiscountTypes()}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      testId='discount-type-input'
      transformOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      open={Boolean(anchorEl && anchorEl.discount)}
      anchorEl={anchorEl ? anchorEl.discount : null}
      handleClose={() => handleClose('discount')}
      inputValue={discountValue}
      handleInputChange={e => handleDiscountValueChange(e.target.value)}
      handleCompleteEditClick={() =>
        onCompleteDiscountEditClick(
          total,
          discountType,
          discountValue,
          setDiscount,
          setPercentageDiscount
        )
      }
    />
  )

  const renderTotal = () => (
    <Box>
      {!products.length && editingTotal ? (
        <CustomInput
          id='edit-total'
          value={total - discount}
          onChange={({ target }) =>
            setTotal((parseFloat(target.value) || 0) + discount)
          }
          classesProp={{
            input: { height: theme.spacing(0.5), width: theme.spacing(7) },
          }}
        />
      ) : (
        <Align align='center'>
          <Typography data-testid='total'>
            {currencyFormatter(total - discount)}
          </Typography>
          {!products.length ? (
            <Box>
              <StyledEditIcon onClick={() => setEditingTotal(true)} />
            </Box>
          ) : (
            <React.Fragment />
          )}
        </Align>
      )}
    </Box>
  )

  return (
    <Box sx={{ overflow: 'auto' }}>
      <TotalSectionContainer display='flex' justifyContent='space-between'>
        <Typography>Ara Toplam</Typography>
        <Typography data-testid='sub-total'>
          {currencyFormatter(total - tax)}
        </Typography>
      </TotalSectionContainer>
      <TotalSectionContainer display='flex' justifyContent='space-between'>
        <Typography>Vergi</Typography>
        <Typography data-testid='tax'>{currencyFormatter(tax)}</Typography>
      </TotalSectionContainer>
      <TotalSectionContainer display='flex' justifyContent='space-between'>
        <Box
          display='flex'
          alignItems='center'
          onClick={e => handleEditClick(e, 'discount')}>
          <DiscountText>İndirim</DiscountText>
        </Box>
        {renderEditPricePopover()}
        <Typography data-testid='discount'>
          <Box component='span' sx={{ fontWeight: 'bold', paddingRight: 1.2 }}>
            %
          </Box>
          {parseFloat(percentageDiscount.toFixed(2))} /{' '}
          {currencyFormatter(discount)}
        </Typography>
      </TotalSectionContainer>
      <TotalDivider />
      <TotalSectionContainer
        display='flex'
        justifyContent='space-between'
        alignItems='center'
        sx={theme => ({
          paddingTop: theme.spacing(2),
          paddingBottom: theme.spacing(1),
        })}>
        <Typography>Toplam</Typography>
        {renderTotal()}
      </TotalSectionContainer>
    </Box>
  )
}
