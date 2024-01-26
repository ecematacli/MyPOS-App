import React, { Fragment, useState } from 'react'
import { Box, Button } from '@mui/material'
import { useTheme } from '@mui/material/styles'

import {
  FilterButtonContainer,
  FilterCaption,
  FilterIconContainer,
  FilterInputContainer,
  FilterInputs,
  FilterLabel,
  StyledChipInput,
  StyledFilterButton,
  StyledFilterListIcon,
  StyledPopoverContent,
  getDropdownInputStyles,
  getInputRootStyles,
  getInputStyles,
} from './styles'
import { capitalize } from '../../../../common/utils'
import { CustomInput } from '../../../../common/components/custom-input/custom-input'
import { CustomPopover } from '../../../../common/components/custom-popover/custom-popover'
import { Filters, AppliedFilters, FilterInput } from '../../types'

interface FiltersProps {
  filterInputs: Filters
  appliedFilters: AppliedFilters
  cancelClick: () => void
  clearAllFilters: () => void
  handleInputChange: ({
    target: { value, name },
  }: React.ChangeEvent<HTMLInputElement>) => void
  filterInputFields: FilterInput[]
  handleApplyFilterClick: () => void
  handleDelete: (key: string) => void
}

export const ProductFilters: React.FC<FiltersProps> = ({
  filterInputs,
  appliedFilters,
  cancelClick,
  clearAllFilters,
  handleInputChange,
  filterInputFields,
  handleApplyFilterClick,
  handleDelete,
}) => {
  const theme = useTheme()

  const [anchorEl, setAnchorEl] = useState<null | Element>(null)

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const onCancelClick = () => {
    handleClose()
    cancelClick()
  }

  const onApplyFilterClick = () => {
    handleApplyFilterClick()
    handleClose()
  }

  const renderChipInputs = () =>
    Object.keys(appliedFilters).map(key => {
      if (!appliedFilters[key]) return
      return (
        <StyledChipInput
          key={key}
          color='secondary'
          size='medium'
          label={`${capitalize(key)}: ${appliedFilters[key]}`}
          onDelete={() => handleDelete(key)}
        />
      )
    })

  const renderFilterInputs = () => (
    <FilterInputContainer>
      {filterInputFields.map(
        ({ label, fieldId, dropdown, placeholder, value, dropdownItems }) => (
          <FilterInputs
            display='flex'
            justifyContent='space-between'
            alignItems='center'
            key={label}>
            <FilterLabel>{label}</FilterLabel>
            <CustomInput
              dropdown={dropdown}
              name={fieldId}
              placeholder={placeholder}
              dropdownItems={dropdownItems}
              value={value}
              onChange={handleInputChange}
              classesProp={
                !dropdown
                  ? {
                      root: getInputRootStyles(theme),
                      input: getInputStyles(theme),
                    }
                  : {
                      dropdownInput: { root: getDropdownInputStyles() },
                      innerInput: {
                        root: { height: 35 },
                        input: getInputStyles(theme),
                      },
                    }
              }
            />
          </FilterInputs>
        )
      )}
    </FilterInputContainer>
  )

  const renderFilterButtons = () => (
    <FilterButtonContainer display='flex' justifyContent='flex-end'>
      <Box>
        <StyledFilterButton color='secondary' onClick={onCancelClick}>
          Cancel
        </StyledFilterButton>
      </Box>
      <FilterButtonContainer display='flex' justifyContent='flex-end'>
        <Button
          color='secondary'
          disabled={Object.values(filterInputs).every(f => f === '')}
          onClick={clearAllFilters}>
          Clear Filters
        </Button>
      </FilterButtonContainer>
      <Box>
        <Button
          onClick={onApplyFilterClick}
          disabled={Object.values(filterInputs).every(f => f === '')}
          sx={{ marginRight: 16 }}
          color='primary'>
          Apply filters
        </Button>
      </Box>
    </FilterButtonContainer>
  )

  return (
    <Fragment>
      <FilterIconContainer onClick={handleClick}>
        <StyledFilterListIcon />
      </FilterIconContainer>
      <CustomPopover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
        sx={{
          maxWidth: 435,
          '@media (max-width:465px)': {
            width: 340,
          },
        }}>
        <StyledPopoverContent>
          <FilterCaption>
            {Object.values(appliedFilters).some(f => !!f)
              ? renderChipInputs()
              : 'Add Filters...'}
          </FilterCaption>
          {renderFilterInputs()}
          {renderFilterButtons()}
        </StyledPopoverContent>
      </CustomPopover>
    </Fragment>
  )
}
