import React from 'react';
import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';
import { TextField, InputAdornment, CircularProgress } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { Search } from '@material-ui/icons';

import styles from './styles';
import useSearchInput from './hooks/useSearchBarState';

const ProductSearchbar = ({ addProduct }) => {
  const classes = styles();
  const {
    open,
    setOpen,
    searchResults,
    setSearchResults,
    loading,
    query,
    setQuery,
    onProductSelect
  } = useSearchInput(addProduct);

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
        setQuery('');
        setSearchResults([]);
      }}
      filterOptions={p => p}
      getOptionLabel={product => product.name}
      options={searchResults}
      loading={loading}
      disableOpenOnFocus
      clearOnEscape
      onChange={(e, product) => product && onProductSelect(product)}
      inputValue={query}
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
        const matches = match(product.name || product.variation, inputValue);
        const parts = parse(product.name || product.variation, matches);

        return (
          <div className={classes.suggestionContainer}>
            <div className={classes.suggestionContent}>
              <div className={classes.suggestionGroup}>
                {parts.map((part, index) => (
                  <span
                    key={index}
                    style={{ fontWeight: part.highlight ? 700 : 400 }}
                  >
                    {part.text}
                  </span>
                ))}

                <span> / {product.variation}</span>
              </div>
              <span> {product.sku}</span>
            </div>
            <div>
              <span> &#x20BA; {product.price}</span>
            </div>
          </div>
        );
      }}
    />
  );
};

export default ProductSearchbar;
