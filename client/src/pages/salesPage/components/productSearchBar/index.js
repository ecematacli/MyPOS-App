import React from 'react';
import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';
import Autocomplete from '@material-ui/lab/Autocomplete';

import styles from './styles';
import useSearchInput from './hooks/useSearchBarState';
import SearchBar from '../../../../common/components/searchBar/SearchBar';
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
    noProduct
  } = useSearchInput(addProduct);

  return (
    <Autocomplete
      classes={{ root: classes.autoComplete }}
      id="asynchronous-demo"
      open={open}
      // onOpen={() => {
      //   setOpen(true);
      // }}
      autoComplete
      onClose={() => {
        setOpen(false);
        // setQuery('');
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
      classes={{ inputRoot: classes.inputRoot }}
      renderInput={params => (
        <SearchBar
          {...params}
          nonExistentProduct={noProduct}
          component={QuickProductAdd}
          width="95%"
          value={query}
          onChange={e => setQuery(e.target.value)}
          loading={loading}
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
  );
};

export default ProductSearchbar;
