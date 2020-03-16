import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { Paper, Typography, Button } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import styles from './styles';
import history from '../../../../history';
import { StoreState } from '../../../../redux/types';
import { Brand } from '../../../../redux/brands/types';
import { Category } from '../../../../redux/categories/types';
import { fetchBrands } from '../../../../redux/brands/brandsActions';
import { fetchCategories } from '../../../../redux/categories/categoriesActions';
import InventoryCountFilters from '../inventoryCountFilters/InventoryCountFilters';

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

  useEffect(() => {
    fetchBrands();
    fetchCategories();
  }, []);

  const renderTitle = () => (
    <div className={classes.titleDiv}>
      <div
        className={classes.iconDiv}
        onClick={() => history.push('/inventory/count')}
      >
        <ArrowBackIcon className={classes.backArrow} />
      </div>
      <Typography className={classes.titleText}>Add Inventory Count</Typography>
    </div>
  );

  const renderCountActionPaper = () => (
    <Paper className={classes.startCountPaper}>
      <div className={classes.infoDiv}>
        <Typography className={classes.infoText}>
          Schedule a full or partial inventory count to maintain accurate
          inventory levels.
        </Typography>
      </div>
      <div className={classes.actionBtnDiv}>
        <Button className={classes.exitBtn}>
          <Typography className={classes.btnText}>Save&Exit</Typography>
        </Button>
        <Button className={classes.startBtn}>
          <Typography className={classes.btnText}>Start Count</Typography>
        </Button>
      </div>
    </Paper>
  );

  return (
    <div className={classes.inventoryCountContainer}>
      {renderTitle()}
      {renderCountActionPaper()}
      <InventoryCountFilters brands={brands} categories={categories} />
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
