import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import clsx from 'clsx';
import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';
import {
  TextField,
  InputAdornment,
  CircularProgress,
  Typography
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { Search } from '@material-ui/icons';

import styles from './styles';
import useAutocomplete from '@material-ui/lab/useAutocomplete';

const ProductSearchbar = ({ addProduct }) => {
  const classes = styles();

  const [open, setOpen] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);

  const onProductSelect = product => {
    addProduct(product);
    setQuery('');
    setOpen(false);
    setSearchResults([]);
  };

  const onKeyPress = (e, product) => {
    if (e.key === 'Enter') {
      onProductSelect(product);
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const response = await axios.get(
        `http://localhost:3091/products?q=${query}`
      );
      setSearchResults(response.data);
      setOpen(true);
      setLoading(false);
    };
    query && fetchProducts();
  }, [query]);

  return (
    <Autocomplete
      id="asynchronous-demo"
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      autoComplete
      onClose={() => {
        setOpen(false);
        setSearchResults([]);
      }}
      autoSelect
      filterOptions={p => p}
      getOptionLabel={product => product.name}
      options={searchResults}
      loading={loading}
      disableOpenOnFocus
      freeSolo
      onChange={(e, product) => {
        onProductSelect(product);
      }}
      autoHighlight
      classes={{ inputRoot: classes.inputRoot }}
      renderInput={params => (
        <TextField
          {...params}
          className={classes.productSearchInput}
          classes={{ root: classes.inputRoot }}
          value={query}
          onChange={e => setQuery(e.target.value)}
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
      renderOption={(product, { inputValue }) => {
        const matches = match(product.name, inputValue);
        const parts = parse(product.name, matches);

        return (
          <Fragment>
            <div className={classes.suggestedContainer}>
              {parts.map((part, index) => (
                <span
                  key={index}
                  style={{ fontWeight: part.highlight ? 700 : 400 }}
                >
                  {part.text}
                </span>
              ))}
            </div>
            <Typography>{product.variation}</Typography>
            <Typography>{product.price}</Typography>
          </Fragment>
        );
      }}
    />
  );
};

export default ProductSearchbar;

{
  /* <div className={classes.suggestedLeftSide}>
 <Grid container alignItems="center">
            <Grid item xs>
              {parts.map((part, index) => (
                <div 
                className={classes.suggestedContainer}
                key={part.barcode}
                >
                  <Typography
                    className={clsx(
                      classes.suggestedName,
                      classes.suggestedCommon
                    )}
                    variant="body2"
                  >
                    {part.name} / {part.brand}
                  </Typography>
                </div>
              ))}

            </Grid>
          </Grid>
                  
                  <Typography
                    className={clsx(
                      classes.suggestedName,
                      classes.suggestedVariation
                    )}
                    variant="body2"
                  >
                    {product.variation}
                  </Typography>
                </div>
                <Typography
                  className={clsx(
                    classes.suggestedPrice,
                    classes.suggestedCommon
                  )}
                  variant="body2"
                >
                  &#x20BA;{product.price}
                </Typography> */
}
