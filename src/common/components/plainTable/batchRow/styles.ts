import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ spacing }) => ({
  tableBodyRow: {
    height: spacing(10),
    maxHeight: spacing(10),
    '& > td': {
      borderBottom: '1px solid #e9e9e9',
      height: 'auto',
      maxHeight: spacing(10),
      // width: '15.3%',
      // '&:nth-child(2)': {
      //   width: '27%',
      // },
      // '&:nth-child(3)': {
      //   width: '27%',
      // },
      '&:last-child': {
        '& > td': {
          borderBottom: 'none',
        },
      },
    },
  },
  batchNameCell: {
    textDecoration: 'underline',
    cursor: 'pointer',
  },
}));
