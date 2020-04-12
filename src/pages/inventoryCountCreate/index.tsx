import React, { useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import { Typography, Button, Divider } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import styles from './styles';
import boxes from '../../assets/img/boxes.png';
import history from '../../history';
import { StoreState } from '../../redux/types';
import { Brand } from '../../redux/brands/types';
import { Category } from '../../redux/categories/types';
import { fetchBrands } from '../../redux/brands/brandsActions';
import { fetchCategories } from '../../redux/categories/categoriesActions';
import useInventoryFilterState from './hooks/useInventoryFilterState';
import { getDropdownInputFields } from './components/inventoryCountFilters/getDropdownInputFields';
import InventoryCountFilters from './components/inventoryCountFilters/InventoryCountFilters';

interface Props {
  fetchCategories: () => void;
  fetchBrands: () => void;
  categories: Category[];
  brands: Brand[];
}

const CreateInventoryCount: React.FC<Props> = ({
  fetchBrands,
  fetchCategories,
  brands,
  categories
}) => {
  const classes = styles();
  const {
    startDate,
    handleStartDateChange,
    countName,
    handleCountNameChange,
    handleDropdownInputChange,
    dropdownInputs,
    createCountBatches
  } = useInventoryFilterState(brands, categories);

  const DROPDOWN_INPUT_FIELDS = getDropdownInputFields(
    brands,
    categories,
    dropdownInputs
  );
  useEffect(() => {
    fetchBrands();
    fetchCategories();
  }, []);

  const onStartCountClick = () => {
    createCountBatches();
  };

  const renderCreateInvPaper = () => (
    <Fragment>
      <div className={classes.titleDiv}>
        <span
          className={classes.iconDiv}
          onClick={() => history.push('/inventory/count')}
        >
          <ArrowBackIcon className={classes.backArrow} />
        </span>
        <Typography className={classes.titleText}>
          Add Inventory Count
        </Typography>
      </div>
      <div className={classes.startCountContainer}>
        <div className={classes.startCountDiv}>
          <Typography className={classes.infoText}>
            Schedule an inventory count to maintain accurate inventory levels.
          </Typography>
          <Button className={classes.exitBtn}>
            <Typography className={classes.btnText}>Save & Exit</Typography>
          </Button>
          <Button onClick={onStartCountClick} className={classes.startBtn}>
            <Typography className={classes.btnText}>Start Count</Typography>
          </Button>
        </div>
      </div>
    </Fragment>
  );

  return (
    <div className={classes.createInvContainer}>
      {renderCreateInvPaper()}
      <InventoryCountFilters
        startDate={startDate}
        handleStartDateChange={handleStartDateChange}
        handleDropdownInputChange={handleDropdownInputChange}
        countName={countName}
        handleCountNameChange={handleCountNameChange}
        DROPDOWN_INPUT_FIELDS={DROPDOWN_INPUT_FIELDS}
      />
      <div className={classes.dividerDiv}>
        <Divider />
      </div>
      <div className={classes.imageDiv}>
        <img className={classes.boxesImage} src={boxes} />
      </div>
    </div>
  );
};

const mapStateToProps = (state: StoreState) => ({
  brands: state.brands,
  categories: state.categories
});

export default connect(mapStateToProps, { fetchCategories, fetchBrands })(
  CreateInventoryCount
);
