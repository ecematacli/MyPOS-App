import React from 'react';
import TextField from '@material-ui/core/TextField';

import styles from './styles';
import { CircularProgress, InputAdornment } from '@material-ui/core';
import { Search } from '@material-ui/icons';

const SearchBar = ({ loading, ...props }) => {
  const classes = styles(props);
  console.log(loading);
  return (
    <TextField
      {...props}
      color="secondary"
      variant="outlined"
      label="Search for products..."
      className={classes.input}
      classes={{ root: classes.inputRoot }}
      InputProps={{
        ...props.InputProps,
        endAdornment: (
          <React.Fragment>
            {loading ? <CircularProgress color="inherit" size={20} /> : null}
            <InputAdornment className={classes.searchIconHolder} position="end">
              <Search />
            </InputAdornment>
          </React.Fragment>
        )
      }}
    />
  );
};

export default SearchBar;
