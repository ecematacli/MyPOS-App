import { InputBaseComponentProps } from '@material-ui/core';
import { FormikTouched } from 'formik';

export interface DropdownItems {
  name: string;
  id: number;
}

export interface Props {
  label?: string;
  dropdown?: boolean;
  dropdownItems?: DropdownItems[];
  inputLabel?: boolean;
  className?: string;
  classesProp: any;
  name?: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  startAdornment?: JSX.Element;
  inputProps?: InputBaseComponentProps;
  invalidatedField?: boolean | FormikTouched<any> | FormikTouched<any>[];
  color?: string;
  value: any;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  id?: string;
}
