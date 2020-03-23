import React, { Fragment } from 'react';

import styles from './styles';
import { Product } from '../../../../redux/products/types';
import { NewProductData } from '../../hooks/types';
import useSearchInput from './useSearchBarState';
import useProductDialogState from './useProductDialogState';
import QuickProductAdd from '../quickProductAdd/QuickProductAdd';
import AutoCompleteProductSearchBar from '../../../../common/components/autoCompleteProductSearchBar';

interface SearchBarProps {
  addProduct: (product: Product) => void;
  createProduct: (
    productData: NewProductData,
    addNotification: (message: string, severity: string) => void
  ) => Promise<void>;
}

const ProductSearchBar: React.FC<SearchBarProps> = ({
  addProduct,
  createProduct
}) => {
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
        createProduct={createProduct}
      />
    </Fragment>
  );
};

export default ProductSearchBar;
