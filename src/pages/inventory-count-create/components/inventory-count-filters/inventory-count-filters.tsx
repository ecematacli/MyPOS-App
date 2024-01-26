import React from 'react'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { OutlinedInput, MenuItem, Box, Grid, FormControl } from '@mui/material'

import {
  FiltersContainer,
  FiltersInfoBox,
  InfoText,
  StyledInputLabel,
  StyledSelect,
} from './styles'
import { Category } from '../../../../redux/categories/types'
import { Brand } from '../../../../redux/brands/types'

type InputChange = ({
  target: { value, name },
}: React.ChangeEvent<HTMLInputElement>) => void
interface Props {
  startDate: Date
  handleStartDateChange: React.Dispatch<React.SetStateAction<Date>>
  countName: string
  handleCountNameChange: InputChange
  handleDropdownInputChange: InputChange
  DROPDOWN_INPUT_FIELDS: {
    label: string
    fieldId: string
    value: string
    dropdownItems: Category[] | Brand[]
  }[]
}

export const InventoryCountFilters: React.FC<Props> = ({
  startDate,
  handleStartDateChange,
  countName,
  handleCountNameChange,
  handleDropdownInputChange,
  DROPDOWN_INPUT_FIELDS,
}) => {
  return (
    <FiltersContainer>
      <FiltersInfoBox>
        <InfoText>Please select filters to start an inventory count</InfoText>
      </FiltersInfoBox>
      <Box style={{ flexBasis: '70%' }}>
        <Box>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={6}>
              <StyledInputLabel>Start Date</StyledInputLabel>
              <DatePicker
                sx={{
                  width: '100%',
                }}
                format='dd MMM yyyy'
                value={startDate}
                onChange={handleStartDateChange}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <StyledInputLabel color='secondary'>Count Name</StyledInputLabel>
              <OutlinedInput
                sx={{ width: '100%' }}
                value={countName}
                onChange={handleCountNameChange}
                color='secondary'
              />
            </Grid>
          </Grid>
        </Box>
        <Box mt={4}>
          <Grid container spacing={3}>
            {DROPDOWN_INPUT_FIELDS.map(
              ({ label, value, fieldId, dropdownItems }) => (
                <Grid item xs={12} md={6} lg={6} key={label}>
                  <StyledInputLabel>{label}</StyledInputLabel>
                  <FormControl variant='outlined' sx={{ width: '100%' }}>
                    <StyledSelect
                      name={fieldId}
                      color='secondary'
                      value={value}
                      onChange={handleDropdownInputChange}
                      labelId={label}
                      input={<OutlinedInput sx={{ width: '100%' }} />}>
                      {dropdownItems.map(({ id, name }) => (
                        <MenuItem key={id} value={name}>
                          {name}
                        </MenuItem>
                      ))}
                    </StyledSelect>
                  </FormControl>
                </Grid>
              )
            )}
          </Grid>
        </Box>
      </Box>
    </FiltersContainer>
  )
}
