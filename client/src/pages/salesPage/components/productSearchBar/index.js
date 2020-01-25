import React from 'react';
import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { CircularProgress, InputAdornment, TextField } from '@material-ui/core';
import { Search } from '@material-ui/icons';
import AddCircleIcon from '@material-ui/icons/AddCircle';

import styles from './styles';
import useSearchInput from './hooks/useSearchBarState';
import useProductDialogState from './hooks/useProductDialogState';
import QuickProductAdd from '../../components/quickProductAdd/QuickProductAdd';
import { currencyFormatter } from '../../../../common/utils/currencyFormatter';

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
    <>
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
            color="secondary"
            variant="outlined"
            label="Search for products..."
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
                <span>{currencyFormatter(product.price)}</span>
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
    </>
  );
};

export default ProductSearchbar;
