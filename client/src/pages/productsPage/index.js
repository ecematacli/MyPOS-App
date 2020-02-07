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
  ids,
  pr
}) => {
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(1);

  console.log('ids are:', ids);
  console.log('products are:', products);
  console.log('pr is', pr);

  const productsInOrder = () => {
    return ids.map(productId => {
      return pr[productId];
    });
  };

  console.log(productsInOrder());

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
  pr: products,
  products: Object.values(products),
  count,
  ids
});

export default connect(mapStateToProps, {
  fetchProducts,
  fetchCategories,
  fetchBrands
})(ProductsPage);
