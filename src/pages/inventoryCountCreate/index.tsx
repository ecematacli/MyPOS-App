import React, { useEffect, Fragment, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import { Typography, Divider, Box } from '@mui/material'

import {
  BackArrowIcon,
  CreateInventoryContainer,
  DividerContainer,
  FilterSectionWrapper,
  FiltersContainer,
  IconContainer,
  ImageContainer,
  InfoText,
  StartButton,
  StartCountContainer,
  TitleText,
} from './styles'
import boxes from '../../assets/img/boxes.png'
import { StoreState } from '../../redux/types'
import { Brand } from '../../redux/brands/types'
import { Category } from '../../redux/categories/types'
import { fetchBrands } from '../../redux/brands/brandsActions'
import { fetchCategories } from '../../redux/categories/categoriesActions'
import { NotificationsContext } from '../../contexts/NotificationsContext'
import useInventoryFilterState from './hooks/useInventoryFilterState'
import { getDropdownInputFields } from './components/inventoryCountFilters/getDropdownInputFields'
import InventoryCountTopBar from '../../common/components/inventoryCountTopBar'
import { InventoryCountFilters } from './components/inventoryCountFilters/InventoryCountFilters'

interface Props {
  fetchCategories: () => void
  fetchBrands: () => void
  categories: Category[]
  brands: Brand[]
}

const InventoryCountCreate: React.FC<Props> = ({
  fetchBrands,
  fetchCategories,
  brands,
  categories,
}) => {
  const history = useHistory()

  const { addNotification } = useContext(NotificationsContext)

  const {
    startDate,
    handleStartDateChange,
    countName,
    handleCountNameChange,
    handleDropdownInputChange,
    dropdownInputs,
    createCountBatch,
  } = useInventoryFilterState(brands, categories, addNotification)

  const DROPDOWN_INPUT_FIELDS = getDropdownInputFields(
    brands,
    categories,
    dropdownInputs
  )
  useEffect(() => {
    fetchBrands()
    fetchCategories()
  }, [])

  return (
    <CreateInventoryContainer>
      <InventoryCountTopBar
        title={
          <Fragment>
            <IconContainer
              component='span'
              onClick={() => history.push('/inventory/inventory-count')}>
              <BackArrowIcon />
            </IconContainer>
            <TitleText>Add Inventory Count</TitleText>
          </Fragment>
        }
        inventoryCountActionsPaper={
          <StartCountContainer>
            <InfoText>
              Schedule an inventory count to maintain accurate inventory levels.
            </InfoText>

            <StartButton onClick={createCountBatch}>
              <Typography sx={{ textTransform: 'capitalize', color: 'white' }}>
                Start Count
              </Typography>
            </StartButton>
          </StartCountContainer>
        }
      />
      <FiltersContainer>
        <FilterSectionWrapper>
          <InventoryCountFilters
            startDate={startDate}
            handleStartDateChange={handleStartDateChange}
            handleDropdownInputChange={handleDropdownInputChange}
            countName={countName}
            handleCountNameChange={handleCountNameChange}
            DROPDOWN_INPUT_FIELDS={DROPDOWN_INPUT_FIELDS}
          />
        </FilterSectionWrapper>
      </FiltersContainer>
      <DividerContainer>
        <Divider />
      </DividerContainer>
      <ImageContainer>
        <Box component='img' alt='Boxes' src={boxes} />
      </ImageContainer>
    </CreateInventoryContainer>
  )
}

const mapStateToProps = (state: StoreState) => ({
  brands: state.brands,
  categories: state.categories,
})

export const InventoryCountCreatePage = connect(mapStateToProps, {
  fetchCategories,
  fetchBrands,
})(InventoryCountCreate)
