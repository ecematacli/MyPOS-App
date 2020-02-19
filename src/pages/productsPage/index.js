import React, { useEffect, Fragment, useState } from 'react';
import { connect } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';

import { fetchProducts } from '../../redux/products/productsActions';
import { fetchCategories } from '../../redux/categories/categoriesActions';
import { fetchBrands } from '../../redux/brands/brandsActions';
import CustomTable from '../../common/components/customTable/CustomTable';
import ProductDetails from './components/productDetails/ProductDetails';
import ProductFilters from './components/productFilters/ProductFilters';

const ProductsPage = ({
  fetchProducts,
  fetchCategories,
  fetchBrands,
  products,
  count,
  ids
}) => {
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(1);

  const productsInOrder = () => ids.map(productId => products[productId]);

  useEffect(() => {
    fetchProducts();
    fetchCategories();
    fetchBrands();
  }, []);
  return !products ? (
    <CircularProgress color="primary" />
  ) : (
    <Fragment>
      <ProductFilters rowsPerPage={rowsPerPage} page={page} />
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
  );
};

const mapStateToProps = ({ products: { products, count, ids } }) => ({
  products,
  count,
  ids
});

export default connect(mapStateToProps, {
  fetchProducts,
  fetchCategories,
  fetchBrands
})(ProductsPage);
