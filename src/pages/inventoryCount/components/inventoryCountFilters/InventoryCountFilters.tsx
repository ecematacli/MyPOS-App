import React, { Fragment } from 'react';
import { DatePicker } from '@material-ui/pickers';

import {
  InputAdornment,
  Button,
  TextField,
  TextFieldProps
} from '@material-ui/core';
import InsertInvitationIcon from '@material-ui/icons/InsertInvitation';

import styles from './styles';
import { Category } from '../../../../redux/categories/types';
import { Brand } from '../../../../redux/brands/types';
import useInventoryFilters from './useInventoryFilters';
import CustomInput from '../../../../common/components/customInput/CustomInput';

interface Props {
  brands: Brand[];
  categories: Category[];
}
const InventoryCountFilters: React.FC<Props> = ({ brands, categories }) => {
  const classes = styles();
  const { startDate, handleStartDateChange } = useInventoryFilters(
    brands,
    categories
  );

  const renderTextField = (props: TextFieldProps) => {
    return (
      <TextField
        InputProps={{ classes: { input: classes.root } }}
        {...props}
        variant="outlined"
      />
    );
  };
  return (
    <div className={classes.filtersDiv}>
      <DatePicker
        color="secondary"
        variant="inline"
        TextFieldComponent={renderTextField}
        className={classes.datePicker}
        autoOk
        value={startDate}
        onChange={date => handleStartDateChange(date)}
        // InputProps={{
        //   endAdornment: (
        //     <React.Fragment>
        //       <InputAdornment position="start">
        //         <InsertInvitationIcon className={classes.calendarIcon} />
        //       </InputAdornment>
        //     </React.Fragment>
        //   )
        // }}
      />
      {/* <CustomInput /> */}
    </div>
  );
};

export default InventoryCountFilters;
