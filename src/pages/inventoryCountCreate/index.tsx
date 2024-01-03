import React, { useEffect, Fragment, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import { Typography, Button, Divider } from '@mui/material'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'

import styles from './styles'
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
import InventoryCountFilters from './components/inventoryCountFilters/InventoryCountFilters'

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
  const classes = styles()

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

  const renderInventoryCountTopBar = () => (
    <Fragment>
      <InventoryCountTopBar
        title={
          <Fragment>
            <span
              className={classes.iconDiv}
              onClick={() => history.push('/inventory/inventory-count')}>
              <ArrowBackIcon className={classes.backArrow} />
            </span>
            <Typography className={classes.titleText}>
              Add Inventory Count
            </Typography>
          </Fragment>
        }
        inventoryCountActionsPaper={
          <div className={classes.startCountDiv}>
            <Typography className={classes.infoText}>
              Schedule an inventory count to maintain accurate inventory levels.
            </Typography>
            <div>
              <Button onClick={createCountBatch} className={classes.startBtn}>
                <Typography className={classes.btnText}>Start Count</Typography>
              </Button>
            </div>
          </div>
        }
      />
    </Fragment>
  )

  const renderInventoryCountFilters = () => (
    <div className={classes.filtersContainer}>
      <div className={classes.filterSectionWrapper}>
        <InventoryCountFilters
          startDate={startDate}
          handleStartDateChange={handleStartDateChange}
          handleDropdownInputChange={handleDropdownInputChange}
          countName={countName}
          handleCountNameChange={handleCountNameChange}
          DROPDOWN_INPUT_FIELDS={DROPDOWN_INPUT_FIELDS}
        />
      </div>
    </div>
  )

  return (
    <div className={classes.createInvContainer}>
      {renderInventoryCountTopBar()}
      {renderInventoryCountFilters()}
      <div className={classes.dividerDiv}>
        <Divider />
      </div>
      <div className={classes.imageDiv}>
        <img className={classes.boxesImage} src={boxes} />
      </div>
    </div>
  )
}

const mapStateToProps = (state: StoreState) => ({
  brands: state.brands,
  categories: state.categories,
})

export default connect(mapStateToProps, { fetchCategories, fetchBrands })(
  InventoryCountCreate
)
