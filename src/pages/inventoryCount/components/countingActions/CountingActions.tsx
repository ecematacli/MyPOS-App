import React, { Fragment } from 'react';
import {
  Button,
  Typography,
  OutlinedInput,
  Grid,
  Checkbox
} from '@material-ui/core';

import styles from './styles';
import history from '../../../../history';
import AutoCompleteSearchBar from '../../../../common/components/autoCompleteProductSearchBar';

const InventoryCountDetail = () => {
  const classes = styles();

  const renderCountActions = () => (
    <div className={classes.countInputContainer}>
      <OutlinedInput
        classes={{ root: classes.inputRoot, input: classes.input }}
        color="secondary"
        value={1}
      />
      <Button
        classes={{ root: classes.countBtnRoot }}
        className={classes.countBtn}
      >
        <Typography className={classes.btnText}>Count</Typography>
      </Button>
      <Checkbox disableRipple />
      <Typography className={classes.modeText}>Quick-scan mode</Typography>
    </div>
  );

  return (
    <div className={classes.countingContainer}>
      <Grid justify="center" alignItems="center" container>
        <Grid item xl={6} lg={6} md={6}>
          <AutoCompleteSearchBar className={classes.searchBarInput} />
        </Grid>
        <Grid item xl={4} lg={4} md={4}>
          <div className={classes.inputDiv}>{renderCountActions()}</div>
        </Grid>
      </Grid>
    </div>
  );
};

export default InventoryCountDetail;

{
  /* <div className={classes.pauseBtnDiv}>
<Button className={classes.pauseBtn}>
  <Typography
    onClick={() => history.push('/inventory/count')}
    className={classes.btnText}
  >
    Pause
  </Typography>
</Button>
</div> */
}
