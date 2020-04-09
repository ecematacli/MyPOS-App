import React from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { CircularProgress, InputAdornment, TextField } from '@material-ui/core';
import { Search } from '@material-ui/icons';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';

import styles from './styles';
import { Product } from '../../../redux/products/types';
import { currencyFormatter } from '../../utils';

interface Props {
  open: boolean;
  onClose: () => void;
  options: Product[] | [];
  loading: boolean;
  onProductChange: (product: Product) => void;
  query: string;
  onQueryChange: React.Dispatch<React.SetStateAction<string>>;
  isUsedOnSalesPage?: boolean;
  productNotFound?: boolean;
  handleOpenDialog: () => void;
  className?: any;
  inputRef?: React.Ref<HTMLInputElement>;
}

const AutoCompleteProductSearchBar: React.FC<Props> = (props) => {
  const classes = styles(props);
  const {
    open,
    onClose,
    options,
    loading,
    onProductChange,
    query,
    onQueryChange,
    isUsedOnSalesPage,
    productNotFound,
    handleOpenDialog,
    inputRef,
    ...otherProps
  } = props;

  return (
    <Autocomplete
      data-testid="auto-suggest"
      open={open}
      autoComplete
      onClose={onClose}
      filterOptions={(p) => p}
      getOptionLabel={(product: Product) => product.name}
      options={options}
      loading={loading}
      noOptionsText="No product"
      className={classes.autoSuggest}
      clearOnEscape
      onChange={(e: React.ChangeEvent<HTMLInputElement>, product: Product) =>
        product && onProductChange(product)
      }
      inputValue={query}
      autoHighlight
      ListboxProps={{ 'data-testid': 'list-box' }}
      renderInput={(params) => (
        <TextField
          {...params}
          {...otherProps}
          inputRef={inputRef}
          placeholder="Search for products..."
          color="secondary"
          variant="outlined"
          classes={{ root: classes.inputRoot }}
          value={query}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            onQueryChange(e.target.value)
          }
          InputProps={{
            ...params.InputProps,
            classes: {
              root: classes.cssOutlinedInput,
              focused: classes.cssFocused,
              notchedOutline: classes.notchedOutline,
            },
            endAdornment: (
              <React.Fragment>
                {loading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                <InputAdornment
                  className={classes.searchIconHolder}
                  position="end"
                >
                  {isUsedOnSalesPage && productNotFound ? (
                    <AddCircleIcon
                      className={classes.quickAddIcon}
                      onClick={handleOpenDialog}
                    />
                  ) : (
                    <Search />
                  )}
                </InputAdornment>
              </React.Fragment>
            ),
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
                  (
                    part: { text: string; highlight: boolean },
                    index: number
                  ) => (
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
    />
  );
};

export default AutoCompleteProductSearchBar;
