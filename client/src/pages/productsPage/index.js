import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { fetchProducts } from '../../redux/products/productsActions';
import CustomTable from '../../common/components/customTable/CustomTable';
import ProductDetails from './components/ProductDetails';
import SearchBar from '../../common/components/searchBar/SearchBar';

const ProductsPage = ({ fetchProducts, products }) => {
  useEffect(() => {
    fetchProducts();
  }, []);
  return (
    <div>
      <div style={{ marginTop: 50, paddingLeft: '2rem' }}>
        <SearchBar width="50%" />
      </div>
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
        salesCount={70}
        fetchProducts={fetchProducts}
        component={ProductDetails}
      />
    </div>
  );
};

const mapStateToProps = ({ products: { products, count } }) => ({
  products: Object.values(products),
  count
});

export default connect(mapStateToProps, { fetchProducts })(ProductsPage);
