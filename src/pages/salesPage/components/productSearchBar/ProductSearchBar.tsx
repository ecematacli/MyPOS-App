import React, { Fragment } from 'react';

import { Product } from '../../../../redux/products/types';
import useSearchInput from './useSearchBarState';
import useProductDialogState from './useProductDialogState';
import QuickProductAdd from '../quickProductAdd/QuickProductAdd';
import AutoCompleteProductSearchBar from '../../../../common/components/autoCompleteProductSearchBar';

import styles from './styles';
interface SearchBarProps {
  addProduct: (product: Product) => void;
}

const ProductSearchBar: React.FC<SearchBarProps> = ({ addProduct }) => {
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
    <Fragment>
      <AutoCompleteProductSearchBar
        className={classes.searchBarInput}
        open={open}
        onClose={() => {
          setOpen(false);
          setQuery('');
          setSearchResults([]);
        }}
        options={searchResults}
        loading={loading}
        onProductChange={onProductSelect}
        onQueryChange={setQuery}
        query={query}
        productNotFound={productNotFound}
        handleOpenDialog={handleOpenDialog}
        isUsedOnSalesPage
      />
      <QuickProductAdd
        openDialog={openDialog}
        handleCloseDialog={handleCloseDialog}
      />
    </Fragment>
  );
};

export default ProductSearchBar;
