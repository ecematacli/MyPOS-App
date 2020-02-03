import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { Popover, Button, Chip } from '@material-ui/core';
import FilterListIcon from '@material-ui/icons/FilterList';

import styles from './styles';
import { fetchProducts } from '../../../../redux/products/productsActions';
import useProductFilters from './useProductFilters';
import CustomInput from '../../../../common/components/customInput/CustomInput';

const ProductFilters = ({
  rowsPerPage,
  page,
  brands,
  categories,
  fetchProducts
}) => {
  const classes = styles();
  const {
    anchorEl,
    handleClick,
    handleClose,
    open,
    handleInputChange,
    filterInputFields,
    filterInputs,
    setFilterInputs
  } = useProductFilters(brands, categories);

  const [chipInputs, setChipInputs] = useState({});

  // const handleDelete = () => {
  //   setFilterInputs({ ...filterInputs, category: '', brand: '' });
  // };

  const handleDelete = id => {
    setChipInputs(chipInputs.filter(n => n.id !== id));
  };

  const renderChipInput = (inputName, label) => {
    setChipInputs({
      ...chipInputs,
      [inputName]: `${label}: ${filterInputs[inputName]}`
    });
  };

  const renderFilterCaption = () => {
    if (filterInputs.category) {
      renderChipInput('category', 'Category');
    }
    if (filterInputs.brand) {
      renderChipInput('brand', 'Brand');
    }

    // {
    //   filterInputs.category || filterInputs.brand
    //     ? renderChipInput()
    //     : 'Add Filters...';
    // }

    return Object.keys(chipInputs).map(key => {
      if (chipInputs[key]) {
        return (
          <Chip
            key={key}
            color="secondary"
            size="medium"
            className={classes.chipInput}
            label={chipInputs[key]}
            onDelete={id => handleDelete(id)}
          />
        );
      } else {
        return 'Add Filters...';
      }
    });
  };

  const renderFilterContent = () => {
    return (
      <Fragment>
        <div className={classes.filterCaption}>
          {/* {filterInputs.category || filterInputs.brand
            ? renderChipInput()
            : 'Add Filters...'} */}
          {renderFilterCaption()}
        </div>
        <div className={classes.filterInputContainer}>
          {filterInputFields.map(
            ({
              label,
              fieldId,
              dropdown,
              placeholder,
              value,
              dropdownItems
            }) => (
              <div key={label} className={classes.filterInputs}>
                <div className={classes.filterLabel}>{label}</div>
                <CustomInput
                  dropdown={dropdown}
                  name={fieldId}
                  placeholder={placeholder}
                  dropdownItems={dropdownItems}
                  value={value}
                  onChange={handleInputChange}
                  classesProp={
                    !dropdown
                      ? {
                          root: classes.input
                        }
                      : {
                          dropdownInput: { root: classes.dropdownInput },
                          innerInput: { root: classes.innerInput }
                        }
                  }
                />
              </div>
            )
          )}
        </div>
        <div className={classes.filterBtnDiv}>
          <div>
            <Button
              style={{ marginRight: 8 }}
              className={classes.filterBtn}
              color="secondary"
              onClick={handleClose}
            >
              Cancel
            </Button>
          </div>
          <div>
            <Button
              onClick={() =>
                fetchProducts(
                  page,
                  rowsPerPage,
                  filterInputs.category,
                  filterInputs.brand,
                  filterInputs.searchQuery
                )
              }
              className={classes.filterBtn}
              color="primary"
            >
              Apply filter
            </Button>
          </div>
        </div>
      </Fragment>
    );
  };

  return (
    <Fragment>
      <div className={classes.filterIconContainer}>
        <div className={classes.filterIconDiv} onClick={handleClick}>
          <FilterListIcon className={classes.filterIcon} />
        </div>
      </div>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
      >
        {renderFilterContent()}
      </Popover>
    </Fragment>
  );
};

const mapStateToProps = ({ brands, categories }) => ({ brands, categories });

export default connect(mapStateToProps, { fetchProducts })(ProductFilters);

// const renderChipInput = () => {
//   if (filterInputs.brand) {
//     setChipInputs([
//       ...chipInputs,
//       {
//         id: Math.random(),
//         label: `Brand: ${filterInputs.brand}`
//       }
//     ]);
//   }

//   if (filterInputs.category) {
//     setChipInputs([
//       ...chipInputs,
//       {
//         id: Math.random(),
//         label: `Category: ${filterInputs.category}`
//       }
//     ]);
//   }

//   return chipInputs.map(({ label, id }) => {
//     return (
//       <Chip
//         key={id}
//         color="secondary"
//         size="medium"
//         className={classes.chipInput}
//         label={label}
//         onDelete={id => handleDelete(id)}
//       />
//     );
//   });
// };
