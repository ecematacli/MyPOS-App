import React from 'react';
import { CircularProgress, InputAdornment, TextField } from '@material-ui/core';
import { Search } from '@material-ui/icons';

import styles from './styles';

const SearchBar = ({
  loading,
  nonExistentProduct,
  component: Component,
  ...props
}) => {
  const classes = styles(props);

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
              {nonExistentProduct ? <Component /> : <Search />}
            </InputAdornment>
          </React.Fragment>
        )
      }}
    />
  );
};

export default SearchBar;
