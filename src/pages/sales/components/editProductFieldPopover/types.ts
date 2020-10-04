import { PopoverOrigin } from '@material-ui/core';

export interface Props {
  open: boolean;
  anchorEl: null | Element;
  handleClose: () => void;
  inputValue: number;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleCompleteEditClick: () => void;
  popoverContentElement: JSX.Element;
  title: string;
  field: string;
  currencySign?: boolean;
  testId?: string;
  anchorOrigin?: PopoverOrigin;
  transformOrigin?: PopoverOrigin;
}
