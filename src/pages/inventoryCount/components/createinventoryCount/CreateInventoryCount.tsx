import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Typography, Button, Grid, Divider } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import styles from './styles';
import history from '../../../../history';
import boxes from '../../../../assets/img/boxes.png';
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
      <span
        className={classes.iconDiv}
        onClick={() => history.push('/inventory/count')}
      >
        <ArrowBackIcon className={classes.backArrow} />
      </span>
      <Typography className={classes.titleText}>Add Inventory Count</Typography>
    </div>
  );

  const renderCountActionPaper = () => (
    <div className={classes.actionBtnDiv}>
      <Button className={classes.exitBtn}>
        <Typography className={classes.btnText}>Save & Exit</Typography>
      </Button>
      <Button className={classes.startBtn}>
        <Typography className={classes.btnText}>Start Count</Typography>
      </Button>
    </div>
  );

  return (
    <div className={classes.createInvContainer}>
      <Grid justify="center" container>
        <div className={classes.titleGrid}>
          <Grid item xs={12}>
            {renderTitle()}
          </Grid>
        </div>
      </Grid>
      <div className={classes.startCountContainer}>
        <Grid
          container
          justify="center"
          alignItems="center"
          className={classes.startCountPaper}
        >
          <Grid item xl={9} lg={9}>
            <Typography className={classes.infoText}>
              Schedule an inventory count to maintain accurate inventory levels.
            </Typography>
          </Grid>
          <Grid item xl={3} lg={3}>
            {renderCountActionPaper()}
          </Grid>
        </Grid>
      </div>
      <Grid container>
        <InventoryCountFilters brands={brands} categories={categories} />
      </Grid>
      <div className={classes.dividerDiv}>
        <Divider className={classes.divider} />
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
