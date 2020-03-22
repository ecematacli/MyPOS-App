import React, { useState } from 'react';
import { Button, Typography, OutlinedInput, Checkbox } from '@material-ui/core';

import styles from './styles';
import AutoCompleteSearchBar from '../../../../common/components/autoCompleteProductSearchBar';

const InventoryCountDetail = () => {
  const classes = styles();
  const [checked, setChecked] = useState(false);

  const handleCheckedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(e.target.checked);
  };

  const renderCountInput = () => (
    <div className={classes.countInputAction}>
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
    </div>
  );

  return (
    <div className={classes.countingContainer}>
      <AutoCompleteSearchBar className={classes.searchBar} />
      {!checked && renderCountInput()}
      <div className={classes.countInputAction}>
        <Checkbox
          color="primary"
          checked={checked}
          onChange={handleCheckedChange}
          disableRipple
        />
        <Typography className={classes.modeText}>Quick-scan mode</Typography>
      </div>
    </div>
  );
};

export default InventoryCountDetail;
