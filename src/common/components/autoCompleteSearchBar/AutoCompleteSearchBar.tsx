import React from 'react';
import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { CircularProgress, InputAdornment, TextField } from '@material-ui/core';
import { Search } from '@material-ui/icons';
import AddCircleIcon from '@material-ui/icons/AddCircle';

import styles from './styles';
import { Product } from '../../../redux/products/types';
import { currencyFormatter } from '../../utils';

const AutoCompleteSearchBar = ({
  open,
  onClose,
  options,
  loading,
  onProductChange,
  onQueryChange,
  inputValue,
  productNotFound,
  handleOpenDialog,
  salesInput
}) => {
  const classes = styles();
  <Autocomplete
    id="asynchronous-demo"
    open={open}
    autoComplete
    onClose={onClose}
    filterOptions={p => p}
    getOptionLabel={(product: Product) => product.name}
    options={options}
    loading={loading}
    disableOpenOnFocus
    noOptionsText="No product"
    clearOnEscape
    onChange={(e: React.ChangeEvent<HTMLInputElement>, product: Product) =>
      product && onProductChange(product)
    }
    inputValue={inputValue}
    autoHighlight
    renderInput={params => (
      <TextField
        {...params}
        placeholder="Search for products..."
        color="secondary"
        variant="outlined"
        className={classes.searchBarInput}
        classes={{ root: classes.inputRoot }}
        value={inputValue}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          onQueryChange(e.target.value)
        }
        InputProps={{
          ...params.InputProps,
          endAdornment: (
            <React.Fragment>
              {loading ? <CircularProgress color="inherit" size={20} /> : null}
              <InputAdornment
                className={classes.searchIconHolder}
                position="end"
              >
                {salesInput && productNotFound ? (
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
    renderOption={(product: Product, { inputValue }) => {
      const productFields = product.name || product.variation || product.sku;
      const matches = match(productFields, inputValue);
      const parts = parse(productFields, matches);

      return (
        <div className={classes.suggestionContainer}>
          <div>
            <div className={classes.suggestionGroup}>
              {parts.map(
                (part: { text: string; highlight: boolean }, index: number) => (
                  <span
                    key={index}
                    style={{ fontWeight: part.highlight ? 700 : 400 }}
                  >
                    {part.text}
                  </span>
                )
              )}
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
  />;
};

export default AutoCompleteSearchBar;
