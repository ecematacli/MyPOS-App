import React, { useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';

import { fetchProducts } from '../../redux/products/productsActions';
import { fetchCategories } from '../../redux/categories/categoriesActions';
import CustomTable from '../../common/components/customTable/CustomTable';
import ProductDetails from './components/productDetails/ProductDetails';
import ProductFilters from './components/productFilters/ProductFilters';

const ProductsPage = ({ fetchProducts, products, count }) => {
  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);
  return !products ? (
    <CircularProgress color="primary" />
  ) : (
    <Fragment>
      <ProductFilters />
      <CustomTable
        tableHeads={[
          {
            label: 'Sku'
          },
          {
            label: 'Product Name',
            sortLabel: true
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
        products={products}
        salesCount={count}
        fetchProducts={fetchProducts}
        component={ProductDetails}
      />
    </Fragment>
  );
};

const mapStateToProps = ({ products: { products, count } }) => ({
  products: Object.values(products),
  count
});

export default connect(mapStateToProps, {
  fetchProducts,
  fetchCategories
})(ProductsPage);
