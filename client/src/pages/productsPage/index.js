import React, { useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import FilterListIcon from '@material-ui/icons/FilterList';

import styles from './styles';
import { fetchProducts } from '../../redux/products/productsActions';
import CustomTable from '../../common/components/customTable/CustomTable';
import ProductDetails from './components/productDetails/ProductDetails';
import SearchBar from '../../common/components/searchBar/SearchBar';

const ProductsPage = ({ fetchProducts, products }) => {
  const classes = styles();
  useEffect(() => {
    fetchProducts();
  }, []);
  return (
    <Fragment>
      {/* <div style={{ marginTop: 50, paddingLeft: '2rem' }}>
        <SearchBar width="80%" />
      </div> */}
      <div className={classes.filterIconContainer}>
        <div className={classes.filterDiv}>
          <FilterListIcon className={classes.filterIcon} />
        </div>
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
    </Fragment>
  );
};

const mapStateToProps = ({ products: { products, count } }) => ({
  products: Object.values(products),
  count
});

export default connect(mapStateToProps, { fetchProducts })(ProductsPage);
