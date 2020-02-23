import React from 'react';
import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { CircularProgress, InputAdornment, TextField } from '@material-ui/core';
import { Search } from '@material-ui/icons';
import AddCircleIcon from '@material-ui/icons/AddCircle';

import styles from './styles';
import useSearchInput from './useSearchBarState';
import useProductDialogState from './useProductDialogState';
import QuickProductAdd from '../quickProductAdd/QuickProductAdd';
import { currencyFormatter } from '../../../../common/utils';

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
    onProductSelect,
    productNotFound
  } = useSearchInput(addProduct);

  const {
    openDialog,
    handleOpenDialog,
    handleCloseDialog
  } = useProductDialogState();
  return (
    <div>
      <Autocomplete
        id="asynchronous-demo"
        open={open}
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
        noOptionsText="No product"
        clearOnEscape
        onChange={(e, product) => {
          product && onProductSelect(product);
        }}
        inputValue={query}
        autoHighlight
        renderInput={params => (
          <TextField
            {...params}
            placeholder="Search for products..."
            color="secondary"
            variant="outlined"
            className={classes.searchBarInput}
            classes={{ root: classes.inputRoot }}
            value={query}
            onChange={e => setQuery(e.target.value)}
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
                    {productNotFound ? (
                      <AddCircleIcon
                        className={classes.quickAddIcon}
                        onClick={handleOpenDialog}
                      />
                    ) : (
                      <Search />
                    )}
                  </InputAdornment>
                </React.Fragment>
              )
            }}
          />
        )}
        renderOption={(product, { inputValue }) => {
          const productFields =
            product.name || product.variation || product.sku;
          const matches = match(productFields, inputValue);
          const parts = parse(productFields, matches);

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
                <span>
                  {product.price ? currencyFormatter(product.price) : '-'}
                </span>
              </div>
            </div>
          );
        }}
      />
      <QuickProductAdd
        openDialog={openDialog}
        handleCloseDialog={handleCloseDialog}
        handleOpenDialog={handleOpenDialog}
      />
    </div>
  );
};

export default ProductSearchbar;
