import React, { Fragment, useState } from 'react';

import styles from './styles';
import { Product } from '../../../../redux/products/types';
import { NewProductData } from '../../hooks/types';
import useSearchInput from './useSearchBarState';
import QuickProductAdd from '../quickProductAdd/QuickProductAdd';
import AutoCompleteProductSearchBar from '../../../../common/components/autoCompleteProductSearchBar';

interface SearchBarProps {
  addProduct: (product: Product) => void;
  createProduct: (
    productData: NewProductData,
    addNotification: (message: string, severity: string) => void
  ) => Promise<void>;
  inputRef: React.MutableRefObject<HTMLInputElement>;
}

const ProductSearchBar: React.FC<SearchBarProps> = ({
  addProduct,
  createProduct,
  inputRef,
}) => {
  const classes = styles();

  const [openDialog, setOpenDialog] = useState(false);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const {
    open,
    setOpen,
    searchResults,
    setSearchResults,
    loading,
    query,
    setQuery,
    onProductSelect,
    productNotFound,
  } = useSearchInput(addProduct);

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
        inputRef={inputRef}
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
