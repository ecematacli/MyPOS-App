import React, { Fragment } from 'react';

import { Product } from '../../../../redux/products/types';
import useSearchInput from './useSearchBarState';
import useProductDialogState from './useProductDialogState';
import QuickProductAdd from '../quickProductAdd/QuickProductAdd';
import AutoCompleteSearchBar from '../../../../common/components/autoCompleteSearchBar';

interface SearchBarProps {
  addProduct: (product: Product) => void;
}

const ProductSearchBar: React.FC<SearchBarProps> = ({ addProduct }) => {
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
      <AutoCompleteSearchBar
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
