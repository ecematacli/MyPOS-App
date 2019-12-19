import React, { useState, useEffect } from 'react';
import axios from 'axios';
import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';
import {
  TextField,
  InputAdornment,
  CircularProgress,
  Grid,
  Typography
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { Search } from '@material-ui/icons';

import styles from './styles';

const ProductSearchbar = () => {
  const classes = styles();

  const [open, setOpen] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [inputVal, setInputVal] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const response = await axios.get(
        `http://localhost:3091/products?q=${inputVal}`
      );
      setSearchResults(response.data);
      setOpen(true);
      setLoading(false);
    };

    inputVal && fetchProducts();
  }, [inputVal]);

  return (
    <Autocomplete
      id="asynchronous-demo"
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
        setSearchResults([]);
      }}
      filterOptions={p => p}
      getOptionLabel={product => product.name}
      options={searchResults}
      loading={loading}
      disableOpenOnFocus
      style={{ paddingRight: 8 }}
      classes={{ inputRoot: classes.inputRoot }}
      renderInput={params => (
        <TextField
          {...params}
          className={classes.productSearchInput}
          classes={{ root: classes.inputRoot }}
          value={inputVal}
          onChange={e => setInputVal(e.target.value)}
          label="Search for products..."
          color="secondary"
          variant="outlined"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                <InputAdornment
                  className={classes.searchIconHolder}
                  position="end"
                >
                  <Search />
                </InputAdornment>
              </React.Fragment>
            )
          }}
        />
      )}
      renderOption={product => {
        console.log(product);
        return (
          <Grid container alignItems="center">
            <Grid item xs>
              <Typography variant="body2" color="textSecondary">
                {inputVal}
              </Typography>
            </Grid>
          </Grid>
        );
      }}
    />
  );
};

export default ProductSearchbar;
