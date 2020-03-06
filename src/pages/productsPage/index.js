import React, { useEffect, Fragment, useState } from 'react';
import { connect } from 'react-redux';

import { fetchProducts } from '../../redux/products/productsActions';
import { fetchCategories } from '../../redux/categories/categoriesActions';
import { fetchBrands } from '../../redux/brands/brandsActions';
import { loadingSelector } from '../../redux/loading/loadingReducer';
import Loading from '../../common/components/loading/Loading';
import CustomTable from '../../common/components/customTable/CustomTable';
import ProductDetails from './components/productDetails/ProductDetails';
import ProductFilters from './components/productFilters/ProductFilters';

const ProductsPage = ({
  fetchProducts,
  fetchCategories,
  fetchBrands,
  products,
  count,
  ids,
  isFetching
}) => {
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(1);

  const productsInOrder = () => ids.map(productId => products[productId]);

  useEffect(() => {
    fetchProducts();
    fetchCategories();
    fetchBrands();
  }, []);

  return (
    <Fragment>
      <ProductFilters rowsPerPage={rowsPerPage} page={page} />

      {isFetching ? (
        <Loading />
      ) : (
        <Fragment>
          <CustomTable
            tableHeads={[
              {
                label: 'Sku'
              },
              {
                label: 'Product Name'
              },
              {
                label: 'Category'
              },
              {
                label: 'Brand'
              },
              {
                label: 'Price',
                numeric: true
              },
              {
                label: 'Discounted Price',
                numeric: true
              }
            ]}
            rows={productsInOrder()}
            tableType="products"
            rowsPerPage={rowsPerPage}
            setRowsPerPage={setRowsPerPage}
            page={page}
            setPage={setPage}
            count={count}
            fetchProducts={fetchProducts}
            component={ProductDetails}
          />
        </Fragment>
      )}
    </Fragment>
  );
};

const mapStateToProps = state => {
  const {
    products: { products, count, ids }
  } = state;
  return {
    products,
    count,
    ids,
    isFetching: loadingSelector(['FETCH_PRODUCTS'], state)
  };
};

export default connect(mapStateToProps, {
  fetchProducts,
  fetchCategories,
  fetchBrands
})(ProductsPage);
