import React, { useEffect, Fragment, useState } from 'react';
import { connect } from 'react-redux';

import { ActionTypes, StoreState } from '../../redux/types';
import { Product } from '../../redux/products/types';
import { Category } from '../../redux/categories/types';
import { Brand } from '../../redux/brands/types';
import { fetchProducts } from '../../redux/products/productsActions';
import { fetchCategories } from '../../redux/categories/categoriesActions';
import { fetchBrands } from '../../redux/brands/brandsActions';
import { loadingSelector } from '../../redux/loading/loadingReducer';
import { TABLE_HEADS } from './tableHeads';
import { getFilterInputFields } from './getFilterInputFields';
import useProductFilters from './hooks/useProductFilters';
import Loading from '../../common/components/loading';
import CustomTable from '../../common/components/tables/customTable';
import ProductDetails from './components/productDetails/ProductDetails';
import ProductFilters from './components/productFilters/ProductFilters';
import { findMatchedFields } from '../../common/utils';

interface ProductsProps {
  fetchProducts: (
    page: number,
    rowsPerPage: number,
    categoryId?: number,
    brandId?: number,
    searchQuery?: string
  ) => void;
  fetchCategories: () => void;
  fetchBrands: () => void;
  products: { [id: string]: Product };
  count: number;
  ids: number[];
  categories: Category[];
  brands: Brand[];
  isFetching: boolean;
}

const ProductsPage: React.FC<ProductsProps> = ({
  fetchProducts,
  fetchCategories,
  fetchBrands,
  products,
  count,
  ids,
  isFetching,
  categories,
  brands
}) => {
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(1);

  const filterStateArgs = {
    brands,
    categories,
    setPage,
    page,
    rowsPerPage,
    fetchProducts
  };

  const {
    filterInputs,
    appliedFilters,
    cancelClick,
    clearAllFilters,
    handleInputChange,
    handleApplyFilterClick,
    handleDelete
  } = useProductFilters(filterStateArgs);

  const FILTER_INPUT_FIELDS = getFilterInputFields(
    brands,
    categories,
    filterInputs
  );

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    newPage: number
  ) => {
    //To adapt 0-based page of MUI pagination component 1 is added whilst 1 is subtracted for page prop
    if (newPage + 1 < 0) return;
    setPage(newPage + 1);

    fetchProducts(
      newPage + 1,
      rowsPerPage,
      findMatchedFields(categories, filterInputs.category).id,
      findMatchedFields(brands, filterInputs.brand).id,
      filterInputs.searchQuery
    );
  };

  const handleChangeRowsPerPage = ({
    target: { value }
  }: React.ChangeEvent<HTMLInputElement>) => {
    const numValue = parseInt(value);
    setRowsPerPage(numValue);

    if (Math.ceil(count / rowsPerPage) === page) {
      setPage(1);
    }

    fetchProducts(
      page,
      numValue,
      findMatchedFields(categories, filterInputs.category).id,
      findMatchedFields(brands, filterInputs.brand).id,
      filterInputs.searchQuery
    );
  };

  const productsInOrder = () =>
    ids.map((productId: number) => products[productId]);

  useEffect(() => {
    fetchProducts(page, rowsPerPage);
    fetchCategories();
    fetchBrands();
  }, []);

  return (
    <div style={{ padding: 24 }}>
      <ProductFilters
        filterInputs={filterInputs}
        appliedFilters={appliedFilters}
        cancelClick={cancelClick}
        clearAllFilters={clearAllFilters}
        handleInputChange={handleInputChange}
        filterInputFields={FILTER_INPUT_FIELDS}
        handleApplyFilterClick={handleApplyFilterClick}
        handleDelete={handleDelete}
      />
      {isFetching ? (
        <Loading />
      ) : (
        <Fragment>
          <CustomTable
            tableHeads={TABLE_HEADS}
            tableType="products"
            rows={{ type: 'products', products: productsInOrder() }}
            page={page}
            rowsPerPage={rowsPerPage}
            handleChangePage={handleChangePage}
            handleChangeRowsPerPage={handleChangeRowsPerPage}
            count={count}
            component={ProductDetails}
          />
        </Fragment>
      )}
    </div>
  );
};

const mapStateToProps = (state: StoreState) => {
  const {
    products: { products, count, ids },
    categories,
    brands
  } = state;
  return {
    products,
    count,
    ids,
    categories,
    brands,
    isFetching: loadingSelector(ActionTypes.FETCH_PRODUCTS, state)
  };
};

export default connect(mapStateToProps, {
  fetchProducts,
  fetchCategories,
  fetchBrands
})(ProductsPage);
