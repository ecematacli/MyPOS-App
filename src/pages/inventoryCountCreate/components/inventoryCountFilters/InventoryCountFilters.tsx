import React, { Fragment } from 'react'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { OutlinedInput, MenuItem, Box } from '@mui/material'
import { useTheme } from '@mui/material/styles'

import {
  FiltersContainer,
  FiltersInfoBox,
  InfoText,
  StyledInputLabel,
  StyledOutlinedInput,
  StyledFormControl,
  StyledSelect,
  CalendarIcon,
  DropdownInputContainer,
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
  const theme = useTheme()

  return (
    <FiltersContainer>
      <FiltersInfoBox>
        <InfoText>Please select filters to start an inventory count</InfoText>
      </FiltersInfoBox>
      <Box>
        <Box display='flex' flex={1}>
          <Box>
            <StyledInputLabel>Start Date</StyledInputLabel>
            <DatePicker
              sx={{
                width: theme.spacing(37.5),
              }}
              format='dd MMM yyyy'
              value={startDate}
              onChange={handleStartDateChange}
            />
          </Box>
          <Box>
            <StyledInputLabel
              sx={theme => ({ marginLeft: theme.spacing(2.5) })}
              color='secondary'>
              Count Name
            </StyledInputLabel>
            <StyledOutlinedInput
              value={countName}
              onChange={handleCountNameChange}
              color='secondary'
            />
          </Box>
        </Box>
        <DropdownInputContainer>
          {DROPDOWN_INPUT_FIELDS.map(
            ({ label, value, fieldId, dropdownItems }, i) => (
              <Box
                display='flex'
                flexDirection='column'
                sx={theme =>
                  i === 1 ? { marginLeft: theme.spacing(2.5) } : {}
                }
                key={label}>
                <StyledInputLabel>{label}</StyledInputLabel>
                <StyledFormControl variant='outlined'>
                  <StyledSelect
                    name={fieldId}
                    color='secondary'
                    value={value}
                    onChange={handleDropdownInputChange}
                    labelId={label}
                    input={
                      <OutlinedInput
                        sx={{
                          root: { height: theme.spacing(5.75) },
                          input: {
                            [theme.breakpoints.down('sm')]: {
                              fontSize: theme.spacing(1.6),
                            },
                          },
                        }}
                      />
                    }>
                    {dropdownItems.map(({ id, name }) => (
                      <MenuItem key={id} value={name}>
                        {name}
                      </MenuItem>
                    ))}
                  </StyledSelect>
                </StyledFormControl>
              </Box>
            )
          )}
        </DropdownInputContainer>
      </Box>
    </FiltersContainer>
  )
}
