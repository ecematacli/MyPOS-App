import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ spacing, palette }) => ({
  tableBodyRow: {
    height: spacing(10),
    maxHeight: spacing(10),
    '& > td': {
      cursor: 'pointer',
      borderBottom: '1px solid #e9e9e9',
      height: 'auto',
      maxHeight: spacing(10),
    },
  },
}));
