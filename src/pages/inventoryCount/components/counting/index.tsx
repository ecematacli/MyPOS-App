import React from 'react';
import { Grid } from '@material-ui/core';

import styles from './styles';
import AutoCompleteSearchBar from '../../../../common/components/autoCompleteSearchBar';
import LastCountedItems from '../lastCountedItems/LastCountedItems';

const Counting = () => {
  const classes = styles();
  return (
    <Grid container>
      <Grid align="center" item xs={9}>
        <div
          style={{
            width: '75%',
            marginTop: 100,
            marginLeft: 30
          }}
        >
          <AutoCompleteSearchBar />
        </div>
      </Grid>
      <Grid item xs={3}>
        <LastCountedItems />
      </Grid>
    </Grid>
  );
};

export default Counting;
